const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { nome, email, senha, telefone, dataNascimento } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        telefone: telefone || null,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        status: 'Ativo'
      }
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin || false },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { senha: _, ...userWithoutPassword } = user;

    res.status(201).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha, password } = req.body;
    const senhaFinal = senha || password;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const senhaValida = await bcrypt.compare(senhaFinal, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    if (user.status !== 'Ativo') {
      return res.status(401).json({ error: 'Usuário inativo' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin || false },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { senha: _, ...userWithoutPassword } = user;

    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const googleCallback = async (req, res) => {
  try {
    // Após autenticação bem-sucedida via Passport, gerar JWT e redirecionar para o frontend
    const user = req.user;

    if (!user) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      return res.redirect(`${frontendUrl}/login?error=google_auth_failed`);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin || false },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { senha: _, ...userWithoutPassword } = user;

    // Redirecionar para o frontend com token na URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const encodedUser = encodeURIComponent(JSON.stringify(userWithoutPassword));

    res.redirect(`${frontendUrl}/auth/google-callback?token=${token}&user=${encodedUser}`);
  } catch (error) {
    console.error('Erro no callback Google:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/login?error=server_error`);
  }
};

const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        dataNascimento: true,
        dataCadastro: true,
        status: true,
        isAdmin: true
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

const updateMe = async (req, res) => {
  try {
    const { nome, telefone, dataNascimento, senha } = req.body;

    const updateData = {};
    if (nome) updateData.nome = nome;
    if (telefone) updateData.telefone = telefone;
    if (dataNascimento) updateData.dataNascimento = new Date(dataNascimento);
    if (senha) updateData.senha = await bcrypt.hash(senha, 10);

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: { id: true, nome: true, email: true, telefone: true, dataNascimento: true, isAdmin: true }
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

module.exports = { register, login, googleCallback, getMe, updateMe };