# DECISIONS — poloniapp

Log vivo de decisiones de diseño, UX/UI y estructura de contenido tomadas en sesiones de iteración. Se va actualizando a medida que cerramos rondas de "idas y vueltas" — no reemplaza `PROJECT_BRIEF.md` ni `DESIGN_BRIEF.md` (que describen el v0 ya cerrado), sino que registra qué cambia para la v1 y por qué.

---

## 2026-08-29 — Ronda 1: marco de iteración v0 → v1

### Qué se mantiene del v0
- Look & feel, navegación por secciones, botones de CTA y paleta de colores validaron bien con feedback recibido — no se tocan.
- `docs/index.html` sigue siendo un export bundlado de Claude Design (contenido embebido, no editable línea por línea). El patrón para iterar contenido visual sigue siendo: compartir objetivo + material en Claude Design → regenerar export → reemplazar el archivo.

### Backend / portal admin (nuevo para v1)
- **Motivo:** que los administradores del centro puedan agregar/editar actividades sin depender de Ignacio.
- Admins: 1-3 personas de confianza → auth simple alcanza, no se necesita sistema de roles.
- Stack: backend real pero liviano (Supabase o similar, free tier) + frontend admin simple, sin sobreingeniería.
- **Requisito de privacidad importante:** la dirección exacta de una actividad **no es pública** — se revela recién después de que la persona se inscribe. Esto implica que "ver detalle" e "inscribirse" son flujos distintos, y que probablemente la inscripción necesita algún dato de identificación (nombre + email/teléfono mínimo). Impacta el diseño del backend — no es un simple CRUD de contenido, también hay que modelar inscripciones.
- Scraper de opusdei.org: **fuera de alcance para v1**, queda para fase 2.

### Contenido — misión/visión
- Símbolo oficial: **los anillos concéntricos** (marco de "3 anillos" de San Josemaría: buscar / encontrar / amar a Cristo), no el símbolo genérico de O. que se había dejado pendiente en el `DESIGN_BRIEF.md` original.
- El concepto de anillos es **solo copy/storytelling** para la sección "Quiénes somos" — no es una feature interactiva de tracking/progreso (eso hubiera requerido cuentas de usuario final y backend adicional, se descartó).
- Contenido de esa sección: objetivo (buscar a Dios en la vida ordinaria y darlo a conocer), 5 planos formativos (humano, espiritual, doctrinal, profesional, apostólico), actitud (comenzar y recomenzar).
- Tipografía: el v0 ya usa `Caprasimo` (headings) + `Figtree` (body) — pendiente evaluar en Claude Design si el símbolo de anillos concéntricos (que en el material de referencia usa paleta teal/lima/magenta sobre navy) pide algún ajuste tipográfico o si Caprasimo/Figtree ya son coherentes tal cual.

### Sección "Textos diarios"
- Se agrega como card/preview que redirige afuera a opusdei.org/es-cl/dailytext — mismo patrón ya definido para publicaciones de O. (sin vista de detalle propia, sin scraping).

### Taxonomía de actividades — **cerrada (2026-08-29, ronda 2)**
Categorías top-level definitivas para v1:
1. **Círculos** (fusiona Preparatorio + Profesional de las stories) — con las 8 instancias reales de Joaquín (día, hora, sede, persona a cargo)
2. **Retiros** (ej. Retiro de Agosto)
3. **Confesiones**
4. **Charlas de formación** (ej. Catolicismo Ciclo 2, Meditaciones, Dirección espiritual, Catequesis)
5. **Charlas profesionales** (ej. Optimal Work)
6. **Matrimonio y Familia** (Encuentro de Matrimonios + Jornada Matrimonio y Familia anual — **no** va dentro de Retiros, es su propia categoría)
7. **Publicaciones** (redirige afuera, sin vista de detalle propia)

Además, **Visitas a los pobres de la Virgen** y **Colectas** se incluyen como categorías visibles aunque todavía no tengan contenido real cargado (categoría vacía, se puebla más adelante).

Patrón de navegación por drill-down (categoría → lista de instancias → detalle con horario/contacto), aportado por Joaquín, se usa donde tenga sentido a nivel UX — categorías con múltiples instancias recurrentes.

