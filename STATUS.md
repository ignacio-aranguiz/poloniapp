# STATUS — poloniapp

**Fase:** iteración-v1 → backend/data-driven (2026-08-30): Fases 1, 2 (a+b+c), 3 y 5 completas y viendo en `/preview/` + `/admin/`; pendiente Fase 4 (inscripciones, bloqueada por feedback de otros admins) y el swap a la raíz
**Madurez:** 3/5

## Qué es
Web app informativa (MVP) para un centro cultural del O. en Las Condes (Polonia 306) — capa de identidad, feed de actividades propias por categoría (con detalle propio) + sección secundaria de publicaciones de O. (redirige afuera) + sección "Texto diario" (redirige afuera) + tarjeta de reserva de Confesiones (redirige a Setmore) + bubble chat de contacto a WhatsApp. Ver `PROJECT_BRIEF.md` para el scope original y `DESIGN_BRIEF.md` para la arquitectura de información y paleta visual del v0. **`DECISIONS.md` es la fuente de verdad de todo lo que cambió sobre esos dos documentos durante la iteración v1** — leerlo siempre antes de asumir el estado del contenido/UX.

## Deploy
- **Producción (bundle viejo, sin tocar todavía):** https://ignacio-aranguiz.github.io/poloniapp/
- **Preview (build nuevo, data-driven):** https://ignacio-aranguiz.github.io/poloniapp/preview/
- **Panel admin:** https://ignacio-aranguiz.github.io/poloniapp/admin/ (login Supabase Auth)
- **Manual para admins:** https://ignacio-aranguiz.github.io/poloniapp/manual/
- **Repo:** https://github.com/ignacio-aranguiz/poloniapp (público, requerido por GitHub Pages free)
- Fuente: `main` / `docs`.
- **Backend:** Supabase, proyecto `poloniapp` (São Paulo) — URL y keys en `docs/assets/js/config.js` (anon, pública) y en Supabase dashboard (service_role, nunca en el repo).
- **Backup del v0** (antes de toda la iteración v1) disponible en el tag de git `v0-mockup-backup`.

## Qué ya está integrado y en producción (raíz — bundle viejo)
- Responsivo mobile (2026-08-16).
- Símbolo propio de anillos concéntricos, reemplaza el símbolo de O. (`SYMBOL_BRIEF.md`, ya ejecutado).
- Wording real en hero, Quiénes somos y actividades — cita textual del material de la O. donde existe, ver `DECISIONS.md`.
- 7 actividades reales cargadas con fotos propias (5 de 7 tienen foto; Círculos ×2 quedan con placeholder — se resuelve con símbolo en la ronda en curso).
- Binding de fotos completo en grid Home / lista Actividades / detalle (`PHOTOS_BRIEF.md`, ya ejecutado).
- 3 publicaciones de O. reales (título e imagen extraídos de opusdei.org por fetch directo), con link a la URL real del artículo.
- **Navegación por categoría (2026-08-29, `NAVIGATION_BRIEF.md`, ya ejecutado):** Actividades es grilla de 7 categorías con drill-down (ya no agrupa por fecha). Home con chips progresivos, prefiltrado en "formación/espiritual" al abrir. Visitas a los pobres/Colectas ocultas (texto listo en `DECISIONS.md` para reactivar). Círculos con placeholder de símbolo; las otras 6 actividades reales ya tienen foto propia (incluye Optimal Work y Jornada Matrimonio y Familia).

## Wording — qué falta todavía (auditoría 2026-08-29, resuelto 2026-08-30)
- **"Todo te recarga"** — frase de cierre de las stories, sigue sin lugar asignado. Único pendiente real de esta lista.
- ~~Descripciones de categoría sin cablear~~ — resuelto: son editables desde el admin (tab Categorías), se muestran en la página de cada categoría cuando existen.
- ~~Sección "Textos diarios" nunca implementada~~ — resuelto (carga manual desde el admin, ver sección de abajo).
- ~~"Qué se hace acá" con bullets fijos del template viejo~~ — resuelto: ahora se genera en vivo listando `categories.name`, nunca queda desincronizado de la grilla real.
- ~~Confesiones sin contenido~~ — resuelto: tarjeta "Reservar hora de confesión" que redirige a `poloniasub35.setmore.com` (booking real del centro), editable vía `site_content.confesiones.booking_url`.

