# Script para adicionar nova experiência profissional
# Usage: .\scripts\new-experience.ps1 -Name "nome-empresa"

param(
    [Parameter(Mandatory=$true)]
    [string]$Name
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$experiencesPath = Join-Path $projectRoot "content\experiences"

# Validate name
if ($Name -match '[^a-z0-9-]') {
    Write-Host "❌ Erro: Use apenas letras minúsculas, números e hífens no nome" -ForegroundColor Red
    Write-Host "Exemplo: new-experience -Name 'google-brasil'" -ForegroundColor Yellow
    exit 1
}

# Create the three locale files
$locales = @("en", "pt", "es")
$created = @()

foreach ($locale in $locales) {
    $templateFile = Join-Path $experiencesPath "_TEMPLATE.$locale.md"
    $targetFile = Join-Path $experiencesPath "$Name.$locale.md"
    
    if (Test-Path $targetFile) {
        Write-Host "⚠️  Arquivo já existe: $Name.$locale.md" -ForegroundColor Yellow
        continue
    }
    
    if (Test-Path $templateFile) {
        Copy-Item $templateFile $targetFile
        $created += "$Name.$locale.md"
        Write-Host "✅ Criado: $Name.$locale.md" -ForegroundColor Green
    } else {
        Write-Host "❌ Template não encontrado: _TEMPLATE.$locale.md" -ForegroundColor Red
    }
}

if ($created.Count -gt 0) {
    Write-Host ""
    Write-Host "🎉 Arquivos criados com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos passos:" -ForegroundColor Cyan
    Write-Host "1. Edite os 3 arquivos criados em: content\experiences\" -ForegroundColor White
    Write-Host "2. Preencha os campos: role, company, location, period" -ForegroundColor White
    Write-Host "3. Ajuste o campo 'order' (menor número = mais recente)" -ForegroundColor White
    Write-Host "4. Adicione as tecnologias usadas no array 'technologies'" -ForegroundColor White
    Write-Host "5. Escreva 3-5 bullet points descrevendo suas conquistas" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 Consulte: content\experiences\README.md para mais detalhes" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "⚠️  Nenhum arquivo foi criado. Verifique se já existem." -ForegroundColor Yellow
}
