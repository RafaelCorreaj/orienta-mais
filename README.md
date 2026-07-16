# Orienta+ 🧭

**Plataforma Social de Orientação de Carreira para Jovens**

O Orienta+ é uma aplicação web gratuita desenvolvida para ajudar jovens de 17 a 20 anos, de baixa renda, a descobrirem seu perfil profissional, receberem recomendações de cursos livres gratuitos e obterem acompanhamento de mentores voluntários.

> **Projeto 100% independente** — Backend próprio desenvolvido do zero com Node.js, Express, Prisma e PostgreSQL.

<p align="center">
  <a href="https://orienta-mais.caffeinehouse.com.br">
    <img src="https://img.shields.io/badge/🌐_Online-em_branco?style=for-the-badge&label=orienta--mais.caffeinehouse.com.br&labelColor=blue&color=white" alt="Online">
  </a>
</p>

---

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Backend Próprio](#-backend-próprio)
- [Modelo de Dados](#-modelo-de-dados)
- [Fluxo de Navegação](#-fluxo-de-navegação)
- [Perfis de Usuário](#-perfis-de-usuário)
- [Base de Cursos](#-base-de-cursos)
- [Como Executar](#-como-executar)
- [API de Backend](#-api-de-backend)
- [Deploy em Produção](#-deploy-em-produção)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## ✨ Funcionalidades

### 👤 Aluno
- **Cadastro e Autenticação** — Login com e-mail/senha ou Google OAuth
- **Diagnóstico de Perfil** — Questionário em etapas que classifica o perfil profissional em 5 categorias: Líder, Colaborativo, Técnico, Criativo e Acadêmico
- **Recomendação de Cursos** — 60 cursos gratuitos recomendados de acordo com o perfil identificado
- **Mentoria** — Solicitação de acompanhamento com monitor voluntário via fila de espera
- **Dashboard** — Visão geral do perfil, status da mentoria e recomendações
- **Avaliação** — Feedback sobre a utilidade da plataforma

### 👨‍🏫 Monitor
- **Dashboard** — Visão geral de alunos pendentes e mentorados ativos
- **Fila de Espera** — Alunos organizados por perfil aguardando match
- **Aceitar Mentorado** — Vincula o aluno ao monitor e compartilha contatos
- **Acompanhamento** — Registro de encontros, check-ins e progresso dos mentorados
- **Perfil do Mentorado** — Acesso ao diagnóstico completo e histórico

### 🔧 Administrador
- **Dashboard** — Métricas gerais: total de usuários, distribuição de perfis, fila de mentoria
- **Gerenciar Monitores** — CRUD completo de monitores
- **Gerenciar Cursos** — CRUD completo da base de cursos
- **Fila de Mentoria** — Visualização de toda a fila de espera
- **Relatórios** — Dados agregados dos diagnósticos e avaliações

---

## 🚀 Tecnologias

### Frontend
| Categoria | Tecnologia |
|-----------|-----------|
| **Framework** | React 18 |
| **Linguagem** | JavaScript (JSX) |
| **Build** | Vite 6 |
| **Roteamento** | React Router DOM v6 |
| **Requisições HTTP** | Fetch API (serviço próprio) |
| **Gerenciamento de Estado** | React Context + TanStack Query |
| **Autenticação** | Serviço próprio com JWT Bearer Token |
| **Estilização** | Tailwind CSS |
| **Componentes UI** | Radix UI + shadcn/ui |
| **Formulários** | React Hook Form + Zod |
| **Gráficos** | Recharts |
| **Animações** | Framer Motion |
| **Ícones** | Lucide React |

### Backend (Próprio)
| Categoria | Tecnologia |
|-----------|-----------|
| **Runtime** | Node.js 22 |
| **Framework** | Express.js |
| **Banco de Dados** | PostgreSQL 16 |
| **ORM** | Prisma ORM |
| **Autenticação** | JWT + bcrypt + Passport.js (Google OAuth) |
| **Validação** | Joi |
| **Sessão** | express-session |
| **CORS** | cors |

---

## 📁 Estrutura do Projeto

```
jovem-futuro/
├── backend/                        # 🆕 Backend próprio
│   ├── prisma/
│   │   ├── schema.prisma           # 8 modelos de dados
│   │   ├── seed.js                 # Seed inicial (admin, aluno, monitor, cursos)
│   │   └── seed-cursos.js          # Expansão da base de cursos (60 cursos)
│   ├── src/
│   │   ├── app.js                  # Express + CORS + Session + Passport
│   │   ├── config/
│   │   │   └── passport.js         # Estratégia Google OAuth
│   │   ├── controllers/
│   │   │   ├── authController.js   # register, login, googleCallback, getMe, updateMe
│   │   │   ├── diagnosticoController.js  # submit + calcularPerfil + recomendações
│   │   │   └── mentoriaController.js     # fila, aceitar, mentorados, encontros
│   │   ├── middleware/
│   │   │   ├── auth.js             # JWT + admin middleware
│   │   │   └── errorHandler.js     # Tratamento de erros Prisma
│   │   ├── routes/
│   │   │   ├── authRoutes.js       # /register, /login, /google, /me
│   │   │   ├── entityRoutes.js     # CRUD genérico (8 entidades)
│   │   │   ├── diagnosticoRoutes.js # POST / + GET /recomendacoes
│   │   │   └── mentoriaRoutes.js   # /solicitar, /fila, /aceitar, /mentorados, /encontro
│   │   └── services/
│   │       └── entityService.js    # CRUD genérico
│   ├── server.js                   # Ponto de entrada
│   ├── package.json
│   ├── render.yaml                 # Configuração de deploy no Render
│   ├── .env                        # Variáveis de ambiente (desenvolvimento)
│   └── .env.production             # Template para produção
├── src/                            # Frontend React
│   ├── api/
│   │   ├── client.js               # Cliente HTTP genérico
│   │   ├── auth.js                 # Serviço de autenticação
│   │   ├── entities.js             # Serviço de entidades CRUD
│   │   ├── base44Client.js         # Bridge de compatibilidade
│   │   └── index.js                # Barrel exports
│   ├── components/
│   │   ├── diagnostic/             # Componentes do formulário diagnóstico
│   │   ├── layout/                 # Layout principal com navegação
│   │   ├── shared/                 # Componentes compartilhados
│   │   ├── ui/                     # Componentes shadcn/ui
│   │   ├── ProtectedRoute.jsx
│   │   └── UserNotRegisteredError.jsx
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── admin/                  # Páginas do administrador
│   │   ├── diagnostic/             # Página de diagnóstico
│   │   ├── monitor/                # Páginas do monitor
│   │   ├── GoogleCallbackPage.jsx  # 🆕 Callback Google OAuth
│   │   └── ...
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.local                      # Variáveis de ambiente do frontend
├── .env.production                 # Template para produção
├── .gitignore
└── README.md
```

---

## 🗄️ Modelo de Dados

### Entidades (8 modelos)

| Entidade | Descrição |
|----------|-----------|
| **User** | Alunos cadastrados na plataforma |
| **Diagnostico** | Resultados do diagnóstico de perfil |
| **Curso** | Cursos livres gratuitos recomendados |
| **Monitor** | Mentores voluntários cadastrados |
| **FilaMentoria** | Fila de espera para match aluno-monitor |
| **Mentorado** | Relacionamento ativo entre aluno e monitor |
| **EncontroMentoria** | Registro de check-ins e encontros |
| **AvaliacaoPlataforma** | Feedbacks dos alunos sobre a plataforma |

### Relacionamentos
```
User 1──N Diagnostico
User 1──1 FilaMentoria
User 1──N Mentorado (como aluno)
User 1──N AvaliacaoPlataforma
Monitor 1──N Mentorado (como monitor)
Mentorado 1──N EncontroMentoria
```

---

## 🔀 Fluxo de Navegação

### Aluno
```
Landing → Login/Cadastro → Dashboard
                              ├── Diagnóstico (questionário em etapas)
                              │     └── Resultado → Cursos Recomendados (60 cursos)
                              │                    └── Solicitar Mentoria
                              │                          └── Aguardando Match
                              ├── Cursos (recomendações por perfil)
                              └── Mentoria (status da solicitação)
```

### Monitor
```
Login → Dashboard
          ├── Alunos Pendentes → Detalhe → Aceitar Match
          └── Mentorados Ativos → Perfil do Aluno
                                  └── Registrar Encontro
```

### Administrador
```
Login → Dashboard
          ├── Monitores (CRUD)
          ├── Cursos (CRUD)
          └── Avaliações
```

---

## 👥 Perfis de Usuário

| Perfil | Descrição |
|--------|-----------|
| **Aluno** | Jovem que realiza o diagnóstico e solicita mentoria |
| **Monitor** | Voluntário que acompanha os alunos |
| **Admin** | Gestor da plataforma |

---

## 📚 Base de Cursos

Atualmente o sistema conta com **60 cursos** distribuídos entre os perfis:

| Perfil | Cursos Disponíveis |
|--------|-------------------|
| 👑 **Líder** | 20 cursos |
| 🤝 **Colaborativo** | 23 cursos |
| ⚙️ **Técnico** | 26 cursos |
| 🎨 **Criativo** | 22 cursos |
| 📚 **Acadêmico** | 25 cursos |

Os cursos são de plataformas gratuitas como SENAC EAD, Fundação Bradesco, SEBRAE, Coursera, Udemy, FIA, IEL, Google Atelier Digital, abrangendo áreas como Tecnologia, Gestão, Artes, Educação, Saúde, Empreendedorismo e Comunicação.

---

## ⚙️ Como Executar

### Pré-requisitos
- Node.js 18+ (recomendado: 22.x)
- npm 10+
- PostgreSQL 16 (ou Supabase na nuvem)

### Passos

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd jovem-futuro

# 2. Configure o banco de dados PostgreSQL
# Crie um banco chamado orienta_mais
psql -U postgres -c "CREATE DATABASE orienta_mais;"

# 3. Configure o backend
cd backend
cp .env.example .env   # Ajuste DATABASE_URL se necessário
npm install
npx prisma db push     # Cria as tabelas
node prisma/seed.js    # Popula dados iniciais
node prisma/seed-cursos.js  # 🆕 Expande para 60 cursos

# 4. Inicie o backend
npm run dev
# Servidor rodando em http://localhost:3001

# 5. Configure o frontend (outro terminal)
cd ..
cp .env.local.example .env.local  # ou crie com:
# VITE_API_BASE_URL=http://localhost:3001/api
npm install
npm run dev
# Frontend rodando em http://localhost:5173
```

### Credenciais de Teste

| Tipo | Email | Senha |
|------|-------|-------|
| **Admin** | admin@orientamais.com | admin123 |
| **Aluno** | aluno@teste.com | aluno123 |
| **Monitor** | monitor@orientamais.com | monitor123 |

---

## 🔌 API de Backend

### Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/register` | Cadastro de novo usuário |
| POST | `/api/auth/login` | Login (aceita `senha` ou `password`) |
| GET | `/api/auth/me` | Dados do usuário logado (requer token) |
| PATCH | `/api/auth/me` | Atualizar perfil (requer token) |
| GET | `/api/auth/google` | Iniciar login com Google OAuth |
| GET | `/api/auth/google/callback` | Callback Google OAuth |

### Diagnóstico
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/diagnostico` | Submeter diagnóstico (calcula perfil automaticamente) |
| GET | `/api/diagnostico/recomendacoes` | Cursos recomendados baseados no perfil |

### Mentoria
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/mentoria/solicitar` | Entrar na fila de mentoria |
| GET | `/api/mentoria/fila` | Listar solicitações pendentes |
| POST | `/api/mentoria/aceitar/:id` | Monitor aceita aluno da fila |
| GET | `/api/mentoria/mentorados` | Listar mentorados do monitor |
| POST | `/api/mentoria/encontro/:id` | Registrar encontro com mentorado |

### Entidades (CRUD genérico)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/entities/{nome}` | Listar entidades |
| GET | `/api/entities/{nome}/{id}` | Obter por ID |
| POST | `/api/entities/{nome}` | Criar entidade |
| PATCH | `/api/entities/{nome}/{id}` | Atualizar entidade |
| DELETE | `/api/entities/{nome}/{id}` | Deletar entidade (admin) |

**Entidades disponíveis:** `User`, `Diagnostico`, `Curso`, `Monitor`, `FilaMentoria`, `Mentorado`, `EncontroMentoria`, `AvaliacaoPlataforma`

### Health Check
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Verificar se o servidor está rodando |

---

## 🚀 Deploy em Produção

### Opção 1: Render (Recomendado - Gratuito)

O projeto inclui o arquivo `backend/render.yaml` para deploy automatizado no Render.

```bash
# 1. Push para o GitHub
git add .
git commit -m "Deploy final Orienta+"
git push origin main

# 2. No Render.com:
#    - New+ → PostgreSQL → "orienta-mais-db"
#    - New+ → Web Service (backend)
#         Build Command: npm install && npx prisma generate
#         Start Command: npm start
#    - New+ → Static Site (frontend)
#         Build Command: npm run build
#         Publish Directory: dist

# 3. Variáveis de ambiente (backend):
#    - DATABASE_URL: conexão PostgreSQL do Render
#    - JWT_SECRET: gerar valor aleatório
#    - FRONTEND_URL: URL do frontend no Render
#    - NODE_ENV: production

# 4. Após deploy, rodar migrações:
npx prisma migrate deploy
node prisma/seed.js
node prisma/seed-cursos.js
```

### Opção 2: Vercel + Supabase

```bash
# Frontend na Vercel
npm install -g vercel
vercel --prod

# Backend no Railway
cd backend
railway login
railway init
railway up

# Banco no Supabase (supabase.com)
# Copiar DATABASE_URL e configurar no backend
```

### Custo: R$ 0,00 (planos gratuitos)

---

## 📜 Scripts Disponíveis

### Frontend
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento Vite |
| `npm run build` | Gera build de produção |
| `npm run preview` | Visualiza o build localmente |

### Backend
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor com nodemon (desenvolvimento) |
| `npm start` | Inicia servidor (produção) |
| `npm run migrate` | Executa migrações do Prisma |
| `npm run seed` | Popula banco com dados iniciais |
| `npm run postinstall` | Gera cliente Prisma automaticamente |

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Minha nova feature'`
4. Push: `git push origin minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---

<p align="center">Feito com 💜 para ajudar jovens a construírem seu futuro profissional</p>