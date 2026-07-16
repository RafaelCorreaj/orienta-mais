// Script para expandir a base de cursos
// Execute após o seed inicial: node prisma/seed-cursos.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const NOVOS_CURSOS = [
  // === PERFIL LÍDER (10 cursos) ===
  { nome: 'Gestão de Pessoas e Liderança', area: 'Gestão', perfisRecomendados: ['Líder', 'Colaborativo'], cargaHoraria: '40 horas', plataforma: 'SENAC EAD', link: 'https://www.senac.br/cursos/gestao-pessoas', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Oratória e Apresentações de Impacto', area: 'Desenvolvimento Pessoal', perfisRecomendados: ['Líder', 'Criativo'], cargaHoraria: '20 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/oratoria', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Negociação e Gestão de Conflitos', area: 'Gestão', perfisRecomendados: ['Líder', 'Colaborativo'], cargaHoraria: '30 horas', plataforma: 'SEBRAE', link: 'https://www.sebrae.com.br/negociacao', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Planejamento Estratégico', area: 'Gestão', perfisRecomendados: ['Líder', 'Técnico'], cargaHoraria: '50 horas', plataforma: 'FIA', link: 'https://www.fia.com.br/planejamento-estrategico', certificado: true, nivelDificuldade: 'Avançado' },
  { nome: 'Gestão de Tempo e Produtividade', area: 'Desenvolvimento Pessoal', perfisRecomendados: ['Líder', 'Técnico', 'Acadêmico'], cargaHoraria: '15 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/gestao-tempo', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Inteligência Emocional no Trabalho', area: 'Desenvolvimento Pessoal', perfisRecomendados: ['Líder', 'Colaborativo'], cargaHoraria: '20 horas', plataforma: 'IEL', link: 'https://www.iel.org.br/inteligencia-emocional', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Gestão Financeira para PMEs', area: 'Gestão', perfisRecomendados: ['Líder', 'Técnico'], cargaHoraria: '35 horas', plataforma: 'SEBRAE', link: 'https://www.sebrae.com.br/gestao-financeira', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Formação de Preços e Vendas', area: 'Empreendedorismo', perfisRecomendados: ['Líder', 'Criativo'], cargaHoraria: '25 horas', plataforma: 'SEBRAE', link: 'https://www.sebrae.com.br/formacao-precos', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Liderança Inovadora', area: 'Inovação', perfisRecomendados: ['Líder', 'Criativo'], cargaHoraria: '30 horas', plataforma: 'Coursera', link: 'https://www.coursera.org/lideranca-inovadora', certificado: true, nivelDificuldade: 'Avançado' },
  { nome: 'Tomada de Decisão Baseada em Dados', area: 'Gestão', perfisRecomendados: ['Líder', 'Técnico', 'Acadêmico'], cargaHoraria: '40 horas', plataforma: 'FIA', link: 'https://www.fia.com.br/decisao-dados', certificado: true, nivelDificuldade: 'Avançado' },

  // === PERFIL COLABORATIVO (10 cursos) ===
  { nome: 'Assistência Social e Voluntariado', area: 'Saúde Social', perfisRecomendados: ['Colaborativo', 'Acadêmico'], cargaHoraria: '30 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/assistencia-social', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Mediação e Diálogo Comunitário', area: 'Saúde Social', perfisRecomendados: ['Colaborativo', 'Líder'], cargaHoraria: '25 horas', plataforma: 'SENAC EAD', link: 'https://www.senac.br/cursos/mediacao', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Saúde Mental e Bem-Estar', area: 'Saúde', perfisRecomendados: ['Colaborativo', 'Acadêmico'], cargaHoraria: '20 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/saude-mental', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Atendimento ao Cliente e Experiência', area: 'Comunicação', perfisRecomendados: ['Colaborativo', 'Criativo'], cargaHoraria: '20 horas', plataforma: 'SEBRAE', link: 'https://www.sebrae.com.br/atendimento-cliente', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Trabalho em Equipe e Colaboração', area: 'Desenvolvimento Pessoal', perfisRecomendados: ['Colaborativo', 'Líder'], cargaHoraria: '15 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/trabalho-equipe', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Psicologia Positiva e Motivação', area: 'Desenvolvimento Pessoal', perfisRecomendados: ['Colaborativo', 'Acadêmico'], cargaHoraria: '25 horas', plataforma: 'Coursera', link: 'https://www.coursera.org/psicologia-positiva', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Educação Inclusiva e Diversidade', area: 'Educação', perfisRecomendados: ['Colaborativo', 'Acadêmico'], cargaHoraria: '30 horas', plataforma: 'SENAC EAD', link: 'https://www.senac.br/cursos/educacao-inclusiva', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Recursos Humanos e Gestão de Talentos', area: 'Gestão', perfisRecomendados: ['Colaborativo', 'Líder'], cargaHoraria: '45 horas', plataforma: 'IEL', link: 'https://www.iel.org.br/recursos-humanos', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Ética e Cidadania', area: 'Desenvolvimento Pessoal', perfisRecomendados: ['Colaborativo', 'Acadêmico'], cargaHoraria: '15 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/etica-cidadania', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Primeiros Socorros e Segurança', area: 'Saúde', perfisRecomendados: ['Colaborativo', 'Técnico'], cargaHoraria: '20 horas', plataforma: 'SENAC EAD', link: 'https://www.senac.br/cursos/primeiros-socorros', certificado: true, nivelDificuldade: 'Iniciante' },

  // === PERFIL TÉCNICO (10 cursos) ===
  { nome: 'Lógica de Programação', area: 'Tecnologia', perfisRecomendados: ['Técnico', 'Acadêmico'], cargaHoraria: '40 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/logica-programacao', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Banco de Dados SQL', area: 'Tecnologia', perfisRecomendados: ['Técnico', 'Acadêmico'], cargaHoraria: '50 horas', plataforma: 'Udemy', link: 'https://www.udemy.com/banco-dados-sql', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Redes de Computadores', area: 'Tecnologia', perfisRecomendados: ['Técnico'], cargaHoraria: '45 horas', plataforma: 'Coursera', link: 'https://www.coursera.org/redes-computadores', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Segurança da Informação', area: 'Tecnologia', perfisRecomendados: ['Técnico', 'Acadêmico'], cargaHoraria: '40 horas', plataforma: 'SENAC EAD', link: 'https://www.senac.br/cursos/seguranca-informacao', certificado: true, nivelDificuldade: 'Avançado' },
  { nome: 'Manutenção de Computadores', area: 'Tecnologia', perfisRecomendados: ['Técnico'], cargaHoraria: '60 horas', plataforma: 'SENAC EAD', link: 'https://www.senac.br/cursos/manutencao-computadores', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Excel Avançado e Power BI', area: 'Tecnologia', perfisRecomendados: ['Técnico', 'Acadêmico'], cargaHoraria: '35 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/excel-avancado', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Automação com Python', area: 'Tecnologia', perfisRecomendados: ['Técnico', 'Criativo'], cargaHoraria: '40 horas', plataforma: 'Udemy', link: 'https://www.udemy.com/automacao-python', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Cloud Computing (AWS)', area: 'Tecnologia', perfisRecomendados: ['Técnico', 'Acadêmico'], cargaHoraria: '50 horas', plataforma: 'Coursera', link: 'https://www.coursera.org/cloud-computing-aws', certificado: true, nivelDificuldade: 'Avançado' },
  { nome: 'Eletrônica Básica', area: 'Tecnologia', perfisRecomendados: ['Técnico'], cargaHoraria: '40 horas', plataforma: 'SENAC EAD', link: 'https://www.senac.br/cursos/eletronica', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Desenvolvimento de Aplicativos Mobile', area: 'Tecnologia', perfisRecomendados: ['Técnico', 'Criativo'], cargaHoraria: '60 horas', plataforma: 'Coursera', link: 'https://www.coursera.org/mobile-dev', certificado: true, nivelDificuldade: 'Avançado' },

  // === PERFIL CRIATIVO (10 cursos) ===
  { nome: 'Design Gráfico (Canva/Photoshop)', area: 'Artes', perfisRecomendados: ['Criativo', 'Técnico'], cargaHoraria: '30 horas', plataforma: 'SENAC EAD', link: 'https://www.senac.br/cursos/design-grafico', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Edição de Vídeo (Premiere/DaVinci)', area: 'Artes', perfisRecomendados: ['Criativo', 'Técnico'], cargaHoraria: '40 horas', plataforma: 'Udemy', link: 'https://www.udemy.com/edicao-video', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Fotografia para Iniciantes', area: 'Artes', perfisRecomendados: ['Criativo'], cargaHoraria: '20 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/fotografia', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Produção de Conteúdo Digital', area: 'Comunicação', perfisRecomendados: ['Criativo', 'Colaborativo'], cargaHoraria: '25 horas', plataforma: 'Google Atelier Digital', link: 'https://atelierdigital.google.com/producao-conteudo', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Roteiro e Storytelling', area: 'Artes', perfisRecomendados: ['Criativo', 'Líder'], cargaHoraria: '20 horas', plataforma: 'Coursera', link: 'https://www.coursera.org/storytelling', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'UX/UI Design', area: 'Tecnologia', perfisRecomendados: ['Criativo', 'Técnico'], cargaHoraria: '35 horas', plataforma: 'Coursera', link: 'https://www.coursera.org/ux-ui-design', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Ilustração Digital', area: 'Artes', perfisRecomendados: ['Criativo'], cargaHoraria: '30 horas', plataforma: 'Udemy', link: 'https://www.udemy.com/ilustracao-digital', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Música Digital e Produção Musical', area: 'Artes', perfisRecomendados: ['Criativo'], cargaHoraria: '40 horas', plataforma: 'SENAC EAD', link: 'https://www.senac.br/cursos/producao-musical', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Moda e Estilo', area: 'Artes', perfisRecomendados: ['Criativo', 'Colaborativo'], cargaHoraria: '25 horas', plataforma: 'SENAC EAD', link: 'https://www.senac.br/cursos/moda-estilo', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Animação e Motion Graphics', area: 'Artes', perfisRecomendados: ['Criativo', 'Técnico'], cargaHoraria: '45 horas', plataforma: 'Udemy', link: 'https://www.udemy.com/animacao-motion', certificado: true, nivelDificuldade: 'Avançado' },

  // === PERFIL ACADÊMICO (10 cursos) ===
  { nome: 'Metodologia Científica', area: 'Educação', perfisRecomendados: ['Acadêmico', 'Técnico'], cargaHoraria: '30 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/metodologia-cientifica', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Matemática Financeira', area: 'Educação', perfisRecomendados: ['Acadêmico', 'Técnico'], cargaHoraria: '35 horas', plataforma: 'SENAC EAD', link: 'https://www.senac.br/cursos/matematica-financeira', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Estatística Aplicada', area: 'Educação', perfisRecomendados: ['Acadêmico', 'Técnico'], cargaHoraria: '40 horas', plataforma: 'Coursera', link: 'https://www.coursera.org/estatistica-aplicada', certificado: true, nivelDificuldade: 'Avançado' },
  { nome: 'Português para Concursos', area: 'Educação', perfisRecomendados: ['Acadêmico'], cargaHoraria: '50 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/portugues-concursos', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Inglês Instrumental', area: 'Educação', perfisRecomendados: ['Acadêmico', 'Colaborativo'], cargaHoraria: '60 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/ingles-instrumental', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Redação Científica e Acadêmica', area: 'Educação', perfisRecomendados: ['Acadêmico'], cargaHoraria: '25 horas', plataforma: 'Coursera', link: 'https://www.coursera.org/redacao-cientifica', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'História do Brasil Contemporâneo', area: 'Educação', perfisRecomendados: ['Acadêmico', 'Colaborativo'], cargaHoraria: '30 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/historia-brasil', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Filosofia e Pensamento Crítico', area: 'Educação', perfisRecomendados: ['Acadêmico', 'Criativo'], cargaHoraria: '20 horas', plataforma: 'Coursera', link: 'https://www.coursera.org/filosofia', certificado: true, nivelDificuldade: 'Intermediário' },
  { nome: 'Biologia e Ciências Naturais', area: 'Educação', perfisRecomendados: ['Acadêmico', 'Colaborativo'], cargaHoraria: '40 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/biologia', certificado: true, nivelDificuldade: 'Iniciante' },
  { nome: 'Leitura e Interpretação de Textos', area: 'Educação', perfisRecomendados: ['Acadêmico'], cargaHoraria: '20 horas', plataforma: 'Fundação Bradesco', link: 'https://www.ev.org.br/interpretacao-textos', certificado: true, nivelDificuldade: 'Iniciante' },
];

async function main() {
  console.log('📚 Expandindo base de cursos...');
  
  let inseridos = 0;
  for (const curso of NOVOS_CURSOS) {
    const existente = await prisma.curso.findFirst({ where: { nome: curso.nome } });
    if (!existente) {
      await prisma.curso.create({ data: curso });
      inseridos++;
      console.log(`  ✅ ${curso.nome}`);
    } else {
      console.log(`  ⏩ ${curso.nome} (já existe)`);
    }
  }
  
  console.log(`\n📊 ${inseridos} novos cursos inseridos!`);
  
  const total = await prisma.curso.count();
  console.log(`📊 Total de cursos no banco: ${total}`);
  
  const porPerfil = await prisma.curso.groupBy({
    by: ['perfisRecomendados'],
  });
  
  const perfis = ['Líder', 'Colaborativo', 'Técnico', 'Criativo', 'Acadêmico'];
  for (const perfil of perfis) {
    const count = await prisma.curso.count({
      where: { perfisRecomendados: { has: perfil } }
    });
    console.log(`  ${perfil}: ${count} cursos`);
  }
  
  await prisma.$disconnect();
}

main().catch(e => {
  console.error('❌ Erro:', e);
  prisma.$disconnect();
  process.exit(1);
});