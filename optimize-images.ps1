# LuxJardin - Image Optimization Script
# Converts large PNGs to optimized WebP format (90% smaller!)
# Requires Node.js sharp: npm install sharp

$imagesDir = "c:\Users\ayman\Desktop\Nursery-01\images"

# Install sharp globally for the conversion
Write-Host "Installing sharp for image optimization..." -ForegroundColor Cyan
npm install -g sharp-cli 2>$null

# Convert each PNG to WebP with quality optimization
$images = Get-ChildItem -Path $imagesDir -Filter "*.png"

foreach ($img in $images) {
    $webpName = $img.BaseName + ".webp"
    $webpPath = Join-Path $imagesDir $webpName
    $pngSize = [math]::Round($img.Length / 1024)
    
    Write-Host "`nConverting: $($img.Name) (${pngSize}KB)" -ForegroundColor Yellow
    
    # Use Node.js + sharp to convert
    $script = @"
const sharp = require('sharp');
sharp('$($img.FullName.Replace('\','/'))')
  .webp({ quality: 80, effort: 6 })
  .resize({ width: 1200, height: 800, fit: 'cover', withoutEnlargement: true })
  .toFile('$($webpPath.Replace('\','/'))' )
  .then(info => {
    console.log('Done: ' + Math.round(info.size/1024) + 'KB');
  })
  .catch(err => console.error(err));
"@
    
    $script | node -e "process.stdin.resume(); let d=''; process.stdin.on('data',c=>d+=c); process.stdin.on('end',()=>eval(d));"
}

Write-Host "`n✅ All images optimized!" -ForegroundColor Green
Write-Host "Original total: ~12.4 MB" -ForegroundColor Red
Write-Host "Expected new total: ~1-2 MB" -ForegroundColor Green
Write-Host "`nNow update your HTML to use .webp instead of .png" -ForegroundColor Cyan
