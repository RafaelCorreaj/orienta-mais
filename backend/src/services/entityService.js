const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const entityConfig = {
  User: { model: prisma.user, uniqueField: 'id' },
  Diagnostico: { model: prisma.diagnostico, uniqueField: 'id' },
  Curso: { model: prisma.curso, uniqueField: 'id' },
  Monitor: { model: prisma.monitor, uniqueField: 'id' },
  FilaMentoria: { model: prisma.filaMentoria, uniqueField: 'id' },
  Mentorado: { model: prisma.mentorado, uniqueField: 'id' },
  EncontroMentoria: { model: prisma.encontroMentoria, uniqueField: 'id' },
  AvaliacaoPlataforma: { model: prisma.avaliacaoPlataforma, uniqueField: 'id' }
};

const list = async (entityName, filters = {}) => {
  const config = entityConfig[entityName];
  if (!config) throw new Error(`Entidade ${entityName} não encontrada`);
  return await config.model.findMany({ where: filters });
};

const get = async (entityName, id) => {
  const config = entityConfig[entityName];
  if (!config) throw new Error(`Entidade ${entityName} não encontrada`);
  return await config.model.findUnique({ where: { [config.uniqueField]: id } });
};

const create = async (entityName, data) => {
  const config = entityConfig[entityName];
  if (!config) throw new Error(`Entidade ${entityName} não encontrada`);
  return await config.model.create({ data });
};

const update = async (entityName, id, data) => {
  const config = entityConfig[entityName];
  if (!config) throw new Error(`Entidade ${entityName} não encontrada`);
  return await config.model.update({
    where: { [config.uniqueField]: id },
    data
  });
};

const remove = async (entityName, id) => {
  const config = entityConfig[entityName];
  if (!config) throw new Error(`Entidade ${entityName} não encontrada`);
  return await config.model.delete({ where: { [config.uniqueField]: id } });
};

module.exports = { list, get, create, update, remove };