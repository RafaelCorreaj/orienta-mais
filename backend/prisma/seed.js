const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Criar usuário admin padrão
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@orientamais.com' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@orientamais.com',
      senha: adminPassword,
      telefone: '(11) 99999-9999',
      dataNascimento: new Date('1990-01-01'),
      isAdmin: true,
      status: 'Ativo'
    }
  });
  console.log('✅ Admin criado:', admin.email);

  // Criar usuário de teste
  const userPassword = await bcrypt.hash('aluno123', 10);
  const aluno = await prisma.user.upsert({
    where: { email: 'aluno@teste.com' },
    update: {},
    create: {
      nome: 'Aluno Teste',
      email: 'aluno@teste.com',
      senha: userPassword,
      telefone: '(11) 98888-8888',
      dataNascimento: new Date('2002-05-15'),
      isAdmin: false,
      status: 'Ativo'
    }
  });
  console.log('✅ Aluno criado:', aluno.email);

  // Cursos iniciais
  const cursos = [
    {
      nome: 'Introdução à Programação',
      area: 'Tecnologia',
      perfisRecomendados: ['Técnico', 'Líder'],
      cargaHoraria: '40 horas',
      plataforma: 'SENAC EAD',
      link: 'https://www.senac.br/cursos/introducao-programacao',
      certificado: true,
      nivelDificuldade: 'Iniciante'
    },
    {
      nome: 'Desenvolvimento Web Full Stack',
      area: 'Tecnologia',
      perfisRecomendados: ['Técnico', 'Criativo'],
      cargaHoraria: '80 horas',
      plataforma: 'Coursera',
      link: 'https://www.coursera.org/web-dev',
      certificado: true,
      nivelDificuldade: 'Intermediário'
    },
    {
      nome: 'Gestão de Projetos',
      area: 'Gestão',
      perfisRecomendados: ['Líder', 'Colaborativo'],
      cargaHoraria: '60 horas',
      plataforma: 'SEBRAE',
      link: 'https://www.sebrae.com.br/gestao-projetos',
      certificado: true,
      nivelDificuldade: 'Intermediário'
    },
    {
      nome: 'Design Thinking e Inovação',
      area: 'Inovação',
      perfisRecomendados: ['Criativo', 'Colaborativo', 'Líder'],
      cargaHoraria: '30 horas',
      plataforma: 'FIA',
      link: 'https://www.fia.com.br/design-thinking',
      certificado: true,
      nivelDificuldade: 'Iniciante'
    },
    {
      nome: 'Data Science Fundamentals',
      area: 'Tecnologia',
      perfisRecomendados: ['Técnico', 'Acadêmico'],
      cargaHoraria: '50 horas',
      plataforma: 'Udemy',
      link: 'https://www.udemy.com/data-science',
      certificado: true,
      nivelDificuldade: 'Intermediário'
    },
    {
      nome: 'Comunicação e Oratória',
      area: 'Desenvolvimento Pessoal',
      perfisRecomendados: ['Líder', 'Colaborativo', 'Acadêmico'],
      cargaHoraria: '20 horas',
      plataforma: 'Fundação Bradesco',
      link: 'https://www.ev.org.br/comunicacao-oratoria',
      certificado: true,
      nivelDificuldade: 'Iniciante'
    },
    {
      nome: 'Liderança e Gestão de Equipes',
      area: 'Gestão',
      perfisRecomendados: ['Líder', 'Colaborativo'],
      cargaHoraria: '40 horas',
      plataforma: 'IEL',
      link: 'https://www.iel.org.br/lideranca',
      certificado: true,
      nivelDificuldade: 'Intermediário'
    },
    {
      nome: 'Inteligência Artificial Aplicada',
      area: 'Tecnologia',
      perfisRecomendados: ['Técnico', 'Acadêmico', 'Criativo'],
      cargaHoraria: '60 horas',
      plataforma: 'Coursera',
      link: 'https://www.coursera.org/ia-aplicada',
      certificado: true,
      nivelDificuldade: 'Avançado'
    },
    {
      nome: 'Empreendedorismo Digital',
      area: 'Empreendedorismo',
      perfisRecomendados: ['Líder', 'Criativo'],
      cargaHoraria: '35 horas',
      plataforma: 'SEBRAE',
      link: 'https://www.sebrae.com.br/empreendedorismo-digital',
      certificado: true,
      nivelDificuldade: 'Iniciante'
    },
    {
      nome: 'Marketing Digital',
      area: 'Comunicação',
      perfisRecomendados: ['Criativo', 'Colaborativo'],
      cargaHoraria: '45 horas',
      plataforma: 'Google Atelier Digital',
      link: 'https://atelierdigital.google.com/marketing',
      certificado: true,
      nivelDificuldade: 'Iniciante'
    }
  ];

  for (const curso of cursos) {
    await prisma.curso.upsert({
      where: { id: curso.nome }, // will fail, but using create instead
      update: {},
      create: curso
    }).catch(async () => {
      // se falhar, cria normalmente
      await prisma.curso.create({ data: curso });
    });
  }
  console.log(`✅ ${cursos.length} cursos criados`);

  // Criar monitor de exemplo
  const monitorPassword = await bcrypt.hash('monitor123', 10);
  const monitor = await prisma.monitor.upsert({
    where: { email: 'monitor@orientamais.com' },
    update: {},
    create: {
      nome: 'Carlos Mentor',
      email: 'monitor@orientamais.com',
      senha: monitorPassword,
      whatsapp: '(11) 97777-7777',
      formacao: 'Psicologia - USP',
      perfisDisponiveis: ['Líder', 'Colaborativo', 'Técnico'],
      disponibilidade: 'Seg-Sex 14h-18h',
      status: 'Ativo'
    }
  });
  console.log('✅ Monitor criado:', monitor.nome);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('🎉 Seed concluído com sucesso!');
  })
  .catch(async (e) => {
    console.error('❌ Erro no seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });