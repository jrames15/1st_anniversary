[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
function FetchText($url) {
  try {
    $r = Invoke-WebRequest -Uri $url -Headers @{ 'User-Agent' = 'Mozilla/5.0' } -UseBasicParsing
    return $r.Content
  } catch {
    Write-Host "ERROR fetching $url: $($_.Exception.Message)"
    return ''
  }
}
$urls = @(
  'https://open.spotify.com/artist/5069JTmv5ZDyPeZaCCXiCg',
  'https://html.duckduckgo.com/html?q=wave+to+earth+tsunami+spotify+track+id',
  'https://html.duckduckgo.com/html?q=wave+to+earth+dynamite+spotify+track+id',
  'https://html.duckduckgo.com/html?q=wave+to+earth+evening+glow+spotify+track+id'
)
foreach ($url in $urls) {
  Write-Host '---' $url
  $text = FetchText $url
  if ($text.Length -gt 0) {
    $pattern = '(?:open\.spotify\.com/(?:track|album|artist|playlist)/[A-Za-z0-9]+|track/[A-Za-z0-9]{22})'
    $matches = [regex]::Matches($text, $pattern)
    $ids = @{}
    foreach ($m in $matches) {
      $value = $m.Value
      if ($value -match 'track/([A-Za-z0-9]{22})') { $ids[$matches.IndexOf($m)] = $matches.IndexOf($m) }
      Write-Host $value
    }
    Write-Host 'Matches:' $matches.Count
  }
}