## Backend / panel admin / scraper — en ejecución (2026-08-30)
Ronda 7 de `DECISIONS.md`. Plan: `/Users/ignacio_aranguiz/.claude/plans/estuve-pensando-en-como-transient-bee.md`.
- **✅ Fase 1 — Supabase:** proyecto `poloniapp` creado (São Paulo), schema completo + RLS corrido (`supabase/schema.sql`), admin cargado, contenido real migrado (`supabase/seed.sql`).
- **✅ Fase 2a — Home data-driven:** `docs/index.html` dejó de ser el export bundlado de Claude Design — reescrito a mano (HTML/CSS/JS simple, sin runtime bundler) con fetch client-side a Supabase.
- **✅ Fase 2b — Navegación real:** router hash-based (Home → grilla de 7 categorías → lista por categoría → detalle de actividad). Categorías sin actividades muestran "próximamente". Detalle usa `locations_public` (solo nombre, nunca dirección) y CTA de inscripción deshabilitado (llega en Fase 4).
- **✅ Fase 2c — Bubble chat:** flotante en todas las vistas, número general en `site_content.contact.whatsapp` (+56953719944), con override por actividad vía `activities.contact_name/contact_phone` (ej. persona a cargo de un Círculo) cuando esté cargado.
- **Fase 2 completa**, viendo en `/preview/` (no en la raíz todavía, ver nota de deploy abajo).
- **✅ Fase 3 — Panel admin completo:** `docs/admin/`, Supabase Auth (email+password) + allowlist `admins`. 7 pestañas: Contenido fijo, Categorías, Actividades (con sesiones anidadas), Ubicaciones, Publicaciones, Texto diario (solo lectura), Inscripciones (solo lectura). Upload real de imágenes a Supabase Storage (bucket `site-images`) en los 3 campos de foto (Quiénes somos, actividades, publicaciones).
- **Manual para admins:** `docs/manual/` (endpoint público, con capturas reales), explica cómo entrar, editar texto, subir imagen, ver el resultado.
- **Pendiente Fase 4:** flujo público de inscripción + RPC `register_and_reveal_address` (ya está en el schema, falta cablear en el frontend) — a la espera de feedback de los otros admins (reunión en ~2 semanas, 2026-09-13).
- **✅ Fase 5 (pivot):** el scraper automático no es viable — opusdei.org corre atrás de Cloudflare con challenge JS en todas las rutas (sitio, /feed, /rss.xml). "Texto diario" pasa a carga manual desde el admin (mismo patrón que Publicaciones), con su sección ya viva en la Home pública.
- **Nota de deploy:** el build nuevo vive en `docs/preview/` (`https://ignacio-aranguiz.github.io/poloniapp/preview/`) para no romper la home en producción (`docs/index.html` raíz sigue siendo el bundle viejo). Swap a la raíz pendiente de decisión explícita.

## Próximos pasos (no wording)
- Fase 4 (inscripciones) — retomar después de la reunión con los otros admins (~2026-09-13).
- Swap `docs/preview/` → raíz cuando el usuario lo decida explícitamente.
- Implementar tracking de clics en bubble chat (recomendación del brief original: Google Sheets vía Apps Script Web App).
- Reactivar Visitas a los pobres / Colectas cuando haya decisión — el texto ya está listo en `DECISIONS.md`, no reinventar.

## Blockers
- **Fase 4 (inscripciones):** bloqueada a propósito — el usuario quiere feedback de los otros admins del centro antes de definir el flujo, se juntan ~2026-09-13.
- Nada más bloqueante — el link de WhatsApp ya se cargó (+56953719944).

## Documentos del proyecto — qué es cada uno
- `PROJECT_BRIEF.md` — brief de producto original (v0).
- `DESIGN_BRIEF.md` — arquitectura de información y paleta visual original (v0) — **algunas decisiones ahí quedaron obsoletas por la iteración v1** (ej. filtro default `todas`, símbolo de O.); `DECISIONS.md` manda cuando difieren.
- `DECISIONS.md` — **fuente de verdad viva** de toda decisión de diseño/UX/contenido tomada durante la iteración v1, ronda por ronda. Leer siempre primero.
- `SYMBOL_BRIEF.md` — brief del símbolo de anillos (ya ejecutado).
- `PHOTOS_BRIEF.md` — brief del binding de fotos de actividades (ya ejecutado).
- `NAVIGATION_BRIEF.md` — brief de navegación por categoría + chips progresivos + fotos/placeholder (ya ejecutado, integrado también en el frontend nuevo data-driven).
- `journey-centro-cultural.svg` — journey to-be original.
- `rings-reference.png` — referencia visual del símbolo (baja resolución, solo conceptual).
- `docs/assets/` — assets reales del sitio: `activities/` (fotos de actividades), `posts/` (fotos de publicaciones de O.), `poloniapp-symbol.svg` (símbolo standalone), `css/`+`js/` (frontend data-driven nuevo).
- `supabase/schema.sql` — schema completo (tablas, RLS, RPC) del backend, fuente de verdad del modelo de datos.
- `supabase/seed.sql` — contenido inicial migrado a Supabase (no re-correr entero: los inserts de actividades/sesiones no tienen `on conflict`, duplicarían datos).
- `docs/admin/`, `docs/preview/`, `docs/manual/` — panel admin, build nuevo del sitio, y manual para admins (ver sección Deploy).