### Contenido real recolectado (actividades)
Extraído de `Polonia.docx` + PDFs + posters compartidos:
- Misión (docx): "Acompañar a profesionales jóvenes en su proyecto de vida cristiana a través de actividades de formación."
- **Encuentro de Matrimonios** — serie de charlas (ej. 13 ago "Transmisión de la fe en la familia" con Ronald Bown; 3 sept "Educación de hijos e hijas" con Álvaro Ibáñez) — Cerro Colorado 4700 dpto 175, Las Condes, 20:30-21:30, $10.000/matrimonio.
- **Retiro de Agosto** — 11-12 agosto, 19:15-20:45, Polonia 306, incluye confesiones.
- **Catolicismo — Profundizar la fe (Ciclo 2)** — serie de 5 sesiones fechadas (jul-ago), 19:15, Polonia 306, "Formación para jóvenes profesionales".
- **Optimal Work** — programa neurociencia/psicología, serie de 5 sesiones (mayo-julio), 20:00, Centro Cultural Polonia, incluye mentoring + conversatorio/comida.
- **Jornada Matrimonio y Familia 2026** — evento anual único (6ª edición), sábado 30 mayo, Antullanca (Lo Barnechea), $30.000/familia, guardería, 9:00-17:00 + misa.

**Decisiones sobre este contenido:**
- Direcciones múltiples confirmadas (Polonia 306, Cerro Colorado 4700, Antullanca) → sí hay que modelar dirección por actividad, con el gate de privacidad mencionado arriba (solo visible post-inscripción).
- Matrimonios/familias **sí entra** en el alcance de poloniapp — mismo centro/segmento que profesionales jóvenes, aunque el público puntual de esas actividades sea distinto.
- Modelo de datos debe soportar **ambos formatos**: evento simple (1 sesión) y serie (N sesiones fechadas con tema/expositor propio bajo un mismo nombre de actividad).

### Descripciones de categoría — cerradas (2026-08-29, ronda 5)
- **Círculos, Retiros, Charlas de formación**: texto tomado literal (recortado/unido) de las stories de misión/visión. Ojo: en Círculos **no** se menciona el paso interno de preparatorio a profesional — se sacó del copy final, es un detalle interno del centro, no de cara al usuario.
- **Confesiones, Charlas profesionales, Matrimonio y Familia**: sin párrafo propio en las stories — el copy se apoya en el contenido real de actividades ya cargadas (Retiro de Agosto para Confesiones, Optimal Work para Charlas profesionales, Encuentro de Matrimonios/Jornada para Matrimonio y Familia), no es cita textual de la O.
- **Visitas a los pobres de la Virgen y Colectas — ocultas por ahora** (revierte la decisión anterior de "categoría vacía visible"). Ya tenemos el texto literal de las stories listo para cuando se activen: Visitas = "Aprendés a ver a Cristo en el prójimo, con contacto inmediato y personal con el sufrimiento"; Colectas = "Una manera de dar de lo tuyo para colaborar con las necesidades del centro y del voluntariado". **No perder este texto** — están listas para reactivar apenas haya decisión de mostrarlas.
- La grilla de Actividades queda en **7 categorías estrictas** (no 9): Círculos, Retiros, Confesiones, Charlas de formación, Charlas profesionales, Matrimonio y Familia, Publicaciones.
- **Nota de proceso:** estas descripciones de categoría se redactaron en esta conversación pero no se habían entregado a Claude Design como parte de `NAVIGATION_BRIEF.md` — quedaron solo documentadas acá. Se le pasaron recién en la ronda de ajustes por chat (2026-08-29, tarde), junto con el resto de los ajustes (grilla 7 estricta, prefiltrado formación/espiritual, fotos de publicaciones).

### NAVIGATION_BRIEF.md — integrado y deployado (2026-08-29, ronda 6)
- Grilla de Actividades en 7 categorías con drill-down, chips progresivos en Home (prefiltrado en "formación/espiritual" al abrir, sub-chips desplegados), Círculos con placeholder de símbolo, Optimal Work y Jornada Matrimonio y Familia con foto propia.
- **Bug encontrado y corregido antes del deploy:** las fotos de publicaciones dependían de `window.POLONIA_PHOTOS`, que el export nunca define (a diferencia de las fotos de actividades, que sí tienen fallback a `assets/activities/*.jpg`). Se agregó `postSrc()` con el mismo patrón de fallback, apuntando a `assets/posts/*.jpg` — sin esto las publicaciones hubieran caído al placeholder en producción pese a que Claude Design reportó el problema resuelto.
- Verificado con el mismo script de extracción/reempaquetado de siempre antes de pushear: wording intacto, assets referenciados existen en el repo, Visitas/Colectas ausentes del HTML.

