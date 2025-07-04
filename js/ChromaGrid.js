import './ChromaGrid.css';
import { gsap } from 'gsap';

export function renderChromaGrid({
  container,
  items = [],
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}) {
  const root = document.createElement('div');
  root.className = 'chroma-grid';
  root.style.setProperty('--r', `${radius}px`);
  root.style.setProperty('--cols', columns);
  root.style.setProperty('--rows', rows);
  root.style.width = '100%';
  root.style.height = '100%';
  container.appendChild(root);

  const fade = document.createElement('div');
  fade.className = 'chroma-fade';
  root.appendChild(fade);

  const overlay = document.createElement('div');
  overlay.className = 'chroma-overlay';
  root.appendChild(overlay);

  let pos = { x: 0, y: 0 };
  function setX(x) { root.style.setProperty('--x', `${x}px`); }
  function setY(y) { root.style.setProperty('--y', `${y}px`); }

  function moveTo(x, y) {
    gsap.to(pos, {
      x, y, duration: damping, ease,
      onUpdate: () => { setX(pos.x); setY(pos.y); },
      overwrite: true
    });
  }
  function handleMove(e) {
    const r = root.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fade, { opacity: 0, duration: 0.25, overwrite: true });
  }
  function handleLeave() {
    gsap.to(fade, { opacity: 1, duration: fadeOut, overwrite: true });
  }
  root.addEventListener('pointermove', handleMove);
  root.addEventListener('pointerleave', handleLeave);

  items.forEach((c, i) => {
    const card = document.createElement('article');
    card.className = 'chroma-card';
    card.style.setProperty('--card-border', c.borderColor || 'transparent');
    card.style.setProperty('--card-gradient', c.gradient);
    card.style.cursor = c.url ? 'pointer' : 'default';
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
    card.addEventListener('click', () => {
      if (c.url) window.open(c.url, '_blank', 'noopener,noreferrer');
    });
    const imgWrap = document.createElement('div');
    imgWrap.className = 'chroma-img-wrapper';
    const img = document.createElement('img');
    img.src = c.image;
    img.alt = c.title;
    img.loading = 'lazy';
    imgWrap.appendChild(img);
    card.appendChild(imgWrap);
    const footer = document.createElement('footer');
    footer.className = 'chroma-info';
    const name = document.createElement('h3');
    name.className = 'name';
    name.textContent = c.title;
    footer.appendChild(name);
    if (c.handle) {
      const handle = document.createElement('span');
      handle.className = 'handle';
      handle.textContent = c.handle;
      footer.appendChild(handle);
    }
    const role = document.createElement('p');
    role.className = 'role';
    role.textContent = c.subtitle;
    footer.appendChild(role);
    if (c.location) {
      const loc = document.createElement('span');
      loc.className = 'location';
      loc.textContent = c.location;
      footer.appendChild(loc);
    }
    card.appendChild(footer);
    root.appendChild(card);
  });
  // Center initial position
  setTimeout(() => {
    const { width, height } = root.getBoundingClientRect();
    pos = { x: width / 2, y: height / 2 };
    setX(pos.x); setY(pos.y);
  }, 100);
  return root;
} 