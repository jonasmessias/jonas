#!/usr/bin/env bash
# Baixa a imagem mais nova do site e reinicia só o que mudou.
# Roda a cada 5 minutos pelo timer do systemd (jonas-atualizar.timer).
set -euo pipefail
cd /opt/jonas
docker compose pull --quiet
docker compose up -d --remove-orphans
docker image prune -f >/dev/null
