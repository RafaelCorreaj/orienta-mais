import { apiClient } from './client';

class EntityService {
  constructor(entityName) {
    this.entityName = entityName;
    this.basePath = `/entities/${entityName}`;
  }

  list(orderBy = '-created_date', limit = 100) {
    return apiClient.get(this.basePath, { order_by: orderBy, limit });
  }

  filter(filters, orderBy = '-created_date', limit = 100) {
    const queryParams = new URLSearchParams();
    if (orderBy) queryParams.set('order_by', orderBy);
    if (limit) queryParams.set('limit', limit);
    
    // Add filters as query parameters
    Object.entries(filters).forEach(([key, value]) => {
      queryParams.set(key, value);
    });

    return apiClient.get(`${this.basePath}?${queryParams.toString()}`);
  }

  getById(id) {
    return apiClient.get(`${this.basePath}/${id}`);
  }

  create(data) {
    return apiClient.post(this.basePath, data);
  }

  update(id, data) {
    return apiClient.patch(`${this.basePath}/${id}`, data);
  }

  delete(id) {
    return apiClient.delete(`${this.basePath}/${id}`);
  }
}

// Criar instâncias para cada entidade do sistema
export const entities = {
  AvaliacaoPlataforma: new EntityService('AvaliacaoPlataforma'),
  Curso: new EntityService('Curso'),
  Diagnostico: new EntityService('Diagnostico'),
  EncontroMentoria: new EntityService('EncontroMentoria'),
  FilaMentoria: new EntityService('FilaMentoria'),
  Mentorado: new EntityService('Mentorado'),
  Monitor: new EntityService('Monitor'),
  User: new EntityService('User'),
};