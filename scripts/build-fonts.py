"""Build local WOFF2 subsets. Requires fonttools and brotli; see README.md."""
from html.parser import HTMLParser
from pathlib import Path
from tempfile import gettempdir
from urllib.request import urlretrieve
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/fonts'
CACHE = Path(gettempdir()) / 'particleworld-font-sources'
CACHE.mkdir(exist_ok=True)

class PageText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
    def handle_data(self, data):
        self.parts.append(data)
    def handle_starttag(self, tag, attrs):
        self.parts.extend(value for key, value in attrs if value and (key.startswith('data-') or key in ('content', 'aria-label')))

page = PageText()
for html_file in [ROOT / 'index.html', *sorted((ROOT / 'updates').rglob('*.html'))]:
    page.feed(html_file.read_text())
text = ''.join(sorted(set(''.join(page.parts) + ''.join(chr(c) for c in range(32,127)) + '©·—’–')))
fonts = [
    ('noto-serif-sc', 'PW Noto Serif SC', 'notoserifsc/NotoSerifSC%5Bwght%5D.ttf', {'wght': 400}),
    ('source-serif', 'PW Source Serif', 'sourceserif4/SourceSerif4%5Bopsz,wght%5D.ttf', {'wght': 400}),
    ('ibm-plex-mono', 'PW IBM Plex Mono', 'ibmplexmono/IBMPlexMono-Regular.ttf', {}),
]
css = ['/* Locally hosted subsets. Regenerate with scripts/build-fonts.py after copy changes. */']
for slug, family, remote, axes in fonts:
    source = CACHE / (slug + '.ttf')
    if not source.exists():
        urlretrieve('https://raw.githubusercontent.com/google/fonts/main/ofl/' + remote, source)
    font = TTFont(source)
    options = subset.Options()
    options.flavor = 'woff2'
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(font)
    if axes:
        font = instantiateVariableFont(font, axes, inplace=True)
    # Modified fonts receive new names in accordance with OFL reserved-name rules.
    for record in font['name'].names:
        if record.nameID in (1, 4, 6, 16):
            name = family.replace(' ', '') if record.nameID == 6 else family
            record.string = name.encode(record.getEncoding())
    font.flavor = 'woff2'
    font.save(OUT / (slug + '.woff2'))
    css.append('@font-face {\n  font-family: "%s";\n  src: url("./%s.woff2") format("woff2");\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n}' % (family, slug))
(OUT / 'fonts.css').write_text('\n\n'.join(css) + '\n')
print('Built WOFF2 subsets:', ', '.join(f'{p.name}: {p.stat().st_size:,} bytes' for p in OUT.glob('*.woff2')))
