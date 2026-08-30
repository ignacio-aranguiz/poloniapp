// poloniapp — panel admin (Fase 3a: login + contenido fijo)

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../assets/js/config.js';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginView = document.getElementById('login-view');
const adminView = document.getElementById('admin-view');
const loginError = document.getElementById('login-error');

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
document.getElementById('login-btn').addEventListener('click', async () => {
  loginError.hidden = true;
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    loginError.textContent = error.message === 'Invalid login credentials' ? 'Email o contraseña incorrectos.' : error.message;
    loginError.hidden = false;
  }
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  await sb.auth.signOut();
});

sb.auth.onAuthStateChange((_event, session) => {
  if (session) {
    showAdmin(session);
  } else {
    loginView.hidden = false;
    adminView.hidden = true;
  }
});

async function showAdmin(session) {
  // Confirma que el usuario logueado está en la allowlist de admins (RLS igual lo bloquea
  // en escritura si no lo está, pero acá evitamos mostrarle el panel a alguien sin permiso).
  const { data: adminRow } = await sb.from('admins').select('email').eq('user_id', session.user.id).maybeSingle();
  if (!adminRow) {
    loginError.textContent = 'Tu cuenta no tiene permisos de administrador en poloniapp.';
    loginError.hidden = false;
    await sb.auth.signOut();
    return;
  }
  loginView.hidden = true;
  adminView.hidden = false;
  document.getElementById('who').textContent = session.user.email;
  loadTab('contenido');
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------
document.querySelectorAll('.admin-tabs button').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.disabled) return;
    document.querySelectorAll('.admin-tabs button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    loadTab(btn.dataset.tab);
  });
});

function loadTab(tab) {
  if (tab === 'contenido') return loadContenido();
  document.getElementById('tab-content').innerHTML = `<p class="coming-soon">Próximamente.</p>`;
}

// ---------------------------------------------------------------------------
// Tab: Contenido fijo
// ---------------------------------------------------------------------------
async function loadContenido() {
  const container = document.getElementById('tab-content');
  container.innerHTML = `<p class="loading-note">Cargando…</p>`;

  const { data, error } = await sb.from('site_content').select('*').order('section').order('key');
  if (error) {
    container.innerHTML = `<p class="loading-note">Error cargando contenido: ${esc(error.message)}</p>`;
    return;
  }

  const bySection = {};
  for (const row of data || []) {
    (bySection[row.section] ||= []).push(row);
  }

  container.innerHTML = Object.entries(bySection)
    .map(
      ([section, rows]) => `
      <section class="content-section">
        <h2>${esc(section)}</h2>
        ${rows
          .map(
            (r) => `
          <div class="field" data-key="${esc(r.key)}">
            <label>${esc(r.key)}</label>
            <textarea>${esc(r.value)}</textarea>
            <div class="save-row">
              <button class="save">Guardar</button>
              <span class="status"></span>
            </div>
          </div>`
          )
          .join('')}
      </section>`
    )
    .join('');

  container.querySelectorAll('.field').forEach((field) => {
    const key = field.dataset.key;
    const textarea = field.querySelector('textarea');
    const saveBtn = field.querySelector('.save');
    const status = field.querySelector('.status');
    const original = textarea.value;

    textarea.addEventListener('input', () => {
      status.textContent = '';
      saveBtn.disabled = textarea.value === original;
    });
    saveBtn.disabled = true;

    saveBtn.addEventListener('click', async () => {
      saveBtn.disabled = true;
      status.textContent = 'Guardando…';
      const {
        data: { user },
      } = await sb.auth.getUser();
      const { error } = await sb
        .from('site_content')
        .update({ value: textarea.value, updated_at: new Date().toISOString(), updated_by: user.id })
        .eq('key', key);
      if (error) {
        status.textContent = 'Error: ' + error.message;
        saveBtn.disabled = false;
      } else {
        status.textContent = 'Guardado ✓';
      }
    });
  });
}
