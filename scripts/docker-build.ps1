# docker-build.ps1
Write-Host "🐳 OrientA+ - Docker Build Script" -ForegroundColor Green

# Parar containers existentes
Write-Host "🛑 Parando containers existentes..." -ForegroundColor Yellow
docker-compose down

# Build das imagens
Write-Host "🔨 Buildando imagens..." -ForegroundColor Yellow
docker-compose build --no-cache

# Subir containers
Write-Host "🚀 Subindo containers..." -ForegroundColor Green
docker-compose up -d

# Aguardar backend
Write-Host "⏳ Aguardando backend..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Rodar migrações
Write-Host "📦 Rodando migrações..." -ForegroundColor Yellow
docker exec orienta-backend npx prisma migrate deploy
docker exec orienta-backend npx prisma db seed

Write-Host "✅ OrientA+ está rodando!" -ForegroundColor Green
Write-Host "📍 Frontend: http://localhost" -ForegroundColor Green
Write-Host "📍 Backend API: http://localhost:3001" -ForegroundColor Green