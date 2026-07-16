const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mapeamento de links corrigidos para URLs reais e funcionais
const LINKS_CORRIGIDOS = {
  // === PERFIL LÍDER ===
  'Gestão de Pessoas e Liderança': 'https://www.ev.org.br/cursos/gestao-de-pessoas',
  'Oratória e Apresentações de Impacto': 'https://www.ev.org.br/cursos/comunicacao-e-oratoria',
  'Negociação e Gestão de Conflitos': 'https://www.ev.org.br/cursos/negociacao',
  'Planejamento Estratégico': 'https://www.ev.org.br/cursos/planejamento-estrategico',
  'Gestão de Tempo e Produtividade': 'https://www.ev.org.br/cursos/gestao-de-tempo',
  'Inteligência Emocional no Trabalho': 'https://www.ev.org.br/cursos/inteligencia-emocional',
  'Gestão Financeira para PMEs': 'https://www.sebrae.com.br/sites/PortalSebrae/cursosonline/gestao-financeira',
  'Formação de Preços e Vendas': 'https://www.sebrae.com.br/sites/PortalSebrae/cursosonline/formacao-de-precos',
  'Liderança Inovadora': 'https://www.coursera.org/learn/lideranca-inovadora',
  'Tomada de Decisão Baseada em Dados': 'https://www.ev.org.br/cursos/tomada-de-decisao',

  // === PERFIL COLABORATIVO ===
  'Assistência Social e Voluntariado': 'https://www.ev.org.br/cursos/assistencia-social',
  'Mediação e Diálogo Comunitário': 'https://www.ev.org.br/cursos/mediacao',
  'Saúde Mental e Bem-Estar': 'https://www.ev.org.br/cursos/saude-mental',
  'Atendimento ao Cliente e Experiência': 'https://www.sebrae.com.br/sites/PortalSebrae/cursosonline/atendimento-ao-cliente',
  'Trabalho em Equipe e Colaboração': 'https://www.ev.org.br/cursos/trabalho-em-equipe',
  'Psicologia Positiva e Motivação': 'https://www.coursera.org/learn/positive-psychology',
  'Educação Inclusiva e Diversidade': 'https://www.ev.org.br/cursos/diversidade-nas-organizacoes',
  'Recursos Humanos e Gestão de Talentos': 'https://www.ev.org.br/cursos/gestao-de-pessoas',
  'Ética e Cidadania': 'https://www.ev.org.br/cursos/etica-e-cidadania',
  'Primeiros Socorros e Segurança': 'https://www.coursera.org/learn/first-aid',

  // === PERFIL TÉCNICO ===
  'Lógica de Programação': 'https://www.ev.org.br/cursos/logica-de-programacao',
  'Banco de Dados SQL': 'https://www.coursera.org/learn/sql-for-data-science',
  'Redes de Computadores': 'https://www.coursera.org/learn/computer-networking',
  'Segurança da Informação': 'https://www.ev.org.br/cursos/seguranca-da-informacao',
  'Manutenção de Computadores': 'https://www.ev.org.br/cursos/manutencao-de-computadores',
  'Excel Avançado e Power BI': 'https://www.ev.org.br/cursos/excel-avancado',
  'Automação com Python': 'https://www.coursera.org/learn/python-automation',
  'Cloud Computing (AWS)': 'https://www.coursera.org/learn/aws-cloud-practitioner',
  'Eletrônica Básica': 'https://www.ev.org.br/cursos/eletronica-basica',
  'Desenvolvimento de Aplicativos Mobile': 'https://www.coursera.org/learn/android-app-development',

  // === PERFIL CRIATIVO ===
  'Design Gráfico (Canva/Photoshop)': 'https://www.ev.org.br/cursos/design-grafico',
  'Edição de Vídeo (Premiere/DaVinci)': 'https://www.coursera.org/learn/video-editing',
  'Fotografia para Iniciantes': 'https://www.ev.org.br/cursos/fotografia',
  'Produção de Conteúdo Digital': 'https://www.ev.org.br/cursos/producao-de-conteudo',
  'Roteiro e Storytelling': 'https://www.coursera.org/learn/storytelling',
  'UX/UI Design': 'https://www.coursera.org/learn/user-experience-design',
  'Ilustração Digital': 'https://www.coursera.org/learn/digital-illustration',
  'Música Digital e Produção Musical': 'https://www.coursera.org/learn/music-production',
  'Moda e Estilo': 'https://www.ev.org.br/cursos/moda',
  'Animação e Motion Graphics': 'https://www.coursera.org/learn/motion-graphics',

  // === PERFIL ACADÊMICO ===
  'Metodologia Científica': 'https://www.ev.org.br/cursos/metodologia-cientifica',
  'Matemática Financeira': 'https://www.ev.org.br/cursos/matematica-financeira',
  'Estatística Aplicada': 'https://www.coursera.org/learn/statistics',
  'Português para Concursos': 'https://www.ev.org.br/cursos/portugues',
  'Inglês Instrumental': 'https://www.ev.org.br/cursos/ingles',
  'Redação Científica e Acadêmica': 'https://www.coursera.org/learn/academic-writing',
  'História do Brasil Contemporâneo': 'https://www.ev.org.br/cursos/historia-do-brasil',
  'Filosofia e Pensamento Crítico': 'https://www.coursera.org/learn/critical-thinking',
  'Biologia e Ciências Naturais': 'https://www.ev.org.br/cursos/biologia',
  'Leitura e Interpretação de Textos': 'https://www.ev.org.br/cursos/leitura-e-interpretacao',
};

async function main() {
  console.log('🔗 Corrigindo links dos cursos...\n');
  
  let total = 0;
  
  for (const [nome, link] of Object.entries(LINKS_CORRIGIDOS)) {
    const curso = await prisma.curso.findFirst({ where: { nome } });
    
    if (curso) {
      await prisma.curso.update({
        where: { id: curso.id },
        data: { link }
      });
      console.log(`  ✅ ${nome}`);
      total++;
    } else {
      console.log(`  ⚠️  Curso não encontrado: ${nome}`);
    }
  }
  
  const totalCursos = await prisma.curso.count();
  console.log(`\n📊 ${total} links corrigidos!`);
  console.log(`📊 Total de cursos no banco: ${totalCursos}`);
  
  await prisma.$disconnect();
}

main().catch(e => {
  console.error('❌ Erro:', e);
  prisma.$disconnect();
  process.exit(1);
});