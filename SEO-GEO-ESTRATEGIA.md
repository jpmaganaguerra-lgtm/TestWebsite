# Amaya · Estrategia de posicionamiento SEO + GEO

Estado: la base técnica ya está en el sitio. Los datos de negocio (teléfono, habitaciones, coordenadas, tarifas, reseñas) no se han inventado; están pendientes y se listan aquí. Las palabras clave son hipótesis para validar en Search Console y Google Keyword Planner; no hay datos de volumen en este documento.

## 1. Objetivo
**Meta de negocio:** reservas directas. **Indicador principal:** reservas directas por mes, con búsquedas de marca y clics orgánicos como indicadores adelantados.
Dos frentes: (a) aparecer en Google cuando alguien busca dónde dormir en Valladolid, (b) ser la respuesta que citan ChatGPT, Perplexity y Google AI cuando preguntan por hoteles boutique en Valladolid.

## 2. Qué ya está hecho en el sitio
| Elemento | Estado |
|---|---|
| Title (45 caracteres) y meta description (cerca de 150) con CTA | Hecho |
| H1 único e invisible con keyword (“Amaya — Hotel boutique en Valladolid, Yucatán”); el titular visual es un párrafo | Hecho |
| Canonical, Open Graph, Twitter Card, `lang="es-MX"` | Hecho (falta dominio real) |
| JSON-LD: `Hotel`, `WebSite`, `FAQPage` | Hecho con datos mínimos verdaderos |
| `robots.txt` con permiso explícito a GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended | Hecho |
| `sitemap.xml` (se regenera con el blog) | Hecho |
| `llms.txt` | Hecho (completar datos) |
| Imágenes con `alt`, `width`, `height`, `loading="lazy"` | Hecho |
| Cabeceras de caché y seguridad (Netlify) | Hecho |
| Eventos de analítica | Hecho |

## 3. Datos pendientes para completar el schema (sin ellos no se publican)
Agregar al bloque `Hotel` de `index.html` solo cuando estén confirmados:
- `telephone`, `email`
- `address.streetAddress` y `postalCode`
- `geo` (latitud y longitud exactas de Google Maps) y `hasMap`
- `checkinTime`, `checkoutTime`
- `numberOfRooms`
- `containsPlace`: una `HotelRoom` por habitación (nombre, descripción, m², cama, capacidad)
- `amenityFeature`: amenidades reales
- `priceRange` (si se decide mostrarlo)
- `sameAs`: Instagram, TikTok, Google Business Profile, TripAdvisor
- `starRating` solo si hay clasificación oficial
- `aggregateRating` solo con reseñas reales y visibles en el sitio

Ampliar el `FAQPage` a 6–8 preguntas, siempre con la misma respuesta visible en la página: check-in/out, mascotas, niños, estacionamiento, desayuno, cómo llegar desde Mérida y Cancún, política de cancelación.

## 4. Arquitectura de palabras clave (hipótesis a validar)
| Clúster | Intención | Página destino | Ejemplos de consulta |
|---|---|---|---|
| Hotel en Valladolid | Transaccional | Inicio y Habitaciones | hotel boutique en Valladolid Yucatán; hoteles en Valladolid con encanto; dónde dormir en Valladolid |
| Marca | Navegacional | Inicio | Amaya Valladolid; Amaya hotel boutique |
| Qué hacer | Informacional | Blog | qué hacer en Valladolid; cenotes cerca de Valladolid; Valladolid en un fin de semana |
| Cómo llegar | Informacional | Blog | cómo llegar a Valladolid desde Cancún; Valladolid desde Mérida; Valladolid a Chichén Itzá |
| Nicho de calma | Informacional y transaccional | Blog + Inicio | escapada tranquila en Yucatán; hoteles para desconectar en Yucatán; hotel para parejas en Valladolid |
| Comer y vivir el pueblo | Informacional | Blog | dónde comer en Valladolid; Valladolid Pueblo Mágico |

Validación: pegar estas consultas en Keyword Planner y revisar los resultados reales de Google antes de escribir; priorizar las que muestren intención de hospedaje.

## 5. Plan de contenido (blog)
Reglas: mínimo 900 palabras, un tema por artículo, respuesta en los dos primeros párrafos, datos verificables (distancias, horarios, nombres), una sola mención al hotel al final, CTA de reserva, schema `BlogPosting` y breadcrumb (el motor ya los genera).

| # | Artículo (título tentativo) | Clúster | Prioridad |
|---|---|---|---|
| 1 | Qué hacer en Valladolid, Yucatán: guía para 2 o 3 días | Qué hacer | Alta |
| 2 | Cenotes cerca de Valladolid: cuáles visitar y cómo llegar | Qué hacer | Alta |
| 3 | Cómo llegar a Valladolid desde Cancún, Mérida y Tulum | Cómo llegar | Alta |
| 4 | Dónde dormir en Valladolid según el tipo de viaje | Hotel | Alta |
| 5 | Valladolid o Mérida: dónde conviene hospedarse | Comparativo | Media |
| 6 | Dónde comer en Valladolid: cocina yucateca con nombre propio | Comer | Media |
| 7 | Escapada de calma en Yucatán: itinerario de 3 días | Nicho calma | Media |
| 8 | Chichén Itzá desde Valladolid: horarios y cómo evitar multitudes | Cómo llegar | Media |
| 9 | Mejor época para visitar Valladolid | Informacional | Media |
| 10 | Qué es el estilo wabi-sabi y cómo se vive en un hotel (marca) | Marca | Baja |

