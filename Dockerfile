# Imagem do site: o Next gera o HTML estático e o nginx serve.
# Estágio 1: build. Estágio 2: só o resultado (out/) e o nginx, sem Node.
#
# A imagem sai para amd64 e arm64 (a VM da Oracle é ARM). O build roda uma vez só,
# na arquitetura da máquina que monta ($BUILDPLATFORM): o HTML é o mesmo nas duas;
# só o estágio do nginx é montado para cada processador.

FROM --platform=$BUILDPLATFORM node:22-alpine AS build
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
