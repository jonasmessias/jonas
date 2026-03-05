# Quick Reference - Experiências Profissionais

## 🚀 Adicionar Nova Experiência

### Opção 1: Usar Script (Recomendado)

```powershell
.\scripts\new-experience.ps1 -Name "nome-empresa"
```

### Opção 2: Manual

1. Copie os templates:

   ```powershell
   Copy-Item "content\experiences\_TEMPLATE.en.md" "content\experiences\nome-empresa.en.md"
   Copy-Item "content\experiences\_TEMPLATE.pt.md" "content\experiences\nome-empresa.pt.md"
   Copy-Item "content\experiences\_TEMPLATE.es.md" "content\experiences\nome-empresa.es.md"
   ```

2. Edite os 3 arquivos criados

## 📋 Listar Experiências Existentes

```powershell
.\scripts\list-experiences.ps1
```

Ou manualmente:

```powershell
Get-ChildItem "content\experiences\*.md" | Where-Object { !$_.Name.StartsWith("_") -and !$_.Name.StartsWith("README") }
```

## 📝 Estrutura do Arquivo

```markdown
---
role: 'Cargo'
company: 'Empresa'
location: 'Local'
period: 'Período'
order: 1
technologies: ['Tech1', 'Tech2']
---

- Conquista 1
- Conquista 2
- Conquista 3
```

## 🔢 Ordenação

- `order: 1` = Mais recente (primeiro)
- `order: 2` = Segunda mais recente
- `order: 3` = Terceira...

## 🌍 3 Arquivos Obrigatórios

Sempre crie os 3 arquivos:

- `nome.en.md` (Inglês)
- `nome.pt.md` (Português)
- `nome.es.md` (Espanhol)

## ✅ Checklist

- [ ] Criados 3 arquivos (.en, .pt, .es)
- [ ] Mesmo nome base nos 3 arquivos
- [ ] Metadados entre `---`
- [ ] Campo `order` igual nos 3 arquivos
- [ ] 3-5 bullet points por arquivo
- [ ] Tecnologias listadas no array

## 🔍 Teste

```powershell
npm run dev
```

Acesse:

- http://localhost:3000/en
- http://localhost:3000/pt
- http://localhost:3000/es

## 📖 Documentação Completa

Ver: `content/experiences/README.md`
