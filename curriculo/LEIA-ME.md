# O currículo público do site

O `public/cv.pdf` (servido em `www.jonasmessias.dev.br/cv.pdf`) é uma cópia do **CV coringa** do
cockpit de carreira: `~/Documents/Carreira/curriculos/coringa/`. Desde 20/10/2026, quando substituiu o
currículo de nov/2025 que estava no ar com "mais de 3 anos", "7º período", Agio até setembro e
tecnologias sem projeto (Kafka, RabbitMQ, MongoDB, Microsserviços) e sem o oSeuMáximo.

Nada aqui é escrito à mão: sai de `polo/fatos.json` pelo motor do cockpit.

| Arquivo | O quê |
|---|---|
| `conteudo.json` | o `conteudo.json` do coringa, gerado por `engine/gera_curriculos.js` |
| `cv.pdf` | o PDF do coringa; é o que vai para `public/cv.pdf` |
| `cv.docx` | mesma fonte, para quando um portal preferir `.docx` |

## Como atualizar, quando o polo mudar

```bash
cd ~/Documents/Carreira && node engine/gera_curriculos.js coringa
C=~/Documents/Carreira/curriculos/coringa
cp $C/conteudo.json curriculo/conteudo.json
cp $C/Jonas_Messias.pdf curriculo/cv.pdf && cp $C/Jonas_Messias.docx curriculo/cv.docx
cp curriculo/cv.pdf public/cv.pdf
cp ~/Documents/Carreira/curriculos/coringa-en/Jonas_Messias.pdf public/cv-en.pdf   # versão EN do site
```

Depois: branch + PR. O merge na `main` gera a imagem nova (`imagem.yml`), e o servidor a baixa em até
5 minutos (`infra/atualizar.sh`). Por fim, no cockpit, `node engine/check_deriva.js --canal site` tem
que parar de acusar o `/cv.pdf`.

Desde 23/10/2026 o botão **Currículo** da seção Contato aponta para `/cv.pdf` (PT) e `/cv-en.pdf` (EN),
pelo campo `cv` de `content/pt.ts` e `content/en.ts`.
