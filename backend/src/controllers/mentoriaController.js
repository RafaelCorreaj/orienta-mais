const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const solicitarMentoria = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { perfil, whatsappAluno } = req.body;

    // Verificar se já tem solicitação pendente
    const existing = await prisma.filaMentoria.findUnique({
      where: { usuarioId }
    });

    if (existing) {
      if (existing.statusFila === 'Aguardando') {
        return res.status(400).json({ error: 'Você já tem uma solicitação pendente' });
      }
      // Reativar solicitação cancelada
      const updated = await prisma.filaMentoria.update({
        where: { id: existing.id },
        data: { statusFila: 'Aguardando', perfil, whatsappAluno }
      });
      return res.json(updated);
    }

    const fila = await prisma.filaMentoria.create({
      data: {
        usuarioId,
        perfil: perfil || '',
        whatsappAluno: whatsappAluno || '',
        statusFila: 'Aguardando'
      }
    });

    res.status(201).json(fila);
  } catch (error) {
    console.error('Erro ao solicitar mentoria:', error);
    res.status(500).json({ error: 'Erro ao solicitar mentoria' });
  }
};

const listarFilaPendente = async (req, res) => {
  try {
    const fila = await prisma.filaMentoria.findMany({
      where: { statusFila: 'Aguardando' },
      include: {
        usuario: {
          select: { id: true, nome: true, email: true, telefone: true }
        }
      },
      orderBy: { dataSolicitacao: 'asc' }
    });

    res.json(fila);
  } catch (error) {
    console.error('Erro ao listar fila:', error);
    res.status(500).json({ error: 'Erro ao listar fila' });
  }
};

const aceitarAluno = async (req, res) => {
  try {
    const { filaId } = req.params;
    const monitorId = req.user.id;

    // Buscar solicitação na fila
    const fila = await prisma.filaMentoria.findUnique({
      where: { id: filaId }
    });

    if (!fila) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    if (fila.statusFila !== 'Aguardando') {
      return res.status(400).json({ error: 'Solicitação já foi atendida' });
    }

    // Criar match mentorado
    const mentorado = await prisma.mentorado.create({
      data: {
        usuarioId: fila.usuarioId,
        monitorId: monitorId,
        status: 'Ativo'
      }
    });

    // Atualizar fila
    await prisma.filaMentoria.update({
      where: { id: filaId },
      data: { statusFila: 'Atendido' }
    });

    res.status(201).json(mentorado);
  } catch (error) {
    console.error('Erro ao aceitar aluno:', error);
    res.status(500).json({ error: 'Erro ao aceitar aluno' });
  }
};

const listarMentorados = async (req, res) => {
  try {
    const monitorId = req.user.id;

    const mentorados = await prisma.mentorado.findMany({
      where: { monitorId, status: 'Ativo' },
      include: {
        aluno: {
          select: { id: true, nome: true, email: true, telefone: true }
        },
        encontros: true
      },
      orderBy: { dataMatch: 'desc' }
    });

    res.json(mentorados);
  } catch (error) {
    console.error('Erro ao listar mentorados:', error);
    res.status(500).json({ error: 'Erro ao listar mentorados' });
  }
};

const registrarEncontro = async (req, res) => {
  try {
    const { mentoradoId } = req.params;
    const { tipo, observacoes, proximoPasso } = req.body;

    const encontro = await prisma.encontroMentoria.create({
      data: {
        mentoradoId,
        tipo: tipo || 'WhatsApp',
        observacoes: observacoes || '',
        proximoPasso
      }
    });

    res.status(201).json(encontro);
  } catch (error) {
    console.error('Erro ao registrar encontro:', error);
    res.status(500).json({ error: 'Erro ao registrar encontro' });
  }
};

module.exports = { solicitarMentoria, listarFilaPendente, aceitarAluno, listarMentorados, registrarEncontro };