# Mapa de imágenes de Amaya

Sustituye cada archivo por la foto real **con el mismo nombre y en la misma carpeta**. Mientras el archivo no exista, el sitio muestra el recuadro provisional; no se rompe nada.

Reglas: JPG o WebP, menos de 200 KB, sin texto en la imagen. Si usas WebP, cambia la extensión también en `index.html`.

| Archivo (ruta) | Dónde aparece | Tamaño sugerido | Texto alternativo actual (editar con lo que muestre la foto) |
|---|---|---|---|
| `images/hero/hero.jpg` | Portada, foto grande a la derecha | 1200 × 1500 (vertical) | Patio de Amaya, hotel boutique en Valladolid, Yucatán, con luz lateral sobre muros de cal y vegetación |
| `images/habitaciones/habitacion-1.jpg` | Habitaciones, tarjeta 1 | 1200 × 1500 | Habitación 1 de Amaya, hotel boutique en Valladolid, Yucatán |
| `images/habitaciones/habitacion-2.jpg` | Habitaciones, tarjeta 2 | 1200 × 1500 | Habitación 2 de Amaya, hotel boutique en Valladolid, Yucatán |
| `images/habitaciones/habitacion-3.jpg` | Habitaciones, tarjeta 3 | 1200 × 1500 | Habitación 3 de Amaya, hotel boutique en Valladolid, Yucatán |
| `images/valladolid/valladolid-1.jpg` | Valladolid, recomendación 1 | 1200 × 1500 | Valladolid, Yucatán: recomendación 1 cerca de Amaya hotel boutique |
| `images/valladolid/valladolid-2.jpg` | Valladolid, recomendación 2 | 1200 × 1500 | Valladolid, Yucatán: recomendación 2 cerca de Amaya hotel boutique |
| `images/valladolid/valladolid-3.jpg` | Valladolid, recomendación 3 | 1200 × 1500 | Valladolid, Yucatán: recomendación 3 cerca de Amaya hotel boutique |
| `images/og/og-amaya.jpg` | Vista previa al compartir en WhatsApp, redes y Google | 1200 × 630 | (no lleva) Ahora es provisional con el logo; sustituir por una foto real del hotel |
| `images/brand/logo-carbon.png` | Encabezado | ya incluido | (decorativo) |
| `images/brand/logo-cal.png` | Sección Amaya (fondo oscuro) | ya incluido | Símbolo de Amaya |
| `images/brand/favicon.png` y `apple-touch-icon.png` | Pestaña del navegador y pantalla de inicio | ya incluidos | (no lleva) |
| `images/blog/<slug>.jpg` | Artículos del blog | 1200 × 630 | Descripción real de la foto |

## Cómo cambiar el texto alternativo
En `index.html`, busca la ruta de la imagen (por ejemplo `images/hero/hero.jpg`) y edita el atributo `alt` de esa línea.
Formato recomendado: `[qué se ve] — Amaya hotel boutique en Valladolid`.
