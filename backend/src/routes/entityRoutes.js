const express = require('express');
const router = express.Router();
const entityService = require('../services/entityService');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const ENTITIES = ['User', 'Diagnostico', 'Curso', 'Monitor', 'FilaMentoria', 'Mentorado', 'EncontroMentoria', 'AvaliacaoPlataforma'];

// Criar rota genérica para cada entidade
ENTITIES.forEach(entityName => {
  router.get(`/${entityName}`, authMiddleware, async (req, res) => {
    try {
      const data = await entityService.list(entityName);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get(`/${entityName}/:id`, authMiddleware, async (req, res) => {
    try {
      const data = await entityService.get(entityName, req.params.id);
      if (!data) return res.status(404).json({ error: 'Não encontrado' });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post(`/${entityName}`, authMiddleware, async (req, res) => {
    try {
      const data = await entityService.create(entityName, req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.patch(`/${entityName}/:id`, authMiddleware, async (req, res) => {
    try {
      const data = await entityService.update(entityName, req.params.id, req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete(`/${entityName}/:id`, authMiddleware, adminMiddleware, async (req, res) => {
    try {
      await entityService.remove(entityName, req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

module.exports = router;