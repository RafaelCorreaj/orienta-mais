FROM node:20-alpine

# Instalar OpenSSL (necessário para Prisma)
RUN apk add --no-cache openssl

WORKDIR /app

# Copiar apenas package.json e prisma schema primeiro
COPY backend/package.json ./
COPY backend/prisma ./prisma

# Instalar dependências do ZERO (compatible com Linux)
RUN npm install --omit=dev

# Gerar Prisma Client
RUN npx prisma generate

# Copiar código fonte
COPY backend/src ./src
COPY backend/server.js .

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm start"]
