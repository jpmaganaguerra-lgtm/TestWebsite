// Uso: node blog/build-site.js
// Lee blog/posts.json y genera blog/index.html, blog/posts/<slug>.html y sitemap.xml.
// Campos de cada post: slug, title, description, date (YYYY-MM-DD), updated (opcional),
// image (ruta, ej. images/blog/slug.jpg), category, body (HTML con h2/p/ul).
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const DOMAIN = (fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/rel="canonical" href="([^"]+?)\/"/) || [])[1];
if (!DOMAIN) throw new Error('No se encontró el canonical en index.html');
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf8')).sort((a, b) => b.date.localeCompare(a.date));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const head = (title, desc, url, extra, up) => `<!doctype html>
<html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}"><link rel="icon" href="${up}images/brand/favicon.png">
<meta property="og:type" content="article"><meta property="og:site_name" content="AmayA"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:locale" content="es_MX">
<meta name="twitter:card" content="summary_large_image">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${up}css/style.css">${extra}</head><body>`;
const top = up => `<header class="top"><a class="brand" href="${up}"><img src="${up}images/brand/logo-carbon.png" alt="" width="34" height="45"><span>AmayA</span></a><nav aria-label="Principal"><ul><li><a href="${up}#habitaciones">Habitaciones</a></li><li><a href="${up}#valladolid">Valladolid</a></li><li><a href="${up}blog/">Blog</a></li><li><a href="${up}#reservar">Reservar</a></li></ul></nav></header>`;
const foot = up => `<footer><b>AmayA</b><span>Valladolid, Yucatán</span></footer></body></html>`;
if (posts.length) {
  fs.mkdirSync(path.join(__dirname, 'posts'), { recursive: true });
  posts.forEach(p => {
    const url = `${DOMAIN}/blog/posts/${p.slug}.html`;
    const ld = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description, image: `${DOMAIN}/${p.image}`, datePublished: p.date, dateModified: p.updated || p.date,
      author: { '@type': 'Organization', name: 'AmayA', url: DOMAIN + '/' }, publisher: { '@type': 'Organization', name: 'AmayA', url: DOMAIN + '/', logo: { '@type': 'ImageObject', url: `${DOMAIN}/images/brand/logo-carbon.png` } }, mainEntityOfPage: { '@type': 'WebPage', '@id': url } };
    const bc = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: DOMAIN + '/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: DOMAIN + '/blog/' }, { '@type': 'ListItem', position: 3, name: p.title, item: url }] };
    const html = head(`${p.title} · AmayA`, p.description, url, `<meta property="og:image" content="${DOMAIN}/${p.image}"><script type="application/ld+json">${JSON.stringify(ld)}</script><script type="application/ld+json">${JSON.stringify(bc)}</script>`, '../../') + top('../../') +
      `<p class="crumbs"><a href="../../">Inicio</a> / <a href="../">Blog</a> / ${esc(p.title)}</p><article class="post"><h1>${esc(p.title)}</h1><p><time datetime="${p.date}">${p.date}</time> · ${esc(p.category || 'Guías')}</p>${p.body}<p><a class="btn" href="../../#reservar">Reservar estancia</a></p><p><a class="link" href="../">Volver al blog</a></p></article>` + foot();
    fs.writeFileSync(path.join(__dirname, 'posts', p.slug + '.html'), html);
  });
  const list = posts.map(p => `<li><a class="link" href="posts/${p.slug}.html">${esc(p.title)}</a><br><small>${p.date} · ${esc(p.category || 'Guías')}</small><p>${esc(p.description)}</p></li>`).join('');
  fs.writeFileSync(path.join(__dirname, 'index.html'), head('Blog · AmayA, hotel boutique en Valladolid', 'Guías de Valladolid, Yucatán, escritas desde Amaya.', DOMAIN + '/blog/', '', '../') + top('../') + `<main class="post"><h1>Blog</h1><ul style="list-style:none;padding:0">${list}</ul></main>` + foot());
}
const today = new Date().toISOString().slice(0, 10);
const urls = [{ loc: DOMAIN + '/', lastmod: today, freq: 'monthly', pr: '1.0' }];
if (posts.length) { urls.push({ loc: DOMAIN + '/blog/', lastmod: posts[0].updated || posts[0].date, freq: 'weekly', pr: '0.8' }); posts.forEach(p => urls.push({ loc: `${DOMAIN}/blog/posts/${p.slug}.html`, lastmod: p.updated || p.date, freq: 'monthly', pr: '0.7' })); }
fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.pr}</priority></url>`).join('\n')}\n</urlset>\n`);
console.log(`Listo: ${posts.length} artículos, ${urls.length} URLs en sitemap.xml`);
