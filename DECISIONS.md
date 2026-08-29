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

### Taxonomía de actividades — **pendiente de cerrar**
Hay dos listas que todavía no se reconciliaron:
- **Stories (misión/visión):** Preparatorio, Profesional, Meditaciones, Dirección espiritual, Catequesis, Retiro mensual, Curso de retiro, Visitas a los pobres, Colectas (**excluir** Vela al Santísimo — no aplica).
- **Feedback de Joaquín Camus (WhatsApp):** Círculos, Retiros (mensual/anual), Confesiones, Charlas de formación, Charlas profesionales, Publicaciones.
- Joaquín también aportó datos reales de Círculos (8 instancias: día, hora, sede, persona a cargo) y el patrón de navegación por drill-down (categoría → lista semanal → detalle con horario/contacto), que se usará donde tenga sentido a nivel UX (categorías con múltiples instancias recurrentes) — no necesariamente en todas.

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

### Backup
- Antes de empezar a modificar `docs/index.html` para la v1, se taggeó el estado actual del repo como respaldo del v0 (ver tag de git) — la v1 se construye sobre el mismo repo, manteniendo la URL de GitHub Pages por ahora.

### Pendiente para próximas rondas
- Cerrar taxonomía definitiva de categorías de actividades.
- Símbolo oficial + tipografía → llevarlo a Claude Design una vez cerrado el look visual de los anillos.
- Definir entidades exactas del backend (actividad, sesión, inscripción, ¿medio de formación como categoría separada?).
- Símbolo/asset oficial, link de WhatsApp — siguen pendientes del equipo del centro (o ya resueltos con lo de los anillos, a confirmar si reemplaza esa pendiente del `DESIGN_BRIEF.md`).
