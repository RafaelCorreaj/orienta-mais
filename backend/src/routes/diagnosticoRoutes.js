const express = require('express');
const router = express.Router();
const { submitDiagnostico, getUltimoDiagnostico, getRecomendacoes } = require('../controllers/diagnosticoController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, submitDiagnostico);
router.get('/', authMiddleware, getUltimoDiagnostico);
router.get('/recomendacoes', authMiddleware, getRecomendacoes);

module.exports = router;