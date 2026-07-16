#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🐳 OrientA+ - Docker Build Script${NC}"

# Carregar variáveis de ambiente
if [ -f .env.docker ]; then
    export $(cat .env.docker | grep -v '^#' | xargs)
    echo -e "${GREEN}✅ Variáveis de ambiente carregadas${NC}"
else
    echo -e "${YELLOW}⚠️  Arquivo .env.docker não encontrado. Usando defaults.${NC}"
fi

# Parar containers existentes
echo -e "${YELLOW}🛑 Parando containers existentes...${NC}"
docker-compose down

# Build das imagens
echo -e "${YELLOW}🔨 Buildando imagens...${NC}"
docker-compose build --no-cache

# Subir containers
echo -e "${GREEN}🚀 Subindo containers...${NC}"
docker-compose up -d

# Aguardar backend ficar pronto
echo -e "${YELLOW}⏳ Aguardando backend...${NC}"
sleep 10

# Rodar migrações e seed
echo -e "${YELLOW}📦 Rodando migrações...${NC}"
docker exec orienta-backend npx prisma migrate deploy
docker exec orienta-backend npx prisma db seed

echo -e "${GREEN}✅ OrientA+ está rodando!${NC}"
echo -e "${GREEN}📍 Frontend: http://localhost${NC}"
echo -e "${GREEN}📍 Backend API: http://localhost:3001${NC}"
echo -e "${GREEN}📍 Health Check: http://localhost:3001/api/health${NC}"