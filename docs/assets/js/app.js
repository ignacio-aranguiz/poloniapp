// poloniapp — app.js
// Fetch client-side a Supabase (anon key, RLS pública) + render de la Home.
// Fase 2a del plan: solo Home (header, hero, chips, grilla de actividades, posts, teaser "quiénes somos").
// La navegación real a Actividades / detalle / Quiénes somos llega en 2b-2c.

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Raíz real del sitio (docs/), calculada desde la ubicación de este script — así las rutas
// relativas de assets (fotos, símbolo) resuelven igual sin importar desde qué profundidad
// se cargó la página (raíz, /preview/, etc).
const ASSETS_BASE = new URL('../../', import.meta.url).href;
function assetUrl(relPath) {
  return relPath ? ASSETS_BASE + relPath : '';
}

const BUCKET_LABELS = {
  formacion: 'formación / espiritual',
  laboral: 'trabajo / laboral',
  familia: 'familia',
};

function fmtWhen(session) {
  if (!session) return '';
  if (session.weekday) {
    return `${session.weekday}${session.time_start ? ' · ' + session.time_start.slice(0, 5) : ''}`;
  }
  if (session.date) {
    const d = new Date(session.date + 'T00:00:00');
    const label = d.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' });
    return `${label}${session.time_start ? ' · ' + session.time_start.slice(0, 5) : ''}`;
  }
  return '';
}

function activityCard(a, category) {
  const session = a.sessions && a.sessions[0];
  const when = fmtWhen(session);
  const bucketLabel = category ? category.bucket : '';
  if (a.photo_url) {
    return `
      <a class="activity-card" style="background-image:url('${assetUrl(a.photo_url)}')" href="#">
        <div class="scrim"></div>
        <span class="tag">${bucketLabel}</span>
        <div class="info">
          <p class="title">${a.title}</p>
          <p class="when">${when}</p>
        </div>
      </a>`;
  }
  return `
    <a class="activity-card placeholder" href="#">
      <span class="tag">${bucketLabel}</span>
      <img src="${assetUrl('assets/poloniapp-symbol.svg')}" alt="">
      <div class="info">
        <p class="title">${a.title}</p>
        <p class="when">${when}</p>
      </div>
    </a>`;
}

function postCard(p) {
  return `
    <a class="post-card" href="${p.external_url}" target="_blank" rel="noopener">
      <div class="thumb" style="${p.image_url ? `background-image:url('${assetUrl(p.image_url)}')` : ''}"></div>
      <p class="title">${p.title}</p>
    </a>`;
}

async function loadHome() {
  const [{ data: content }, { data: categories }, { data: activities }, { data: posts }] = await Promise.all([
    sb.from('site_content').select('key,value'),
    sb.from('categories').select('*').eq('visible', true).order('sort_order'),
    sb
      .from('activities')
      .select('*, sessions(*)')
      .eq('visible', true),
    sb.from('posts').select('*').eq('visible', true).order('published_at', { ascending: false }).limit(3),
  ]);

  const contentMap = Object.fromEntries((content || []).map((c) => [c.key, c.value]));
  const categoriesById = Object.fromEntries((categories || []).map((c) => [c.id, c]));

  document.getElementById('hero-title').textContent = contentMap['hero.title'] || '';
  document.getElementById('hero-subtitle').textContent = contentMap['hero.subtitle'] || '';
  document.getElementById('about-teaser-text').textContent = contentMap['quienes_somos.teaser'] || '';

  // Chips: buckets únicos presentes en las categorías visibles (orden: formacion, laboral, familia)
  const bucketOrder = ['formacion', 'laboral', 'familia'];
  const bucketsPresent = bucketOrder.filter((b) => (categories || []).some((c) => c.bucket === b));
  const chipsEl = document.getElementById('chips');
  chipsEl.innerHTML =
    `<button class="chip active" data-bucket="todas">todas</button>` +
    bucketsPresent.map((b) => `<button class="chip" data-bucket="${b}">${BUCKET_LABELS[b]}</button>`).join('');

  const subchipsEl = document.getElementById('subchips');

  function renderSubchips(bucket) {
    if (bucket === 'todas') {
      subchipsEl.innerHTML = '';
      return;
    }
    const cats = (categories || []).filter((c) => c.bucket === bucket);
    subchipsEl.innerHTML = cats
      .map((c) => `<button class="chip" data-category="${c.id}">${c.name}</button>`)
      .join('');
  }

  function renderActivities(filterCategoryId, filterBucket) {
    let list = activities || [];
    if (filterCategoryId) {
      list = list.filter((a) => a.category_id === filterCategoryId);
    } else if (filterBucket && filterBucket !== 'todas') {
      list = list.filter((a) => categoriesById[a.category_id]?.bucket === filterBucket);
    }
    // Actividades sin foto (Círculos) al final, igual que en producción hoy.
    list = [...list].sort((x, y) => (x.photo_url ? 0 : 1) - (y.photo_url ? 0 : 1));
    const gridEl = document.getElementById('activities-grid');
    gridEl.innerHTML = list
      .slice(0, 4)
      .map((a) => activityCard(a, categoriesById[a.category_id]))
      .join('');
  }

  // Default: prefiltrado en "formación / espiritual" (ver DECISIONS.md)
  const defaultBucket = bucketsPresent.includes('formacion') ? 'formacion' : 'todas';
  chipsEl.querySelector('.chip.active')?.classList.remove('active');
  chipsEl.querySelector(`[data-bucket="${defaultBucket}"]`)?.classList.add('active');
  renderSubchips(defaultBucket);
  renderActivities(null, defaultBucket);

  chipsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    chipsEl.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    const bucket = btn.dataset.bucket;
    renderSubchips(bucket);
    renderActivities(null, bucket);
  });

  subchipsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    subchipsEl.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    renderActivities(btn.dataset.category, null);
  });

  document.getElementById('posts-list').innerHTML = (posts || []).map(postCard).join('');
}

loadHome().catch((err) => {
  console.error('[poloniapp] error cargando Home:', err);
  document.querySelector('.app').insertAdjacentHTML(
    'afterbegin',
    `<p class="loading-note">No se pudo cargar el contenido. Intentá recargar la página.</p>`
  );
});
