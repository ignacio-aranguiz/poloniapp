# Brief — Navegación por categoría (Actividades + chips de Home)

Pegar en la misma sesión de claude.ai/design, sobre el `docs/index.html` actual (ya tiene símbolo, wording real y fotos integradas). Subir el HTML como fuente de verdad antes de tocar nada.

## Parte 1 — Actividades pasa a grilla de categorías

Vos mismo (Claude Design) propusiste esto en la ronda anterior y lo confirmamos: el agrupamiento por fecha ("esta semana" / "próximo mes") se rompe con contenido real —
- Los Círculos son recurrentes sin fecha absoluta ("Lunes · 08:00"), no pertenecen a ningún cubo temporal.
- La Jornada Matrimonio y Familia es anual (30 de mayo) y quedaba forzada bajo "próximo mes" junto a eventos puntuales de agosto.
- La intención de búsqueda es por tipo ("quiero un círculo", "hay algo de matrimonios") no por fecha — la fecha importa recién dentro de la categoría elegida.

**Implementación:** la pantalla de Actividades pasa a ser una grilla de las **7 categorías**:
1. Círculos
2. Retiros
3. Confesiones
4. Charlas de formación
5. Charlas profesionales
6. Matrimonio y Familia
7. Publicaciones

Confesiones, Visitas a los pobres de la Virgen y Colectas no tienen actividades cargadas todavía — se muestran igual en la grilla con un estado "próximamente" (visible, pero sin lista). Tocar una categoría abre su propia lista de actividades, ordenada por fecha — ahí sí tiene sentido agrupar por fecha, dentro de la categoría ya elegida.

Esto reutiliza el drill-down (categoría → lista → detalle) que ya validamos con los datos reales de Círculos.

## Parte 2 — Chips del Home: progresivo, no plano

Los 3 chips actuales del Home (`todas · formación/espiritual · trabajo/laboral · familia`) se sienten demasiado simples ahora que hay 7 categorías reales, pero tampoco queremos saltar directo a mostrar las 7 de una — es mucho para la primera pantalla. Se define una interacción de **"carpetas que se abren"**:

**Mapeo bucket amplio → categorías específicas (sub-chips):**
- **formación / espiritual** → Círculos · Retiros · Confesiones · Charlas de formación · Visitas a los pobres · Colectas
- **trabajo / laboral** → Charlas profesionales
- **familia** → Matrimonio y Familia
- *(Publicaciones no entra en este esquema de filtros — sigue siendo su sección aparte que redirige afuera, sin chip propio)*

**Comportamiento (un solo grupo abierto a la vez, por espacio en pantalla mobile):**
1. Default: `todas` activo, sin sub-chips visibles.
2. Tocar un chip amplio → filtra por ese bucket **y** despliega debajo una fila con sus sub-chips específicos.
3. Tocar un sub-chip → afina el filtro a esa categoría puntual; el chip amplio se mantiene visualmente marcado como "grupo activo".
4. Tocar otro chip amplio → reemplaza el grupo abierto (cierra el anterior, abre el nuevo) — nunca dos grupos de sub-chips abiertos en simultáneo.
5. Tocar `todas` → colapsa todo, vuelve al estado inicial.

Usá tu criterio de motion/layout para la transición de aparición de la sub-fila (no tiene que ser instantánea ni brusca) — mantené el mismo lenguaje visual de los chips actuales (pill, mismo tratamiento on/off).

## Qué se necesita como resultado
1. Actividades como grilla de 7 categorías (con 3 vacías en estado "próximamente") → drill-down a lista por fecha → detalle (reutiliza lo ya construido).
2. Chips de Home con el comportamiento de carpetas de 2 niveles descrito arriba.
3. No toques wording, fotos, símbolo ni paleta — ya están resueltos.
4. Guardar como HTML standalone, igual que las veces anteriores.
