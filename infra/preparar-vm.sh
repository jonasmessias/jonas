#!/usr/bin/env bash
# Prepara uma VM Ubuntu (24.04) para rodar o site. Rodar uma vez, como root:
#   sudo TUNNEL_TOKEN=... bash preparar-vm.sh
set -euo pipefail
: "${TUNNEL_TOKEN:?defina TUNNEL_TOKEN (Cloudflare → Zero Trust → Networks → Tunnels)}"

echo "== pacotes e atualizações automáticas de segurança"
apt-get update -q
apt-get install -y -q ca-certificates curl ufw fail2ban unattended-upgrades
dpkg-reconfigure -f noninteractive unattended-upgrades

echo "== Docker"
if ! command -v docker >/dev/null; then
  curl -fsSL https://get.docker.com | sh
fi

echo "== firewall: nada entra, exceto SSH (fechado no fim do guia, quando o SSH passar pelo túnel)"
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw --force enable
# As imagens Ubuntu da Oracle trazem regras próprias no iptables; o ufw passa a ser a fonte delas.

echo "== SSH só com chave"
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl reload ssh || systemctl reload sshd

echo "== fail2ban (bloqueia quem erra o login do SSH)"
systemctl enable --now fail2ban

echo "== o site"
mkdir -p /opt/jonas
cp compose.yaml atualizar.sh /opt/jonas/
chmod +x /opt/jonas/atualizar.sh
printf 'TUNNEL_TOKEN=%s\n' "$TUNNEL_TOKEN" > /opt/jonas/.env
chmod 600 /opt/jonas/.env
cp jonas-atualizar.service jonas-atualizar.timer /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now jonas-atualizar.timer
/opt/jonas/atualizar.sh

echo "== pronto. Containers:"
docker compose -f /opt/jonas/compose.yaml ps
