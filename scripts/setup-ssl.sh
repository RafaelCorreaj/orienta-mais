# Script para configurar HTTPS com Let's Encrypt + Nginx
# Execute DENTRO da instância Lightsail

DOMAIN="orienta-mais.caffeinehouse.com.br"
EMAIL="admin@caffeinehouse.com.br"
IP="100.31.136.53"

echo "🔧 Configurando HTTPS para $DOMAIN..."
echo ""
echo "⚠️  ANTES DE CONTINUAR:"
echo "   Crie um registro A no DNS:"
echo "   $DOMAIN -> $IP"
echo ""
read -p "Registro DNS criado? (enter para continuar) " -n 1 -r

# 1. Parar o frontend (Nginx) pra liberar porta 80
echo "🛑 Parando container frontend..."
docker compose -f /home/ubuntu/orienta-mais/docker-compose.yml stop frontend

# 2. Instalar certbot
echo "📦 Instalando certbot..."
sudo apt-get install -y certbot python3-certbot-nginx 2>/dev/null

# 3. Gerar certificado SSL (modo standalone)
echo "🔐 Gerando certificado SSL..."
sudo certbot certonly --standalone -d $DOMAIN --non-interactive --agree-tos --email $EMAIL

# 4. Criar configuração Nginx com SSL
echo "📝 Criando config Nginx..."
sudo mkdir -p /etc/nginx/conf.d
sudo tee /etc/nginx/conf.d/orienta-mais.conf > /dev/null << 'NGINXCONF'
server {
    listen 80;
    server_name DOMAIN_PLACEHOLDER;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name DOMAIN_PLACEHOLDER;

    ssl_certificate /etc/letsencrypt/live/DOMAIN_PLACEHOLDER/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/DOMAIN_PLACEHOLDER/privkey.pem;

    # Segurança SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Headers de segurança
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://127.0.0.1:80;  # Aponta para o container frontend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3001;  # Aponta para o container backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINXCONF

# Substituir placeholder
sudo sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" /etc/nginx/conf.d/orienta-mais.conf

# 5. Iniciar Nginx
echo "🚀 Iniciando Nginx..."
sudo systemctl enable nginx 2>/dev/null
sudo nginx -t && sudo systemctl restart nginx

# 6. Atualizar .env
echo "📝 Atualizando .env..."
cd /home/ubuntu/orienta-mais
cat > .env << EOF
JWT_SECRET=$(openssl rand -hex 32)
FRONTEND_URL=https://${DOMAIN}
PUBLIC_IP=${IP}
GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID:-SEU_CLIENT_ID_AQUI}
GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET:-SEU_CLIENT_SECRET_AQUI}
GOOGLE_CALLBACK_URL=https://${DOMAIN}/api/auth/google/callback
EOF

# 7. Reiniciar backend
echo "🔄 Reiniciando backend..."
docker compose restart backend

# 8. Testar
echo ""
echo "============================================"
echo "✅ HTTPS configurado com sucesso!" 
echo "📍 https://$DOMAIN"
echo "📍 Callback: https://$DOMAIN/api/auth/google/callback"
echo "============================================"
echo ""
echo "⚡ IMPORTANTE: No Google Cloud Console, adicione:"
echo "   https://$DOMAIN/api/auth/google/callback"
echo "   nas URIs de redirecionamento autorizados!"