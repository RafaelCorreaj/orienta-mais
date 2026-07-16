const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PALAVRAS_CHAVE = {
  lideranca: [
    "administrador", "administração", "auditor", "advogado", "assessor", "analista de negócios",
    "bombeiro", "banqueiro", "broker",
    "coordenador", "coordenar", "consultor", "contador", "controller", "CEO", "CFO", "chefe", "chefia",
    "comandante", "comandar", "corretor", "conselheiro",
    "diretor", "director", "delegado", "deputado", "diplomata", "detetive", "decidir",
    "empreendedor", "empresário", "executivo", "economista",
    "fiscal",
    "gerente", "gerenciar", "gestor", "gestão", "governador", "governar",
    "investidor", "investigador",
    "juiz", "juíza",
    "líder", "liderar", "liderança",
    "manager", "militar", "magistrado",
    "negócio", "negociador",
    "organizar", "organizador", "oficial",
    "político", "polícia", "policial", "prefeito", "presidente", "promotor", "procurador",
    "product owner", "project manager",
    "representante",
    "supervisor", "superintendente", "senador", "sargento",
    "tesoureiro",
    "vereador", "vice-presidente",
  ],
  colaborativo: [
    "assistente", "assistente social", "agente comunitário", "acompanhante",
    "acolhimento", "ajudar", "apoiar",
    "cuidador", "cuidar", "coach", "conselheiro",
    "dentista",
    "educador", "educação", "enfermeiro", "enfermagem", "ensinar",
    "fisioterapeuta", "fonoaudiólogo",
    "humanas",
    "instrutor", "inclusão",
    "médico", "medicina", "massoterapeuta",
    "nutricionista", "nutrição",
    "professor", "pedagogo", "psicólogo", "psicologia", "personal trainer", "pastor", "pessoa",
    "recursos humanos", "RH", "recepcionista", "recrutador",
    "secretário", "socorrista", "social", "saúde",
    "terapeuta", "terapia", "tutor", "treinador", "telemarketing",
    "veterinário", "voluntário",
  ],
  tecnico: [
    "analista", "analista de dados", "analista de sistemas", "arquiteto de software",
    "automação", "administrador de redes",
    "ciência da computação", "cientista de dados", "código", "codificar", "computador", "cálculo", "cloud",
    "DBA", "dados", "desenvolvedor", "desenvolvimento", "dev", "devops", "developer",
    "elétrico", "eletricista", "eletrônica", "engenheiro", "engenharia", "estatístico",
    "fábrica", "ferramentas",
    "hardware", "hacker",
    "informática", "instalador",
    "lógica", "lógico", "laboratório",
    "matemática", "matemático", "mecânico", "mecânica", "montador", "manutenção", "máquinas",
    "operador",
    "programador", "programar", "programação", "python", "php", "javascript", "java", "processos",
    "QA", "qualidade",
    "redes", "reparador", "robótica", "robótic",
    "segurança da informação", "sistema", "software", "suporte técnico",
    "técnico", "tecnologia", "TI", "teste", "tester",
  ],
  criativo: [
    "arte", "artista", "artesão", "arquiteto", "arquitetura", "ator", "atriz", "animador", "audiovisual",
    "blogueiro", "barbeiro", "bailarino",
    "cantor", "compositor", "criar", "criação", "criatividade", "criativo",
    "cabeleireiro", "chef", "cozinheiro", "cineasta", "comunicador", "comunicação",
    "confeiteiro", "conteúdo", "creator",
    "dança", "dançarino", "design", "designer", "desenho", "desenhista", "decorador",
    "diretor de arte", "digital creator", "digital influencer",
    "escritor", "escrita", "estilista", "editor",
    "fotógrafo", "foto", "figurinista",
    "ilustrador", "influencer", "influenciador", "inovação", "inovar", "inventar",
    "jornalista", "jogos",
    "música", "músico", "marketing", "marketeiro", "maquiador", "moda", "motion", "maquete",
    "produtor", "produtor de conteúdo", "publicitário", "publicidade", "padeiro", "pintor", "poeta",
    "roteirista", "redator",
    "social media", "storyteller",
    "teatro", "tradutor",
    "vídeo", "videomaker", "vlogueiro",
    "youtuber",
  ],
  academico: [
    "acadêmico", "antropólogo", "arqueólogo", "astrônomo", "autor",
    "bibliotecário", "biólogo", "biologia",
    "cientista", "ciência", "conhecimento", "concurso", "certificação",
    "doutor", "doutorado", "direito",
    "estudar", "estudante", "escola", "escrever", "escrita",
    "faculdade", "filosofia", "físico", "física",
    "geólogo", "geografia",
    "historiador", "história",
    "idioma", "inglês", "interpretar", "intérprete",
    "jurídico",
    "lei", "ler", "livro", "língua", "linguista", "legislação",
    "mestrado", "medicina", "médico", "museólogo", "matéria",
    "notário",
    "oceanógrafo",
    "pesquisador", "pesquisar", "professor", "professor universitário", "paleontólogo", "pedagogia",
    "químico", "química",
    "redação", "registrador",
    "sociólogo", "estatística",
    "tradutor", "teoria",
    "universidade", "universitário",
    "vestibular",
  ]
};

