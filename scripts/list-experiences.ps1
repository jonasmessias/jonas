# Script para listar experiências profissionais existentes
# Usage: .\scripts\list-experiences.ps1

$projectRoot = Split-Path -Parent $PSScriptRoot
$experiencesPath = Join-Path $projectRoot "content\experiences"

Write-Host ""
Write-Host "📋 Experiências Profissionais" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

# Get all markdown files
$files = Get-ChildItem -Path $experiencesPath -Filter "*.md" | 
    Where-Object { !$_.Name.StartsWith("_") -and !$_.Name.StartsWith("README") } |
    Sort-Object Name

# Group by base name
$grouped = @{}
foreach ($file in $files) {
    $baseName = $file.Name -replace '\.(en|pt|es)\.md$', ''
    if (-not $grouped.ContainsKey($baseName)) {
        $grouped[$baseName] = @()
    }
    $grouped[$baseName] += $file
}

# Display grouped experiences
$count = 0
foreach ($baseName in ($grouped.Keys | Sort-Object)) {
    $count++
    $group = $grouped[$baseName]
    
    Write-Host "$count. " -NoNewline -ForegroundColor Yellow
    Write-Host "$baseName" -ForegroundColor White
    
    foreach ($file in ($group | Sort-Object Name)) {
        $locale = if ($file.Name -match '\.(en|pt|es)\.md$') { $matches[1] } else { "??" }
        $localeColor = switch ($locale) {
            "en" { "Blue" }
            "pt" { "Green" }
            "es" { "Magenta" }
            default { "Gray" }
        }
        
        # Read first few lines to get metadata
        $content = Get-Content $file.FullName -TotalCount 15 | Out-String
        if ($content -match 'role:\s*\"([^\"]+)\"') {
            $role = $matches[1]
        } else { $role = "N/A" }
        
        if ($content -match 'order:\s*(\d+)') {
            $order = $matches[1]
        } else { $order = "?" }
        
        Write-Host "   [$locale] " -NoNewline -ForegroundColor $localeColor
        Write-Host "$role " -NoNewline -ForegroundColor Gray
        Write-Host "(order: $order)" -ForegroundColor DarkGray
    }
    Write-Host ""
}

if ($count -eq 0) {
    Write-Host "Nenhuma experiência encontrada." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 Para criar uma nova experiência, use:" -ForegroundColor Cyan
    Write-Host "   .\scripts\new-experience.ps1 -Name 'nome-empresa'" -ForegroundColor White
} else {
    Write-Host "Total: $count experiência(s)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "💡 Dicas:" -ForegroundColor Cyan
    Write-Host "   • Cada experiência deve ter 3 arquivos (.en, .pt, .es)" -ForegroundColor Gray
    Write-Host "   • Ordem menor = mais recente (aparece primeiro)" -ForegroundColor Gray
    Write-Host "   • Consulte: content\experiences\README.md" -ForegroundColor Gray
}

Write-Host ""
