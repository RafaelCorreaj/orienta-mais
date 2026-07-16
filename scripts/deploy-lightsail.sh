#!/bin/bash
# ============================================
# 🚀 OrientA+ - Deploy Script para AWS Lightsail
# ============================================

# Configurações (PREENCHA ABAIXO)
LIGHTSAIL_IP="3.94.21.0"
LIGHTSAIL_USER="ubuntu"
SSH_KEY_PATH="~/.ssh/LightsailDefaultKey-us-east-1.pem"

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  🚀 OrientA+ - Deploy para Lightsail${NC}"
echo -e "${GREEN}========================================${NC}"

# 1️⃣ Transferir o projeto completo para a instância
echo -e "${YELLOW}📤 Transferindo projeto para Lightsail...${NC}"
rsync -avz -e "ssh -i $SSH_KEY_PATH" \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'dist' \
  --exclude '*.log' \
  --exclude '.env' \
  --exclude '.env.local' \
  --exclude '.env.production' \
  ./ "$LIGHTSAIL_USER@$LIGHTSAIL_IP:/home/ubuntu/orienta-mais/"

# 2️⃣ Criar .env com IP público
echo -e "${YELLOW}🔧 Configurando variáveis de ambiente...${NC}"
ssh -i "$SSH_KEY_PATH" "$LIGHTSAIL_USER@$LIGHTSAIL_IP" << 'ENDSSH'
  cd /home/ubuntu/orienta-mais
  PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)
  cat > .env << EOF
JWT_SECRET=orienta_prod_secret_$(openssl rand -hex 32)
FRONTEND_URL=http://$PUBLIC_IP
PUBLIC_IP=$PUBLIC_IP
EOF
  echo "✅ .env criado com IP: $PUBLIC_IP"
ENDSSH

# 3️⃣ Build e subir containers
echo -e "${YELLOW}🐳 Buildando e subindo containers...${NC}"
ssh -i "$SSH_KEY_PATH" "$LIGHTSAIL_USER@$LIGHTSAIL_IP" << 'ENDSSH'
  cd /home/ubuntu/orienta-mais
  
  # Parar containers existentes
  docker compose down
  
  # Build e subir
  docker compose up -d --build
  
  # Aguardar banco ficar pronto
  echo "⏳ Aguardando PostgreSQL ficar saudável..."
  sleep 15
  
  # Rodar migrações e seed
  echo "📦 Rodando migrações..."
  docker exec orienta-backend npx prisma migrate deploy
  
  echo "🌱 Rodando seed..."
  docker exec orienta-backend npx prisma db seed
  
  echo "✅ Deploy concluído!"
ENDSSH

# 4️⃣ Verificar status
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✅ Deploy concluído com sucesso!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${GREEN}📍 Frontend: http://$LIGHTSAIL_IP${NC}"
echo -e "${GREEN}📍 Health:    http://$LIGHTSAIL_IP:3001/api/health${NC}"
echo ""
echo -e "${YELLOW}📋 Lembre-se de abrir a porta 80 no firewall do Lightsail!${NC}"
echo "   Console AWS → Lightsail → Instância → Networking → Add rule"