const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Registro duplicado' });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Registro não encontrado' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
};

module.exports = errorHandler;