# Infra: como o site chega até o visitante

```
git push → GitHub confere e monta a imagem → VM busca a imagem → túnel da Cloudflare → você
```

- O **GitHub Actions** confere o código (`ci.yml`) e, na `main`, monta uma imagem Docker com o
  nginx e o site, publicada em `ghcr.io/jonasmessias/jonas` (`imagem.yml`).
- A **VM** (Oracle Cloud, Ubuntu) busca a imagem nova a cada 5 minutos (`atualizar.sh`). Ninguém
  entra nela para fazer deploy.
- O **Cloudflare Tunnel** liga a VM à Cloudflare de dentro para fora. Por isso o **firewall bloqueia
  toda entrada** e o site continua no ar. HTTPS, cache e proteção ficam na Cloudflare.

## Arquivos

| arquivo | o que faz |
|---|---|
| `../Dockerfile` | build do site com Node, depois só o resultado num nginx que não roda como root |
| `nginx.conf` | idioma pela raiz (`/pt/` ou `/en/`), `/es` → `/pt`, cabeçalhos de segurança, gzip, cache, limite por IP |
| `compose.yaml` | o site e o túnel, sem nenhuma porta publicada |
| `atualizar.sh` + `jonas-atualizar.*` | busca a imagem nova a cada 5 minutos |
| `preparar-vm.sh` | prepara a VM uma vez: firewall, SSH só com chave, fail2ban, atualizações automáticas, Docker, o site |

## Passo a passo (uma vez)

### 1. Cloudflare e o domínio
1. Crie uma conta em cloudflare.com e adicione o domínio `jonasmessias.dev.br` (plano Free).
2. A Cloudflare mostra dois nameservers. No **Registro.br**, troque os nameservers do domínio (hoje
   `ns1/ns2.vercel-dns.com`) pelos da Cloudflare. Pode levar algumas horas.
3. Em **Zero Trust → Networks → Tunnels**, crie um túnel (tipo Cloudflared) e copie o **token**.
4. No túnel, em **Public Hostname**, adicione:
   - `www.jonasmessias.dev.br` → `HTTP` → `site:8080`
   - `jonasmessias.dev.br` → `HTTP` → `site:8080` (ou uma regra de redirecionamento para o `www`)

### 2. A VM na Oracle Cloud
1. Crie uma conta em cloud.oracle.com (o plano Always Free pede cartão só para verificação).
2. Crie uma instância **Ubuntu 24.04**, formato **Ampere A1** (grátis), com a sua chave SSH pública.
3. Na **Security List** da rede, deixe entrar só a porta 22 (SSH), para a configuração. Ela fecha no
   passo 4.

### 3. Preparar a VM
Da sua máquina:
```bash
scp infra/compose.yaml infra/atualizar.sh infra/preparar-vm.sh infra/jonas-atualizar.* ubuntu@IP_DA_VM:~
ssh ubuntu@IP_DA_VM
sudo TUNNEL_TOKEN=cole-o-token-aqui bash preparar-vm.sh
```
O site já responde pelo domínio quando o túnel conectar.

A imagem precisa estar **pública** para a VM baixar sem senha: GitHub → seu perfil → Packages →
`jonas` → Package settings → Change visibility → Public.

### 4. Fechar a última porta (SSH pelo túnel)
1. No túnel, adicione `ssh.jonasmessias.dev.br` → `SSH` → `localhost:22`, e uma regra de acesso em
   **Zero Trust → Access** que só libere o seu e-mail.
2. Na sua máquina, instale o `cloudflared` e entre com
   `ssh -o ProxyCommand="cloudflared access ssh --hostname %h" ubuntu@ssh.jonasmessias.dev.br`.
3. Funcionou? Na VM rode `sudo ufw delete allow OpenSSH` e, na Oracle, remova a regra da porta 22.

Daí em diante a VM não tem **nenhuma** porta aberta para a internet.

### 5. Desligar a Vercel
Com o site respondendo pelo túnel, remova o domínio do projeto na Vercel (ou o projeto inteiro).
