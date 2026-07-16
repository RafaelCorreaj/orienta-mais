const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Configuração de sessão (necessária para OAuth)
app.use(session({
  secret: process.env.JWT_SECRET || 'secret-orienta-mais',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', routes);

// Tratamento de erros
app.use(errorHandler);

module.exports = app;