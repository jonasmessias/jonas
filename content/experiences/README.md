# Guia de Experiências Profissionais

Este guia explica como adicionar e manter experiências profissionais no portfolio com suporte a múltiplos idiomas.

## 📁 Estrutura de Arquivos

Cada experiência deve ter **3 arquivos** (um para cada idioma suportado):

```
content/experiences/
├── nome-experiencia.en.md  (Inglês)
├── nome-experiencia.pt.md  (Português)
└── nome-experiencia.es.md  (Espanhol)
```

### Exemplo Real

```
content/experiences/
├── agio.en.md
├── agio.pt.md
├── agio.es.md
├── freelance.en.md
├── freelance.pt.md
├── freelance.es.md
└── versatec.en.md
    versatec.pt.md
    versatec.es.md
```

## ✍️ Formato do Arquivo

Cada arquivo `.md` deve seguir este formato:

```markdown
---
role: 'Cargo/Função'
company: 'Nome da Empresa'
location: 'Localização (Remoto, Cidade, etc.)'
period: 'Período (ex: Janeiro 2025 - Presente)'
order: 1
technologies: ['React', 'Next.js', 'TypeScript', 'Etc']
---

- Primeira conquista ou responsabilidade importante

- Segunda conquista ou responsabilidade importante

- Terceira conquista ou responsabilidade importante
```

## 🆕 Adicionando Nova Experiência

### Passo 1: Crie os 3 arquivos

Escolha um nome curto e descritivo (ex: `empresa-nome` ou `projeto-nome`):

```bash
# No PowerShell (Windows)
New-Item "content/experiences/nova-empresa.en.md" -ItemType File
New-Item "content/experiences/nova-empresa.pt.md" -ItemType File
New-Item "content/experiences/nova-empresa.es.md" -ItemType File
```

### Passo 2: Preencha o conteúdo em cada idioma

#### Arquivo: `nova-empresa.en.md`

```markdown
---
role: 'Senior Full-stack Developer'
company: 'Company Name'
location: 'Remote'
period: 'January 2026 - Present'
order: 1
technologies: ['React', 'Next.js', 'TypeScript', 'Node.js']
---

- Led development of key features that improved user engagement by 40%

- Implemented CI/CD pipeline reducing deployment time by 60%

- Mentored junior developers and conducted code reviews
```

#### Arquivo: `nova-empresa.pt.md`

```markdown
---
role: 'Desenvolvedor Full-stack Sênior'
company: 'Nome da Empresa'
location: 'Remoto'
period: 'Janeiro 2026 - Presente'
order: 1
technologies: ['React', 'Next.js', 'TypeScript', 'Node.js']
---

- Liderou desenvolvimento de recursos principais que melhoraram engajamento do usuário em 40%

- Implementou pipeline de CI/CD reduzindo tempo de deploy em 60%

- Mentorou desenvolvedores júnior e conduziu revisões de código
```

#### Arquivo: `nova-empresa.es.md`

```markdown
---
role: 'Desarrollador Full-stack Senior'
company: 'Nombre de la Empresa'
location: 'Remoto'
period: 'Enero 2026 - Presente'
order: 1
technologies: ['React', 'Next.js', 'TypeScript', 'Node.js']
---

- Lideró el desarrollo de características clave que mejoraron el compromiso del usuario en 40%

- Implementó pipeline de CI/CD reduciendo el tiempo de despliegue en 60%

- Mentoró a desarrolladores junior y realizó revisiones de código
```

## 📋 Campos Obrigatórios

| Campo          | Descrição                            | Exemplo                   |
| -------------- | ------------------------------------ | ------------------------- |
| `role`         | Cargo/função exercida                | "Full-stack Developer"    |
| `company`      | Nome da empresa                      | "Google"                  |
| `location`     | Local de trabalho                    | "Remote", "São Paulo, SP" |
| `period`       | Período de atuação                   | "Jan 2025 - Present"      |
| `order`        | Ordem de exibição (menor = primeiro) | 1, 2, 3...                |
| `technologies` | Array de tecnologias usadas          | ["React", "Node.js"]      |