### Navegación por categoría — decidida (2026-08-29, ronda 4)
- **Actividades** pasa de agrupamiento por fecha a **grilla de las 7 categorías** (drill-down categoría → lista por fecha → detalle). Motivo: Círculos son recurrentes sin fecha absoluta y no encajan en "esta semana/próximo mes"; Jornada Matrimonio y Familia es anual y quedaba forzada en un cubo temporal falso; la intención de búsqueda real es por tipo, no por fecha.
- **Chips del Home**: se mantienen los 3 buckets amplios (formación/espiritual, trabajo/laboral, familia) pero con interacción de "carpetas" — tocar un bucket amplio filtra y despliega sus sub-chips de categoría específica debajo; un solo grupo abierto a la vez (decisión tomada por espacio en mobile, no multi-grupo simultáneo).
- Mapeo bucket → categorías: formación/espiritual = Círculos, Retiros, Confesiones, Charlas de formación, Visitas a los pobres, Colectas · trabajo/laboral = Charlas profesionales · familia = Matrimonio y Familia. Publicaciones queda fuera del esquema de filtros.
- Brief entregado a Claude Design: `NAVIGATION_BRIEF.md`.

### Wording del hero — corregido (2026-08-29, ronda 3)
El primer wording del hero ("Un lugar para crecer, con gente que te acompaña." → luego "Acompañamos tu vida cristiana, en medio de lo de todos los días.") no sirvió: leía a marketing/autoayuda genérica. No es eso — es una invitación a ampliar horizontes vía medios de formación concretos, no un programa de bienestar personal.
- **H1 final (cita textual, San Josemaría):** "Que busques a Cristo, que encuentres a Cristo, que ames a Cristo."
- **Subtítulo final (cita textual, "1 objetivo" de las stories):** "Buscar a Dios en la vida ordinaria, y darlo a conocer."
- Regla para el resto del copy: preferir texto literal del material de la O. ya recolectado por sobre paráfrasis propia.

### Fotos reales de actividades — integradas
- 3 fotos reales bajadas del Google Drive del centro (carpeta compartida) y guardadas en `docs/assets/activities/`: `catolicismo-ciclo2.jpg`, `encuentro-matrimonios-sept.jpg`, `retiro-agosto.jpg`. Son afiches de difusión reales (con texto propio superpuesto), no fotos genéricas.
- Se completó el binding de foto por actividad en los 3 lugares del template (grid de Home, lista de Actividades, portada de Detalle) vía `PHOTOS_BRIEF.md` + Claude Design — antes solo el grid de Home leía `a.img`; lista y detalle estaban hardcodeados a un texto placeholder.
- Actividades sin foto real todavía (Círculos ×2, Optimal Work, Jornada Matrimonio y Familia) siguen mostrando el placeholder rayado `.ph washed`.
- Nota de proceso: el primer export de esta ronda vino de una versión de `docs/index.html` **anterior** al fix de wording (Claude Design trabajó sobre un upload viejo) — se fusionó manualmente el binding de fotos nuevo con el wording correcto antes de integrar, sin perder ninguno de los dos.

### Símbolo oficial — integrado
- Se trabajó `SYMBOL_BRIEF.md` + `rings-reference.png` directamente en Claude Design (Opus 5, esfuerzo medio). Resultado: nuevo export standalone con el símbolo de anillos concéntricos integrado al header.
- Mantiene `Caprasimo`/`Figtree` y casi toda la paleta original (`#D85A30`, `#C88A3D`, `#2C2C2A`, `#f5ead8`, `#faf9f5`).
- Se sumó un color nuevo, `#6E2F35` (burdeo oscuro), no estaba en la paleta original del `DESIGN_BRIEF.md` — probablemente para el símbolo. A confirmar si se documenta como ampliación oficial de paleta.
- `docs/index.html` reemplazado con este export (2026-08-29) y deployado a producción.

### Backup
- Antes de empezar a modificar `docs/index.html` para la v1, se taggeó el estado actual del repo como respaldo del v0 (tag `v0-mockup-backup`) — la v1 se construye sobre el mismo repo, manteniendo la URL de GitHub Pages por ahora.

### Pendiente para próximas rondas
- Cerrar taxonomía definitiva de categorías de actividades.
- Símbolo oficial + tipografía → llevarlo a Claude Design una vez cerrado el look visual de los anillos.
- Definir entidades exactas del backend (actividad, sesión, inscripción, ¿medio de formación como categoría separada?).
- Símbolo/asset oficial, link de WhatsApp — siguen pendientes del equipo del centro (o ya resueltos con lo de los anillos, a confirmar si reemplaza esa pendiente del `DESIGN_BRIEF.md`).
