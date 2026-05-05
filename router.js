// Simple client-side router for GitHub Pages
const app = document.getElementById('app');

async function loadRoute() {
  // Get path without leading slash, default to 'home'
  let path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  if (!path) path = 'home';

  // Prevent loading router files
  if (path.includes('.')) path = 'home';

  try {
    const res = await fetch(`/pages/${path}.html`, { cache: 'no-store' });
    if (!res.ok) throw new Error('not found');
    const html = await res.text();
    app.innerHTML = html;
    document.title = `aistore - ${path}`;
  } catch (e) {
    const res = await fetch('/pages/404.html');
    app.innerHTML = await res.text();
    document.title = 'aistore - not found';
  }
}

function navigate(e) {
  const link = e.target.closest('a[data-link]');
  if (!link) return;
  e.preventDefault();
  const href = link.getAttribute('href');
  history.pushState(null, '', href);
  loadRoute();
}

// Handle back/forward
window.addEventListener('popstate', loadRoute);
document.addEventListener('click', navigate);
document.addEventListener('DOMContentLoaded', loadRoute);
