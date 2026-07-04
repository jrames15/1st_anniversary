import re, ssl, urllib.request
urls = [
    'https://html.duckduckgo.com/html?q=wave+to+earth+tsunami+spotify',
    'https://html.duckduckgo.com/html?q=wave+to+earth+dynamite+spotify',
    'https://html.duckduckgo.com/html?q=wave+to+earth+tsunami+spotify+track',
    'https://html.duckduckgo.com/html?q=wave+to+earth+dynamite+spotify+track',
    'https://html.duckduckgo.com/html?q=wave+to+earth+tsunami+spotify+track+id',
    'https://html.duckduckgo.com/html?q=wave+to+earth+dynamite+spotify+track+id',
    'https://html.duckduckgo.com/html?q=wave+to+earth+tsunami+song.link',
    'https://html.duckduckgo.com/html?q=wave+to+earth+dynamite+song.link'
]
headers = {'User-Agent': 'Mozilla/5.0'}
ctx = ssl.create_default_context()
for url in urls:
    print('---', url)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=30) as r:
            data = r.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print('ERROR', e)
        continue
    ids = set(re.findall(r'open\.spotify\.com/(?:track|album|artist|playlist)/([A-Za-z0-9]{22})', data))
    ids |= set(re.findall(r'https://spoti\.fi/[A-Za-z0-9]+', data))
    names = set(re.findall(r'(?:>\s*|\b)(tsunami|dynamite|evening glow|evening\s+glow)(?:\s*<|\b)', data, flags=re.I))
    print('names', names)
    print('ids', ids)
    print('length', len(data))
    print()