## 🔢 Ordenação (Campo `order`)

- **order: 1** = Experiência mais recente (aparece primeiro)
- **order: 2** = Segunda experiência mais recente
- **order: 3** = Terceira, e assim por diante

💡 **Dica**: Use números com espaçamento (1, 10, 20, 30) para facilitar inserções futuras.

## 📝 Descrições (Bullet Points)

- Use **hífen + espaço** (`- `) no início de cada linha
- Cada linha = uma conquista, responsabilidade ou resultado
- Seja específico e inclua métricas quando possível
- 3-5 bullet points por experiência é o ideal

### ✅ Bom

```markdown
- Developed new authentication system serving 50,000+ daily users
- Reduced API response time by 40% through optimization
- Implemented automated testing suite with 90% code coverage
```

### ❌ Evite

```markdown
- Worked with React
- Made things better
- Did development tasks
```

## 🌍 Tradução de Períodos

| Inglês (en) | Português (pt) | Espanhol (es) |
| ----------- | -------------- | ------------- |
| January     | Janeiro        | Enero         |
| February    | Fevereiro      | Febrero       |
| March       | Março          | Marzo         |
| April       | Abril          | Abril         |
| May         | Maio           | Mayo          |
| June        | Junho          | Junio         |
| July        | Julho          | Julio         |
| August      | Agosto         | Agosto        |
| September   | Setembro       | Septiembre    |
| October     | Outubro        | Octubre       |
| November    | Novembro       | Noviembre     |
| December    | Dezembro       | Diciembre     |
| Present     | Presente       | Presente      |

## 🔍 Verificação

Após adicionar uma nova experiência:

1. **Verifique os 3 arquivos existem**:

   ```bash
   ls content/experiences/nome-empresa.*
   ```

2. **Confirme o formato**:
   - Metadados entre `---`
   - Bullet points com `-`
   - Todos os campos obrigatórios preenchidos

3. **Teste localmente**:

   ```bash
   npm run dev
   ```

4. **Acesse cada idioma**:
   - `/en` - Versão em inglês
   - `/pt` - Versão em português
   - `/es` - Versão em espanhol

## 🔄 Atualizando Experiência Existente

1. Identifique os 3 arquivos da experiência
2. Edite cada arquivo mantendo a estrutura
3. Mantenha o valor de `order` consistente entre os 3 arquivos
4. Salve e teste

## 🗑️ Removendo Experiência

Para remover uma experiência, delete os 3 arquivos:

```bash
Remove-Item "content/experiences/nome-empresa.en.md"
Remove-Item "content/experiences/nome-empresa.pt.md"
Remove-Item "content/experiences/nome-empresa.es.md"
```

## 🚨 Troubleshooting

### Experiência não aparece no site

- ✅ Verifique se os 3 arquivos existem
- ✅ Confirme que os arquivos terminam com `.md`
- ✅ Verifique se os metadados estão entre `---`
- ✅ Reinicie o servidor de desenvolvimento

### Experiência aparece duplicada

- ✅ Verifique se não há arquivos sem sufixo de idioma (ex: `agio.md`)
- ✅ Confirme que todos os arquivos têm `.en.md`, `.pt.md` ou `.es.md`

### Ordem está errada

- ✅ Verifique o campo `order` em todos os 3 arquivos
- ✅ Valores menores aparecem primeiro
- ✅ Use números únicos (sem repetir)

## 💡 Dicas Profissionais

1. **Mantenha consistência**: Use o mesmo nome base para os 3 arquivos
2. **Seja específico**: Inclua números e métricas nas descrições
3. **Revise traduções**: Certifique-se de que as traduções fazem sentido
4. **Atualize regularmente**: Mantenha experiências atuais no topo
5. **Use verbos de ação**: "Implementou", "Liderou", "Desenvolveu"

## 📞 Suporte

Se tiver dúvidas, consulte os exemplos existentes em `content/experiences/` ou revise o código em `lib/markdown.ts`.
