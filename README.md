# Amaya · Sitio web

Sitio estático (HTML, CSS y JS). Sin build obligatorio. Pensado para GitHub + Netlify.

## Estructura
```
index.html          Página principal
css/style.css       Estilos
js/script.js        Calendario, huéspedes, eventos y configuración del motor
images/             Fotos y marca (ver IMAGE-MAP.md)
blog/               posts.json + build-site.js (genera artículos y sitemap)
robots.txt          Permite buscadores y motores de IA
sitemap.xml         Mapa del sitio
llms.txt            Resumen del sitio para motores de IA
netlify.toml        Caché y cabeceras
scripts/set-domain.sh
SEO-GEO-ESTRATEGIA.md
IMAGE-MAP.md
```

## Antes de publicar (en este orden)
1. **Dominio:** `sh scripts/set-domain.sh https://www.tudominio.com`
2. **Fotos:** sustituir según `IMAGE-MAP.md`.
3. **Motor de reservas:** en `js/script.js`, bloque `BOOKING`: pegar `url`, ajustar nombres de `params`, `dateFormat` y `extra` (por ejemplo el ID del hotel).
4. **Google Tag Manager:** en `index.html`, descomentar los dos bloques GTM y poner el ID real.
5. **Datos reales:** reemplazar los textos entre corchetes `[por confirmar]` (habitaciones, Valladolid, contacto).
6. **Schema:** completar los campos pendientes de la sección 3 de `SEO-GEO-ESTRATEGIA.md`.
7. **Netlify:** conectar el repositorio. Build command vacío, publish directory `/`.
8. **Search Console:** verificar el dominio y enviar `sitemap.xml`.

## Blog
Agrega artículos en `blog/posts.json` y ejecuta `node blog/build-site.js`. Regenera el blog y el `sitemap.xml`. Después añade un enlace al blog en el pie de `index.html`.

## Eventos de analítica (dataLayer)
`reserve_click`, `date_select`, `availability_check_start`, `booking_engine_exit`. La reserva confirmada solo se registra cuando el motor la confirme de verdad.
