export const PERFIL_DESCRICOES = {
  "Líder": {
    emoji: "👑",
    cor: "from-amber-500 to-orange-500",
    corBg: "bg-amber-50",
    corText: "text-amber-700",
    corBorder: "border-amber-200",
    descricao: "Você tem perfil de liderança! Gosta de tomar decisões, organizar grupos e inspirar pessoas. Você se destaca em posições de coordenação e gestão.",
    carreiras: ["Gestão de Projetos", "Empreendedorismo", "Coordenação de Equipes", "Administração"]
  },
  "Colaborativo": {
    emoji: "🤝",
    cor: "from-emerald-500 to-teal-500",
    corBg: "bg-emerald-50",
    corText: "text-emerald-700",
    corBorder: "border-emerald-200",
    descricao: "Você tem um perfil colaborativo! Trabalha muito bem em equipe, sabe ouvir e contribuir. Você brilha em ambientes cooperativos e de diálogo.",
    carreiras: ["Recursos Humanos", "Assistência Social", "Educação", "Saúde"]
  },
  "Técnico": {
    emoji: "⚙️",
    cor: "from-blue-500 to-cyan-500",
    corBg: "bg-blue-50",
    corText: "text-blue-700",
    corBorder: "border-blue-200",
    descricao: "Você tem perfil técnico! Gosta de resolver problemas práticos, trabalhar com tecnologia e processos. Você se destaca em áreas que exigem precisão e lógica.",
    carreiras: ["Tecnologia da Informação", "Engenharia", "Análise de Dados", "Manutenção"]
  },
  "Criativo": {
    emoji: "🎨",
    cor: "from-purple-500 to-pink-500",
    corBg: "bg-purple-50",
    corText: "text-purple-700",
    corBorder: "border-purple-200",
    descricao: "Você tem perfil criativo! Tem muita imaginação, gosta de inovar e expressar ideias. Você se destaca em áreas que valorizam originalidade e visão artística.",
    carreiras: ["Design", "Marketing", "Comunicação Visual", "Artes"]
  },
  "Acadêmico": {
    emoji: "📚",
    cor: "from-indigo-500 to-violet-500",
    corBg: "bg-indigo-50",
    corText: "text-indigo-700",
    corBorder: "border-indigo-200",
    descricao: "Você tem perfil acadêmico! Gosta de estudar, pesquisar e se aprofundar em assuntos. Você se destaca em ambientes que valorizam o conhecimento e a análise.",
    carreiras: ["Pesquisa", "Ensino", "Ciências", "Direito"]
  }
};

export const HABILIDADES_OPTIONS = [
  { id: "Comunicação", label: "Comunicação", descricao: "Falar em público, se expressar bem" },
  { id: "Matemática", label: "Matemática", descricao: "Fazer cálculos, raciocínio lógico" },
  { id: "Escrita", label: "Escrita", descricao: "Produzir textos, relatórios, redações" },
  { id: "Criatividade", label: "Criatividade", descricao: "Inventar coisas novas, pensar fora da caixa" },
  { id: "Resolver problemas", label: "Resolver problemas", descricao: "Encontrar soluções para desafios" },
  { id: "Trabalho em equipe", label: "Trabalho em equipe", descricao: "Colaborar com outras pessoas" },
  { id: "Liderança", label: "Liderança", descricao: "Guiar e motivar pessoas" },
  { id: "Tecnologia", label: "Tecnologia", descricao: "Usar computadores, softwares, programar" },
  { id: "Trabalhos manuais", label: "Trabalhos manuais", descricao: "Fazer artesanato, consertos, trabalhos com as mãos" }
];

export const INTERESSES_OPTIONS = [
  { id: "Saúde", label: "Saúde", descricao: "Cuidar de pessoas, medicina, enfermagem, psicologia" },
  { id: "Tecnologia", label: "Tecnologia", descricao: "Computadores, programação, robótica, internet" },
  { id: "Negócios", label: "Negócios", descricao: "Empreender, administrar, vendas, finanças" },
  { id: "Artes", label: "Artes", descricao: "Desenho, música, teatro, fotografia, design" },
  { id: "Esportes", label: "Esportes", descricao: "Praticar ou trabalhar com atividades físicas" },
  { id: "Educação", label: "Educação", descricao: "Ensinar, dar aulas, pedagogia" },
  { id: "Comunicação", label: "Comunicação", descricao: "Jornalismo, publicidade, redes sociais" },
  { id: "Meio ambiente", label: "Meio ambiente", descricao: "Sustentabilidade, ecologia, natureza" }
];

export const OPCOES_COMO_RESOLVE = [
  "Resolvo sozinho",
  "Peço ajuda",
  "Tento várias soluções",
  "Evito"
];

