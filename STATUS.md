# STATUS — poloniapp

**Fase:** iteración-v1 en curso (contenido real, símbolo y publicaciones ya integrados; navegación por categoría en curso con Claude Design; falta backend/portal admin)
**Madurez:** 2/5

## Qué es
Web app informativa (MVP) para un centro cultural del O. en Las Condes (Polonia 306) — capa de identidad, feed de actividades propias por categoría (con detalle propio) + sección secundaria de publicaciones de O. (redirige afuera) + sección "Textos diarios" (pendiente de implementar, redirige afuera) + bubble chat de contacto que redirige a WhatsApp. Ver `PROJECT_BRIEF.md` para el scope original y `DESIGN_BRIEF.md` para la arquitectura de información y paleta visual del v0. **`DECISIONS.md` es la fuente de verdad de todo lo que cambió sobre esos dos documentos durante la iteración v1** — leerlo siempre antes de asumir el estado del contenido/UX.

## Deploy
- **URL:** https://ignacio-aranguiz.github.io/poloniapp/
- **Repo:** https://github.com/ignacio-aranguiz/poloniapp (público, requerido por GitHub Pages free)
- Fuente: `main` / `docs`.
- **Backup del v0** (antes de toda la iteración v1) disponible en el tag de git `v0-mockup-backup`.

## ⏳ EN CURSO — leer esto primero al retomar
Se le pidió a Claude Design (sesión "PoloniApp" en claude.ai/design) implementar `NAVIGATION_BRIEF.md`: grilla de 7 categorías en Actividades (drill-down) + chips progresivos en Home + fotos de Optimal Work/Jornada + símbolo como placeholder. Sobre la marcha se sumaron ajustes por chat directo con Claude Design (no están en el `.md` original, quedan solo acá):
- Grid de categorías: **7 estrictas**, no 9 — Visitas a los pobres y Colectas quedan **ocultas** (no como "próximamente"). Ver sección de abajo.
- Círculos: sacar la mención al paso interno de preparatorio → profesional.
- Se le pasaron las 3 fotos de `docs/assets/posts/` (no habían llegado en la ronda anterior).
- Se pidió dejar el Home **prefiltrado en "formación/espiritual"** al abrir la app (cambia el default `todas` del `DESIGN_BRIEF.md` original — ver nota de trade-off en `DECISIONS.md`).

**Al retomar: pedirle a Ignacio el HTML que haya devuelto Claude Design con todo esto, integrarlo (mismo proceso que las rondas anteriores — verificar con el script de extracción/reempaquetado, no pisar wording), y recién ahí commit + push.**

## Qué ya está integrado y en producción
- Responsivo mobile (2026-08-16).
- Símbolo propio de anillos concéntricos, reemplaza el símbolo de O. (`SYMBOL_BRIEF.md`, ya ejecutado).
- Wording real en hero, Quiénes somos y actividades — cita textual del material de la O. donde existe, ver `DECISIONS.md`.
- 7 actividades reales cargadas con fotos propias (5 de 7 tienen foto; Círculos ×2 quedan con placeholder — se resuelve con símbolo en la ronda en curso).
- Binding de fotos completo en grid Home / lista Actividades / detalle (`PHOTOS_BRIEF.md`, ya ejecutado).
- 3 publicaciones de O. reales (título e imagen extraídos de opusdei.org por fetch directo), con link a la URL real del artículo.

## Wording — qué falta todavía (auditoría 2026-08-29)
- **"Todo te recarga"** — frase de cierre de las stories, sin lugar asignado aún.
- **Descripciones de categoría** — ya redactadas y cerradas (ver `DECISIONS.md`, sección "Descripciones de categoría"), pero **no están cableadas en el HTML todavía** porque la grilla de categorías no existe hasta que vuelva la ronda de `NAVIGATION_BRIEF.md`. Pegarlas ahí cuando se integre.
- **Sección "Textos diarios"** — decidida hace varias rondas (card que redirige a opusdei.org/es-cl/dailytext, mismo patrón que Publicaciones), **nunca se implementó**. Pendiente real, no solo de wording.
- **"Qué se hace acá" en Quiénes somos** — hoy comprime 7 categorías en 4 bullets del template viejo; expandir a las 7 (o 5 visibles, ver nota de Visitas/Colectas) cuando se toque esa sección de nuevo.

## Próximos pasos (no wording)
- Integrar el resultado de Claude Design de `NAVIGATION_BRIEF.md` (ver arriba).
- Implementar la sección "Textos diarios" (card + link afuera, sin scraping).
- Definir stack técnico real del backend + portal admin (Supabase/similar, liviano, 1-3 admins) — incluye modelar el gate de privacidad de direcciones (visibles solo post-inscripción, ya aplicado como texto en Encuentro de Matrimonios).
- Scraper de publicaciones de O. — **fase 2**, fuera de v1.
- Conseguir del equipo del centro: link real de WhatsApp (el botón hoy no tiene destino).
- Implementar tracking de clics en bubble chat (recomendación del brief original: Google Sheets vía Apps Script Web App).
- Reactivar Visitas a los pobres / Colectas cuando haya decisión — el texto ya está listo en `DECISIONS.md`, no reinventar.

## Blockers
- Ninguno bloqueante — falta el resultado de la ronda de Claude Design en curso, decisión de stack de backend, y el link de WhatsApp real.

## Documentos del proyecto — qué es cada uno
- `PROJECT_BRIEF.md` — brief de producto original (v0).
- `DESIGN_BRIEF.md` — arquitectura de información y paleta visual original (v0) — **algunas decisiones ahí quedaron obsoletas por la iteración v1** (ej. filtro default `todas`, símbolo de O.); `DECISIONS.md` manda cuando difieren.
- `DECISIONS.md` — **fuente de verdad viva** de toda decisión de diseño/UX/contenido tomada durante la iteración v1, ronda por ronda. Leer siempre primero.
- `SYMBOL_BRIEF.md` — brief del símbolo de anillos (ya ejecutado).
- `PHOTOS_BRIEF.md` — brief del binding de fotos de actividades (ya ejecutado).
- `NAVIGATION_BRIEF.md` — brief de navegación por categoría + chips progresivos + fotos/placeholder (**en curso**, ver arriba los ajustes que no están en el archivo).
- `journey-centro-cultural.svg` — journey to-be original.
- `rings-reference.png` — referencia visual del símbolo (baja resolución, solo conceptual).
- `docs/assets/` — assets reales del sitio: `activities/` (fotos de actividades), `posts/` (fotos de publicaciones de O.), `poloniapp-symbol.svg` (símbolo standalone).