Todos los datos de cada artículo se verifican en fuentes primarias antes de publicar. Cadencia sugerida: 2 por mes los primeros 6 meses.

## 6. GEO: cómo lograr que las IA citen a Amaya
1. **Entidad clara y consistente.** Mismo nombre, dirección y teléfono en el sitio, Google Business Profile, TripAdvisor, Booking, Instagram y directorios. Cualquier diferencia debilita la entidad.
2. **Respuestas directas.** Cada página y artículo abre con la respuesta en dos frases, seguida del detalle. Es el formato que las IA extraen.
3. **FAQ visible + schema** con el mismo texto.
4. **Datos verificables** (distancias, horarios, cantidad de habitaciones, política). Las IA prefieren datos concretos sobre adjetivos.
5. **Menciones de terceros.** Prensa de viajes y diseño, listas de “mejores hoteles”, blogs de viajeros, directorios. Pesan más que el propio sitio.
6. **Reseñas reales** en Google y TripAdvisor, con respuesta del hotel a todas.
7. **`llms.txt` y `robots.txt`** abiertos a los rastreadores de IA (ya incluidos).
8. **Monitoreo mensual:** preguntar en ChatGPT, Perplexity y Google las 8 consultas clave, registrar si Amaya aparece, en qué posición y qué fuentes cita.

Consultas de monitoreo: “mejor hotel boutique en Valladolid Yucatán”, “dónde hospedarse en Valladolid para una escapada tranquila”, “hoteles con encanto en Valladolid”, “hotel para parejas en Valladolid”, “qué hotel recomiendas en Valladolid cerca del centro”, y la consulta de marca “Amaya Valladolid”.

## 7. SEO local
- **Google Business Profile:** nombre exacto igual al schema, categoría “Hotel boutique” (o la más específica disponible), URL del sitio con UTM, 20 o más fotos, descripción con la keyword en las dos primeras líneas, publicaciones cada dos semanas, responder todas las reseñas.
- **Directorios:** TripAdvisor, Booking, Expedia, Apple Business Connect, Bing Places. Mismos datos en todos.
- **Enlaces locales:** Pueblo Mágico Valladolid, cámaras de turismo, proveedores de tours y restaurantes aliados, con enlace al sitio.

## 8. SEO técnico: lista de verificación al publicar
- Dominio final y `sh scripts/set-domain.sh`.
- HTTPS activo y una sola versión del dominio (con o sin www) redirigiendo a la otra.
- Fotos reales por debajo de 200 KB; LCP (la foto de portada) por debajo de 2.5 s en móvil.
- Un solo H1; jerarquía H2/H3 correcta.
- Search Console: propiedad de Dominio, verificación TXT, envío de `sitemap.xml`, solicitud de indexación de las URLs nuevas.
- Prueba de resultados enriquecidos de Google sobre el schema.
- PageSpeed Insights en móvil.
- Si se agregan páginas propias (Habitaciones, Valladolid) como URLs independientes: una URL por habitación y una por tema, cada una con su title, description, canonical y entrada en el sitemap. Es el siguiente paso de mayor impacto en SEO, porque hoy todo vive en una sola página.

## 9. Medición
| Qué | Dónde | Frecuencia |
|---|---|---|
| Impresiones, clics, consultas, posición | Search Console | Semanal |
| Páginas indexadas y errores | Search Console, Indexación | Semanal |
| Core Web Vitals | Search Console / PageSpeed | Mensual |
| Reservas directas y fuente | GTM/GA4 + motor de reservas | Mensual |
| Eventos del embudo (`reserve_click`, `date_select`, `availability_check_start`, `booking_engine_exit`) | GTM/GA4 | Mensual |
| Presencia en respuestas de IA | Prueba manual de 6 consultas | Mensual |
| Reseñas y llamadas desde Google | Business Profile | Mensual |

## 10. Plan de 90 días
**Días 1–15:** dominio, fotos reales, datos confirmados, schema completo, GTM, Search Console, Google Business Profile, TripAdvisor.
**Días 16–45:** artículos 1 a 4; separar Habitaciones y Valladolid en URLs propias; primeras reseñas; enlaces locales.
**Días 46–90:** artículos 5 a 8; primera medición de GEO; ajuste de títulos según consultas reales de Search Console; una nota o mención en prensa de viajes.

## 11. Riesgos
- Publicar con datos de ejemplo o texto entre corchetes: dañaría la confianza. No publicar hasta completarlos.
- Todo el contenido en una sola URL limita el posicionamiento de las búsquedas de habitación y de Valladolid.
- Schema con datos que no coinciden con lo visible en la página: Google puede ignorarlo.
- Sin reseñas ni menciones externas, las IA tendrán poca evidencia para citar a Amaya.
