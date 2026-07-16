#!/bin/bash
cd /home/ubuntu/orienta-mais
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)
echo "IP publico: $PUBLIC_IP"
JWT_SECRET=$(openssl rand -hex 32 2>/dev/null)
if [ -z "$JWT_SECRET" ]; then
  JWT_SECRET="orienta_prod_secret_change_me"
fi
cat > .env << EOF
JWT_SECRET=$JWT_SECRET
FRONTEND_URL=http://$PUBLIC_IP
PUBLIC_IP=$PUBLIC_IP
EOF
cat .env