const express = require('express');
const router = express.Router();
const { 
  solicitarMentoria, 
  listarFilaPendente, 
  aceitarAluno, 
  listarMentorados, 
  registrarEncontro 
} = require('../controllers/mentoriaController');
const { authMiddleware } = require('../middleware/auth');

router.post('/solicitar', authMiddleware, solicitarMentoria);
router.get('/fila', authMiddleware, listarFilaPendente);
router.post('/aceitar/:filaId', authMiddleware, aceitarAluno);
router.get('/mentorados', authMiddleware, listarMentorados);
router.post('/encontro/:mentoradoId', authMiddleware, registrarEncontro);

module.exports = router;