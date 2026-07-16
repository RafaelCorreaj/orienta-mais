# deploy-pronto.ps1
Write-Host "🐳 Enviando projeto PRONTO para Lightsail..." -ForegroundColor Green
Write-Host ""

$KEY = "C:\Users\Rafael\Documents\LightsailDefaultKey-us-east-1.pem"
$USER = "ubuntu"
$IP = "32.197.166.253"

# 1. Verificar se instância está acessível
Write-Host "⏳ Aguardando instância ficar online..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

ssh -i "$KEY" -o ConnectTimeout=10 "$USER@$IP" "echo ONLINE"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Instância ainda offline. Reinicie no console AWS primeiro!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Instância online!" -ForegroundColor Green

# 2. Criar pasta e enviar arquivos
Write-Host "📁 Criando pastas na instância..." -ForegroundColor Yellow
ssh -i "$KEY" "$USER@$IP" "mkdir -p /home/ubuntu/orienta-mais/backend/node_modules /home/ubuntu/orienta-mais/frontend /home/ubuntu/orienta-mais/scripts"

# 3. Enviar node_modules do backend (pode demorar)
Write-Host "📦 Enviando node_modules do backend..." -ForegroundColor Yellow
scp -i "$KEY" -r backend/node_modules "$USER@$IP:/home/ubuntu/orienta-mais/backend/"

# 4. Enviar o resto (rápido)
Write-Host "📤 Enviando código fonte..." -ForegroundColor Yellow
scp -i "$KEY" -r backend/src "$USER@$IP:/home/ubuntu/orienta-mais/backend/"
scp -i "$KEY" -r backend/prisma "$USER@$IP:/home/ubuntu/orienta-mais/backend/"
scp -i "$KEY" backend/server.js "$USER@$IP:/home/ubuntu/orienta-mais/backend/"
scp -i "$KEY" backend/package.json "$USER@$IP:/home/ubuntu/orienta-mais/backend/"
scp -i "$KEY" backend/Dockerfile.local "$USER@$IP:/home/ubuntu/orienta-mais/backend/Dockerfile"
scp -i "$KEY" backend/.dockerignore "$USER@$IP:/home/ubuntu/orienta-mais/backend/"

# 5. Enviar frontend (já buildado)
Write-Host "🎨 Enviando frontend buildado..." -ForegroundColor Yellow
scp -i "$KEY" -r dist "$USER@$IP:/home/ubuntu/orienta-mais/"
scp -i "$KEY" frontend/Dockerfile "$USER@$IP:/home/ubuntu/orienta-mais/frontend/"
scp -i "$KEY" frontend/nginx.conf "$USER@$IP:/home/ubuntu/orienta-mais/frontend/"

# 6. Enviar docker-compose e scripts
Write-Host "⚙️ Enviando configs..." -ForegroundColor Yellow
scp -i "$KEY" docker-compose.yml "$USER@$IP:/home/ubuntu/orienta-mais/"
scp -i "$KEY" scripts/setup-env.sh "$USER@$IP:/tmp/setup-env.sh"

# 7. Recriar .env com IP correto
Write-Host "🔧 Configurando .env..." -ForegroundColor Yellow
ssh -i "$KEY" "$USER@$IP" "bash /tmp/setup-env.sh"

# 8. Build e subir
Write-Host "🐳 Buildando containers..." -ForegroundColor Green
ssh -i "$KEY" "$USER@$IP" "cd /home/ubuntu/orienta-mais && docker compose up -d --build"

Write-Host ""
Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host "📍 Frontend: http://$IP" -ForegroundColor Green
Write-Host "📍 API: http://$IP/api/health" -ForegroundColor Green