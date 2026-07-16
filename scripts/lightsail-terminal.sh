#!/bin/bash
# ============================================
# 🚀 Comandos para executar no terminal Lightsail
# ============================================
# Copie e cole um por um!

# 1. Entrar no projeto
cd /home/ubuntu/orienta-mais

# 2. Parar tudo que estava rodando
docker compose down
docker system prune -f

# 3. Ver arquivos na pasta
ls -la

# 4. Build e subir containers
docker compose up -d --build

# 5. Ver status (aguarde todos ficarem "healthy" ou "running")
docker compose ps

# 6. Ver logs do backend (para debug)
docker logs orienta-backend

# 7. Rodar migrações
docker exec orienta-backend npx prisma migrate deploy

# 8. Rodar seed
docker exec orienta-backend npx prisma db seed

# 9. Testar API
curl http://localhost/api/health

# 10. Testar pelo IP público
curl http://32.197.166.253/api/health

# 11. Ver IP público configurado
cat .env