export const OPCOES_APRENDIZADO = [
  "Prática (fazendo)",
  "Teórica (estudando)",
  "Ambos"
];

export const ITENS_AUTOAVALIACAO = [
  { key: "organizacao", label: "Organização", descricao: "Capacidade de planejar e cumprir prazos" },
  { key: "comunicacao", label: "Comunicação", descricao: "Saber se expressar e ouvir os outros" },
  { key: "equipe", label: "Trabalho em equipe", descricao: "Colaborar e respeitar colegas" },
  { key: "responsabilidade", label: "Responsabilidade", descricao: "Cumprir compromissos e deveres" },
  { key: "criatividade", label: "Criatividade", descricao: "Capacidade de inovar e criar soluções" }
];

// ============================================================
// DICIONÁRIO COMPLETO DE PROFISSÕES E PALAVRAS-CHAVE (A-Z)
// ============================================================
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
    "filme", "cinema", "filmes",
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

// ============================================================
// NORMALIZAÇÃO DE TEXTO: converte string bruta em tokens úteis
// ============================================================
function normalizarTexto(texto) {
  if (!texto || texto.trim() === "") return [];

  // 1. Lowercase
  let t = texto.toLowerCase();

  // 2. Remove "ou" (conjunções) - separa "advogado ou advogado ou advogado"
  //    Substitui " ou " por espaço para evitar separar palavras compostas
  t = t.replace(/\s+ou\s+/g, " ");

  // 3. Remove pontuação básica
  t = t.replace(/[.,!?;:()\[\]{}"'`´^~]/g, " ");

  // 4. Remove acentos (para capturar "psicologo" ≈ "psicólogo")
  t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 5. Remove espaços duplicados
  t = t.replace(/\s+/g, " ").trim();

  // 6. Divide em palavras individuais
  const palavras = t.split(" ").filter(p => p.length > 1);

  return palavras;
}

function analisarTexto(texto) {
  if (!texto || texto.trim() === "") return null;

  // Normaliza o texto e obtém tokens
  const tokens = normalizarTexto(texto);
  const textoLower = texto.toLowerCase();
  const scores = { lideranca: 0, colaborativo: 0, tecnico: 0, criativo: 0, academico: 0 };

  // Para cada perfil, conta ocorrências de palavras-chave
  for (const [perfil, palavras] of Object.entries(PALAVRAS_CHAVE)) {
    for (const palavra of palavras) {
      const palavraLower = palavra.toLowerCase();
      // Verifica ocorrência no texto original normalizado (para frases curtas como "analista de dados")
      if (textoLower.includes(palavraLower)) {
        scores[perfil] += 1;
      }
    }
    // Verifica tokens individuais contra formas_singular/radicais
    for (const token of tokens) {
      for (const palavra of palavras) {
        const palavraLower = palavra.toLowerCase();
        // Token corresponde exatamente à palavra ou a palavra começa com o token
        if (token === palavraLower) {
          // Já contado pelo includes acima, só adiciona se ainda não contou
        }
      }
    }
  }

  // CONTAGEM REAL: para cada token, verifica se corresponde a alguma palavra-chave
  // Isso captura múltiplas ocorrências da MESMA profissão
  for (const token of tokens) {
    for (const [perfil, palavras] of Object.entries(PALAVRAS_CHAVE)) {
      for (const palavra of palavras) {
        if (token === palavra.toLowerCase()) {
          scores[perfil] += 1;
          break; // Conta 1 por token por perfil
        }
      }
    }
  }

  return scores;
}

export function calcularPontuacaoTotal(data) {
  const pontosHabilidades = (data.habilidades || []).length;
  const pontosInteresses = (data.interesses || []).length;
  const pontosProfissao = data.profissaoEmMente ? 2 : 0;

  let pontosEstilo = 0;
  if (data.estiloGrupo === "Lidera" || data.estiloGrupo === "Colabora") {
    pontosEstilo = 2;
  } else if (data.estiloGrupo) {
    pontosEstilo = 1;
  }

  const auto = data.autoavaliacao || {};
  const somaAuto = (auto.organizacao || 0) + (auto.comunicacao || 0) +
    (auto.equipe || 0) + (auto.responsabilidade || 0) + (auto.criatividade || 0);

  return pontosHabilidades + pontosInteresses + pontosProfissao + pontosEstilo + somaAuto;
}

export function getFaixaDesempenho(pontuacao) {
  if (pontuacao <= 15) return { label: "Precisa de direcionamento", cor: "text-red-500", bg: "bg-red-50" };
  if (pontuacao <= 30) return { label: "Perfil em desenvolvimento", cor: "text-yellow-500", bg: "bg-yellow-50" };
  if (pontuacao <= 45) return { label: "Bom potencial", cor: "text-blue-500", bg: "bg-blue-50" };
  return { label: "Alto potencial", cor: "text-emerald-500", bg: "bg-emerald-50" };
}

export function calcularPerfil(data) {
  let pontos = { lideranca: 0, colaborativo: 0, tecnico: 0, criativo: 0, academico: 0 };

  const hab = data.habilidades || [];
  const inter = data.interesses || [];
  const auto = data.autoavaliacao || {};

  const conflitoLiderSozinho = data.estiloTrabalho === "Sozinho" && data.estiloGrupo === "Lidera";
  const conflitoColaboraSozinho = data.estiloTrabalho === "Sozinho" && data.estiloGrupo === "Colabora";

  // 1. HABILIDADES
  if (hab.includes("Liderança")) pontos.lideranca += conflitoLiderSozinho ? 0 : 2;
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

  // 3. ESTILO DE TRABALHO
  if (data.estiloGrupo === "Lidera") {
    if (conflitoLiderSozinho) { pontos.lideranca -= 2; pontos.tecnico += 2; }
    else { pontos.lideranca += 2; }
  }
  if (data.estiloGrupo === "Colabora") {
    if (conflitoColaboraSozinho) { pontos.colaborativo -= 1; pontos.tecnico += 1; }
    else { pontos.colaborativo += 2; }
  }
  if (data.estiloGrupo === "Observa") { pontos.academico += 1; if (data.estiloTrabalho === "Sozinho") pontos.tecnico += 1; }
  if (data.estiloGrupo === "Reservado") { pontos.tecnico += 2; }
  if (data.estiloTrabalho === "Sozinho" && data.estiloGrupo !== "Reservado") { pontos.tecnico += 1; }

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

  // 5. ANÁLISE DE TEXTO LIVRE (agora com normalização e contagem)
  const textos = [data.sonho, data.tempoLivre, data.querAprender];
  for (const texto of textos) {
    const score = analisarTexto(texto);
    if (score) {
      for (const p of Object.keys(pontos)) pontos[p] += Math.round(score[p] * 0.5);
    }
  }
  // Profissão em mente: peso 2.0, e agora conta múltiplas ocorrências
  const scoreProfissao = analisarTexto(data.profissaoEmMente);
  if (scoreProfissao) {
    for (const p of Object.keys(pontos)) pontos[p] += Math.round(scoreProfissao[p] * 2.0);
  }

  // 6. PREFERÊNCIA DE APRENDIZADO
  if (data.preferenciaAprendizado === "Prática (fazendo)") pontos.tecnico += 1;
  else if (data.preferenciaAprendizado === "Teórica (estudando)") pontos.academico += 1;
  else if (data.preferenciaAprendizado === "Ambos") { pontos.academico += 0.5; pontos.tecnico += 0.5; }

  // 7. COMO RESOLVE
  if (data.comoResolveProblemas === "Resolvo sozinho") pontos.tecnico += 1;
  if (data.comoResolveProblemas === "Peço ajuda") pontos.colaborativo += 1;
  if (data.comoResolveProblemas === "Tento várias soluções") pontos.criativo += 1;

  // ==================== RESULTADO FINAL ====================
  const pontuacaoTotal = calcularPontuacaoTotal(data);
  const sorted = Object.entries(pontos).sort((a, b) => b[1] - a[1]);
  let perfil = "Acadêmico";

  if (sorted[0][1] - sorted[1][1] >= 2) {
    if (sorted[0][0] === "lideranca") perfil = "Líder";
    else if (sorted[0][0] === "colaborativo") perfil = "Colaborativo";
    else if (sorted[0][0] === "tecnico") perfil = "Técnico";
    else if (sorted[0][0] === "criativo") perfil = "Criativo";
  } else {
    const scoreTexto = analisarTexto(data.sonho) || analisarTexto(data.profissaoEmMente);
    if (scoreTexto) {
      const sortedTexto = Object.entries(scoreTexto).sort((a, b) => b[1] - a[1]);
      if (sortedTexto[0][1] > 0) {
        if (sortedTexto[0][0] === "lideranca") perfil = "Líder";
        else if (sortedTexto[0][0] === "colaborativo") perfil = "Colaborativo";
        else if (sortedTexto[0][0] === "tecnico") perfil = "Técnico";
        else if (sortedTexto[0][0] === "criativo") perfil = "Criativo";
      }
    }
  }

  return { perfil, pontuacaoTotal, pontos, faixa: getFaixaDesempenho(pontuacaoTotal) };
}