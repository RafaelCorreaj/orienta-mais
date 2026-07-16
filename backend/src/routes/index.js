const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const entityRoutes = require('./entityRoutes');
const diagnosticoRoutes = require('./diagnosticoRoutes');
const mentoriaRoutes = require('./mentoriaRoutes');

router.use('/auth', authRoutes);
router.use('/entities', entityRoutes);
router.use('/diagnostico', diagnosticoRoutes);
router.use('/mentoria', mentoriaRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = router;