# STATUS — poloniapp

**Fase:** cimientos-cerrados (brief + diseño listos, sin código ni wireframe aún)
**Madurez:** 1/5

## Qué es
Web app informativa (MVP) para un centro cultural del O. — capa de identidad, feed de actividades propias (con detalle propio) + sección secundaria de publicaciones de O. sincronizadas por scraper (sin detalle propio, redirige afuera), y bubble chat de contacto que redirige a WhatsApp. Ver `PROJECT_BRIEF.md` para el scope completo y `DESIGN_BRIEF.md` para arquitectura de información y paleta visual.

## Próximos pasos
- Wireframe de calidad media en Claude Design (en curso, fuera de esta sesión).
- Definir stack técnico (probable: necesita persistencia real + job de scraping, ya no alcanza con HTML estático puro).
- Definir frecuencia de sync y validar términos de uso de opusdei.org para el scraper.
- Conseguir del equipo del centro: símbolo oficial (asset), link de WhatsApp, contenido real de actividades y de "Quiénes somos".
- Implementar tracking de clics en bubble chat (recomendación del brief: Google Sheets vía Apps Script Web App).

## Blockers
- Ninguno bloqueante — falta decisión de stack, y contenido/assets reales del centro.

## Links rápidos
- Brief de producto: `PROJECT_BRIEF.md`
- Brief de diseño visual: `DESIGN_BRIEF.md`
- Journey (to-be): `journey-centro-cultural.svg`
