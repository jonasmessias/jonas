# O currículo público do site

**Mora aqui desde 18/08/2026, por decisão do Jonas.** Antes vivia em `carreira/publicar/site-cv/`,
que é a fila de Tipo P do cockpit de carreira. O currículo do site é assunto do site.

**Ainda NÃO publicado.** O `public/cv.pdf` que está no ar continua sendo o currículo antigo, com os
erros listados em `carreira/canais/site.md`.

## Como promover (é Tipo P — precisa do OK dele, e quem roda é ele)

```bash
cp curriculo/cv.pdf public/cv.pdf
```

Depois: branch + PR (push na `master` dispara deploy na Vercel), e por fim
`node engine/check_deriva.js` lá no `carreira` tem que parar de acusar o `/cv.pdf`.

## Como regerar, se o polo mudar

Nada aqui é escrito à mão — sai de `carreira/polo/fatos.json`:

```bash
cd ~/Documents/carreira/engine
node derive.js --eixo engineer --tom junior --titulo "Desenvolvedor Full-Stack | React, TypeScript e Node.js" \
               --saida ../portfolio-build/jonas/curriculo/conteudo.json
# ajustar o resumo, e então:
node check_afirmacao.js ../portfolio-build/jonas/curriculo/conteudo.json
node build_cv.js     ../portfolio-build/jonas/curriculo/conteudo.json ../portfolio-build/jonas/curriculo/cv.docx
node build_cv_pdf.js ../portfolio-build/jonas/curriculo/conteudo.json ../portfolio-build/jonas/curriculo/cv.pdf
```

---

Este é o substituto do `jonasdev.vercel.app/cv.pdf`. Enquanto ele não for aprovado e trocado, o que
está no ar é o currículo antigo, com os erros listados em `canais/site.md`.

| Arquivo | O quê |
|---|---|
| `conteudo.json` | derivado de `polo/fatos.json` pelo `derive.js`, com o resumo ajustado à mão |
| `cv.pdf` | o que substitui `public/cv.pdf` no repo `jonasmessias/jonas` |
| `cv.docx` | mesma fonte, para quando um portal preferir `.docx` |

## Por que estas escolhas

- **Eixo `engineer`.** É o currículo sem vaga: precisa representar as três frentes, e o LinkedIn já o
  apresenta como Desenvolvedor Full-Stack.
- **Tom júnior.** É o padrão da `estrategia.md` — o alvo é entrar, e o risco declarado é parecer bom
  demais na triagem de entrada.
- **Título sem senioridade.** `Desenvolvedor Full-Stack | React, TypeScript e Node.js`.

## O que ficou de fora, de propósito

| Fora | Por quê |
|---|---|
| Kafka, RabbitMQ, MongoDB, SQL Server, Microsserviços, Zend, Spring Cloud, Flyway | noção teórica sem projeto — ele confirmou em 12/08 que não tem como demonstrar |
| Web3 / NFT | conhecimento de apoio; só entra quando a vaga citar. No CV antigo era **especialidade** |
| Core Web Vitals no bloco do oSeuMáximo | sem `web-vitals` instalado em nenhum dos 3 fronts |
| "691 testes" | o real é **314 arquivos** ou **2.778 casos** |
| "code splitting nas 3 aplicações" | o `osm-app` não tem — o certo é 2 das 3 |

## Gates

```
check_afirmacao.js  →  exit 0, toda afirmação com lastro no polo
verify_cv.js        →  exit 0, passa sem avisos (2 páginas, 65% dos bullets com número)
```

## Para publicar (quando ele aprovar)

O repo do site mora em `portfolio-build/jonas/` desde 13/08/2026 (ADR 0004), então os dois primeiros passos são locais:

```bash
cp publicar/site-cv/cv.pdf portfolio-build/jonas/public/cv.pdf
git -C portfolio-build/jonas add public/cv.pdf && git -C portfolio-build/jonas commit -m "chore: atualiza o cv.pdf público"
```

3. **push** — é o passo irreversível: dispara o deploy na Vercel. O guard barra, e é **ele** quem roda.
4. `node engine/check_deriva.js --canal site` — tem que parar de acusar o `/cv.pdf`
5. mover esta pasta para `arquivo/publicado-<data>_site-cv/` e datar a troca em `canais/site.md`