function normalizarTexto(texto) {
  if (!texto || texto.trim() === "") return [];
  let t = texto.toLowerCase();
  t = t.replace(/\s+ou\s+/g, " ");
  t = t.replace(/[.,!?;:()\[\]{}"'`´^~]/g, " ");
  t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  t = t.replace(/\s+/g, " ").trim();
  const palavras = t.split(" ").filter(p => p.length > 1);
  return palavras;
}

function analisarTexto(texto) {
  if (!texto || texto.trim() === "") return null;

  const tokens = normalizarTexto(texto);
  const textoLower = texto.toLowerCase();
  const scores = { lideranca: 0, colaborativo: 0, tecnico: 0, criativo: 0, academico: 0 };

  // Verifica ocorrência exata de palavras compostas no texto original
  for (const [perfil, palavras] of Object.entries(PALAVRAS_CHAVE)) {
    for (const palavra of palavras) {
      if (textoLower.includes(palavra.toLowerCase())) {
        scores[perfil] += 1;
      }
    }
  }

  // Contagem tokenizada para capturar múltiplas ocorrências
  for (const token of tokens) {
    for (const [perfil, palavras] of Object.entries(PALAVRAS_CHAVE)) {
      for (const palavra of palavras) {
        if (token === palavra.toLowerCase()) {
          scores[perfil] += 1;
          break;
        }
      }
    }
  }

  return scores;
}

const calcularPerfil = (data) => {
  let pontos = { lideranca: 0, colaborativo: 0, tecnico: 0, criativo: 0, academico: 0 };

  const hab = data.habilidades || [];
  const inter = data.interesses || [];
  const auto = data.autoavaliacao || {};

  // Detecção de incompatibilidade
  const conflitoLiderSozinho = data.estiloTrabalho === "Sozinho" && data.estiloGrupo === "Lidera";
  const conflitoColaboraSozinho = data.estiloTrabalho === "Sozinho" && data.estiloGrupo === "Colabora";

  // 1. HABILIDADES
  if (hab.includes("Liderança")) {
    if (conflitoLiderSozinho) {
      pontos.lideranca += 0;
    } else {
      pontos.lideranca += 2;
    }
  }
  if (hab.includes("Comunicação")) pontos.lideranca += 1;
  if (hab.includes("Trabalho em equipe")) pontos.colaborativo += 2;
  if (hab.includes("Tecnologia")) pontos.tecnico += 2;
  if (hab.includes("Resolver problemas")) pontos.tecnico += 1;
  if (hab.includes("Trabalhos manuais")) pontos.tecnico += 1;
  if (hab.includes("Criatividade")) pontos.criativo += 2;
  if (hab.includes("Escrita")) pontos.academico += 1;
  if (hab.includes("Matemática")) pontos.academico += 1;

  // 2. INTERESSES
  if (inter.includes("Negócios")) pontos.lideranca += 1;
  if (inter.includes("Saúde") || inter.includes("Educação")) pontos.colaborativo += 1;
  if (inter.includes("Tecnologia")) pontos.tecnico += 1;
  if (inter.includes("Artes") || inter.includes("Comunicação")) pontos.criativo += 1;
  if (inter.includes("Meio ambiente") || inter.includes("Esportes")) pontos.academico += 1;

  // 3. ESTILO DE TRABALHO COM DETECÇÃO DE CONFLITOS
  if (data.estiloGrupo === "Lidera") {
    if (conflitoLiderSozinho) {
      pontos.lideranca -= 2;
      pontos.tecnico += 2;
    } else {
      pontos.lideranca += 2;
    }
  }

  if (data.estiloGrupo === "Colabora") {
    if (conflitoColaboraSozinho) {
      pontos.colaborativo -= 1;
      pontos.tecnico += 1;
    } else {
      pontos.colaborativo += 2;
    }
  }

  if (data.estiloGrupo === "Observa") {
    pontos.academico += 1;
    if (data.estiloTrabalho === "Sozinho") pontos.tecnico += 1;
  }

  if (data.estiloGrupo === "Reservado") {
    pontos.tecnico += 2;
  }

  if (data.estiloTrabalho === "Sozinho" && data.estiloGrupo !== "Reservado") {
    pontos.tecnico += 1;
  }

  // 4. AUTOAVALIAÇÃO
  const autoOrg = auto.organizacao || 0;
  const autoCom = auto.comunicacao || 0;
  const autoEqu = auto.equipe || 0;
  const autoResp = auto.responsabilidade || 0;
  const autoCri = auto.criatividade || 0;

  pontos.lideranca += Math.round((autoCom + autoOrg) / 2);
  pontos.colaborativo += Math.round((autoEqu + autoCom) / 2);
  pontos.tecnico += Math.round((autoOrg + autoResp) / 2);
  pontos.criativo += Math.round(autoCri);
  pontos.academico += Math.round((autoOrg + autoResp) / 2);

  // 5. ANÁLISE DE TEXTO LIVRE
  const textosParaAnalisar = [data.sonho, data.tempoLivre, data.querAprender];
  for (const texto of textosParaAnalisar) {
    const scoreTexto = analisarTexto(texto);
    if (scoreTexto) {
      for (const perfil of Object.keys(pontos)) {
        pontos[perfil] += Math.round(scoreTexto[perfil] * 0.5);
      }
    }
  }
  // Profissão em mente tem peso 2.0 - é a escolha consciente do aluno
  const scoreProfissao = analisarTexto(data.profissaoEmMente);
  if (scoreProfissao) {
    for (const perfil of Object.keys(pontos)) {
      pontos[perfil] += Math.round(scoreProfissao[perfil] * 2.0);
    }
  }

  // 6. PREFERÊNCIA DE APRENDIZADO
  if (data.preferenciaAprendizado === "Prática (fazendo)") pontos.tecnico += 1;
  else if (data.preferenciaAprendizado === "Teórica (estudando)") pontos.academico += 1;

  // 7. COMO RESOLVE PROBLEMAS
  if (data.comoResolveProblemas === "Resolvo sozinho") pontos.tecnico += 1;
  if (data.comoResolveProblemas === "Peço ajuda") pontos.colaborativo += 1;
  if (data.comoResolveProblemas === "Tento várias soluções") pontos.criativo += 1;

  // Pontuação total
  const pontuacaoTotal = (hab.length) + (inter.length) + (data.profissaoEmMente ? 2 : 0) +
    (data.estiloGrupo === "Lidera" || data.estiloGrupo === "Colabora" ? 2 : data.estiloGrupo ? 1 : 0) +
    autoOrg + autoCom + autoEqu + autoResp + autoCri;

  const sorted = Object.entries(pontos).sort((a, b) => b[1] - a[1]);
  let perfil = "Acadêmico";

  if (sorted[0][1] - sorted[1][1] >= 2) {
    if (sorted[0][0] === "lideranca") perfil = "Líder";
    else if (sorted[0][0] === "colaborativo") perfil = "Colaborativo";
    else if (sorted[0][0] === "tecnico") perfil = "Técnico";
    else if (sorted[0][0] === "criativo") perfil = "Criativo";
  }

  return { perfil, pontuacaoTotal, pontos };
};

const submitDiagnostico = async (req, res) => {
  try {
    const data = req.body;
    const usuarioId = req.user.id;

    const { perfil, pontuacaoTotal } = calcularPerfil(data);

    const existing = await prisma.diagnostico.findFirst({
      where: { usuarioId }
    });

    let diagnostico;
    if (existing) {
      diagnostico = await prisma.diagnostico.update({
        where: { id: existing.id },
        data: {
          habilidades: data.habilidades,
          interesses: data.interesses,
          estiloTrabalho: data.estiloTrabalho,
          estiloGrupo: data.estiloGrupo,
          autoavaliacao: data.autoavaliacao,
          sonho: data.sonho,
          querAprender: data.querAprender,
          pontuacaoTotal,
          perfilClassificado: perfil
        }
      });
    } else {
      diagnostico = await prisma.diagnostico.create({
        data: {
          usuarioId,
          habilidades: data.habilidades,
          interesses: data.interesses,
          estiloTrabalho: data.estiloTrabalho,
          estiloGrupo: data.estiloGrupo,
          autoavaliacao: data.autoavaliacao,
          sonho: data.sonho,
          querAprender: data.querAprender,
          pontuacaoTotal,
          perfilClassificado: perfil
        }
      });
    }

    res.json({
      diagnostico,
      perfil,
      pontuacaoTotal
    });
  } catch (error) {
    console.error('Erro ao salvar diagnóstico:', error);
    res.status(500).json({ error: 'Erro ao processar diagnóstico' });
  }
};

const getUltimoDiagnostico = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const diagnostico = await prisma.diagnostico.findFirst({
      where: { usuarioId },
      orderBy: { dataRealizacao: 'desc' }
    });
    if (!diagnostico) return res.status(404).json({ error: 'Nenhum diagnóstico encontrado' });
    res.json(diagnostico);
  } catch (error) {
    console.error('Erro ao buscar diagnóstico:', error);
    res.status(500).json({ error: 'Erro ao buscar diagnóstico' });
  }
};

const getRecomendacoes = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const diagnostico = await prisma.diagnostico.findFirst({
      where: { usuarioId },
      orderBy: { dataRealizacao: 'desc' }
    });
    if (!diagnostico) return res.status(404).json({ error: 'Nenhum diagnóstico encontrado' });
    const cursos = await prisma.curso.findMany({
      where: { perfisRecomendados: { has: diagnostico.perfilClassificado } }
    });
    res.json({
      perfil: diagnostico.perfilClassificado,
      pontuacaoTotal: diagnostico.pontuacaoTotal,
      cursos
    });
  } catch (error) {
    console.error('Erro ao buscar recomendações:', error);
    res.status(500).json({ error: 'Erro ao buscar recomendações' });
  }
};

module.exports = { submitDiagnostico, getUltimoDiagnostico, getRecomendacoes };