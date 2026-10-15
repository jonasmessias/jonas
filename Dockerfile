# Imagem do site: o Next gera o HTML estático e o nginx serve.
# Estágio 1: build. Estágio 2: só o resultado (out/) e o nginx, sem Node.

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# nginx que não roda como root e escuta na porta 8080.
FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 8080
