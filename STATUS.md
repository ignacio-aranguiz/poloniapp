# STATUS — poloniapp

**Fase:** iteración-v1 (símbolo propio integrado, taxonomía de contenido cerrada; falta backend/portal admin y contenido real cargado)
**Madurez:** 2/5

## Qué es
Web app informativa (MVP) para un centro cultural del O. — capa de identidad, feed de actividades propias (con detalle propio) + sección secundaria de publicaciones de O. sincronizadas por scraper (sin detalle propio, redirige afuera), y bubble chat de contacto que redirige a WhatsApp. Ver `PROJECT_BRIEF.md` para el scope completo y `DESIGN_BRIEF.md` para arquitectura de información y paleta visual.

## Deploy
- **URL:** https://ignacio-aranguiz.github.io/poloniapp/
- **Repo:** https://github.com/ignacio-aranguiz/poloniapp (público, requerido por GitHub Pages free)
- Fuente: `main` / `docs` — mismo patrón que `consuelo-hr`.
- Contenido actual: `docs/index.html` es el HTML standalone (v0) generado con Claude Design a partir de `DESIGN_BRIEF.md` — mockup visual, sin datos reales ni backend.
- Responsivo mobile corregido (2026-08-16): el export original tenía un marco de teléfono fijo para desktop que desbordaba en celulares reales. Se rehizo directamente en Claude Design (layout apilado y centrado con container query, sin depender de media queries) y se re-exportó. Verificado en producción con viewport de 375px.
- Símbolo oficial integrado (2026-08-29): se reemplazó el placeholder de símbolo de O. por el mark propio de anillos concéntricos (brief en `SYMBOL_BRIEF.md`, referencia en `rings-reference.png`), trabajado en Claude Design y re-exportado. Mantiene tipografía (`Caprasimo`/`Figtree`) y casi toda la paleta original; se sumó un acento nuevo `#6E2F35`.
- Wording del hero corregido (2026-08-29): texto literal del material de la O. en vez de paráfrasis tipo autoayuda — ver `DECISIONS.md`.
- Fotos reales de 3 actividades integradas (2026-08-29): binding completo en grid de Home, lista de Actividades y portada de Detalle. Assets en `docs/assets/activities/`.
- Backup del v0 pre-iteración disponible en el tag de git `v0-mockup-backup`.

## Próximos pasos
- Cargar contenido real de actividades (ya recolectado, ver `DECISIONS.md`) sobre la taxonomía cerrada de 7 categorías.
- Definir stack técnico real del backend + portal admin (Supabase/similar, liviano, 1-3 admins) — incluye modelar el gate de privacidad de direcciones (visibles solo post-inscripción).
- Definir frecuencia de sync y validar términos de uso de opusdei.org para el scraper de publicaciones de O. — **fase 2**, fuera de v1.
- Conseguir del equipo del centro: link de WhatsApp, contenido real de "Quiénes somos" (ya hay material de misión/visión recolectado).
- Implementar tracking de clics en bubble chat (recomendación del brief: Google Sheets vía Apps Script Web App).

## Blockers
- Ninguno bloqueante — falta decisión de stack de backend, y contenido/assets reales restantes del centro (WhatsApp, quiénes somos final).

## Links rápidos
- Brief de producto: `PROJECT_BRIEF.md`
- Brief de diseño visual: `DESIGN_BRIEF.md`
- Log de decisiones de iteración v1: `DECISIONS.md`
- Brief del símbolo: `SYMBOL_BRIEF.md`
- Journey (to-be): `journey-centro-cultural.svg`
