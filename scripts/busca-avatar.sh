#!/usr/bin/env bash
# Baixa a foto do perfil do GitHub para public/avatar.jpg. Rodar da raiz do repo.
# A foto é commitada: o build não depende de rede para ter imagem.
set -euo pipefail

curl -fsSL "https://avatars.githubusercontent.com/jonasmessias?s=800" -o public/avatar.jpg
file public/avatar.jpg
