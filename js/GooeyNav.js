// import './GooeyNav.css'; // CSS is now loaded via <link> in HTML

export function renderGooeyNav(options) {
  console.log('[GooeyNav] renderGooeyNav called with options:', options);
  const {
    container,
    items = [],
    animationTime = 600,
    particleCount = 15,
    particleDistances = [90, 10],
    particleR = 100,
    timeVariance = 300,
    colors = [1, 2, 3, 1, 2, 3, 1, 4],
    initialActiveIndex = 0,
    onNav = null
  } = options;
  if (!container) {
    console.error('[GooeyNav] No container provided!');
    return;
  }
  console.log('[GooeyNav] Items:', items);
  let activeIndex = initialActiveIndex;
  const containerDiv = document.createElement('div');
  containerDiv.className = 'gooey-nav-container custom-nav-theme';
  container.appendChild(containerDiv);

  const nav = document.createElement('nav');
  nav.style.display = 'flex';
  nav.style.justifyContent = 'center';
  nav.style.alignItems = 'center';
  nav.style.fontFamily = 'Orbitron, sans-serif';
  nav.style.fontWeight = '700';
  nav.style.fontSize = '1.1rem';
  nav.style.background = 'none';
  nav.style.boxShadow = 'none';
  nav.style.margin = '0 auto';
  nav.style.width = '100%';
  const ul = document.createElement('ul');
  ul.style.display = 'flex';
  ul.style.gap = '2.5rem';
  ul.style.listStyle = 'none';
  ul.style.padding = '0';
  ul.style.margin = '0';
  ul.style.justifyContent = 'center';
  ul.style.alignItems = 'center';
  nav.appendChild(ul);
  containerDiv.appendChild(nav);

  const filter = document.createElement('span');
  filter.className = 'effect filter';
  containerDiv.appendChild(filter);
  const text = document.createElement('span');
  text.className = 'effect text';
  containerDiv.appendChild(text);

  function noise(n = 1) { return n / 2 - Math.random() * n; }
  function getXY(distance, pointIndex, totalPoints) {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  }
  function createParticle(i, t, d, r) {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  }
  function makeParticles(element) {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try { element.removeChild(particle); } catch {}
        }, t);
      }, 30);
    }
  }
  function updateEffectPosition(element) {
    const containerRect = containerDiv.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filter.style, styles);
    Object.assign(text.style, styles);
    text.innerText = element.innerText;
  }
  function playDecryptAnimationIfHome(label, cb) {
    if (label === 'Home') {
      const title = document.querySelector('.hero-title');
      const subtitle = document.querySelector('.hero-subtitle');
      if (title && window.animateDecryptedText) {
        title.style.transform = 'scale(0.75)';
        subtitle.style.transform = 'scale(0.75)';
        window.animateDecryptedText(title, 'Electronics & Robotics Club', {
          speed: 20,
          maxIterations: 10,
          onComplete: () => {
            if (subtitle && window.animateDecryptedText) {
              window.animateDecryptedText(subtitle, 'BITS Pilani K K Birla Goa Campus', {
                speed: 20,
                maxIterations: 10,
                onComplete: () => {
                  title.style.transform = '';
                  subtitle.style.transform = '';
                  cb && cb();
                }
              });
            } else {
              title.style.transform = '';
              subtitle.style.transform = '';
              cb && cb();
            }
          }
        });
        return;
      }
    }
    cb && cb();
  }
  function handleClick(e, index) {
    e.preventDefault();
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    activeIndex = index;
    updateEffectPosition(liEl);
    if (filter) {
      const particles = filter.querySelectorAll('.particle');
      particles.forEach((p) => filter.removeChild(p));
    }
    if (text) {
      text.classList.remove('active');
      void text.offsetWidth;
      text.classList.add('active');
    }
    if (filter) {
      makeParticles(filter);
    }
    if (onNav) onNav(index, items[index]);
    // Animation then navigation
    let label = items[index].label;
    let hash = items[index].href;
    if (label === 'Projects') hash = '#current-projects';
    if (label === 'About') hash = '#about-our-story';
    playDecryptAnimationIfHome(label, () => {
      if (hash && hash.startsWith('#')) {
        setTimeout(() => {
          window.location.hash = hash;
        }, 10);
      } else if (items[index].href) {
        window.open(items[index].href, items[index].target || '_self');
      }
    });
    console.log(`[GooeyNav] Nav item clicked: index=${index}, label=${items[index]?.label}`);
  }
  function handleKeyDown(e, index) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) handleClick({ currentTarget: liEl }, index);
    }
  }
  function handleHover(index) {
    const label = items[index].label;
    if (label === 'Home') {
      const title = document.querySelector('.hero-title');
      const subtitle = document.querySelector('.hero-subtitle');
      if (title && window.animateDecryptedText) {
        title.style.transform = 'scale(0.75)';
        subtitle.style.transform = 'scale(0.75)';
        window.animateDecryptedText(title, 'Electronics & Robotics Club', {
          speed: 20,
          maxIterations: 10,
          onComplete: () => {
            if (subtitle && window.animateDecryptedText) {
              window.animateDecryptedText(subtitle, 'BITS Pilani K K Birla Goa Campus', {
                speed: 20,
                maxIterations: 10,
                onComplete: () => {
                  title.style.transform = '';
                  subtitle.style.transform = '';
                }
              });
            } else {
              title.style.transform = '';
              subtitle.style.transform = '';
            }
          }
        });
      }
    }
  }
  console.log('[GooeyNav] Rendering nav items...');
  items.forEach((item, index) => {
    const li = document.createElement('li');
    if (activeIndex === index) li.classList.add('active');
    li.tabIndex = 0;
    li.addEventListener('click', (e) => handleClick(e, index));
    li.addEventListener('mouseenter', () => handleHover(index));
    const a = document.createElement('a');
    a.href = item.href;
    a.innerText = item.label;
    a.style.textDecoration = 'none';
    a.style.color = 'var(--text-primary, #fff)';
    a.style.fontFamily = 'Orbitron, sans-serif';
    a.style.fontWeight = '700';
    a.style.fontSize = '1.1rem';
    a.addEventListener('keydown', (e) => handleKeyDown(e, index));
    li.appendChild(a);
    // Dropdowns
    if (item.label === 'Projects') {
      const dropdown = document.createElement('div');
      dropdown.className = 'nav-dropdown';
      dropdown.innerHTML = `
        <a href="#current-projects">Current Projects</a>
        <a href="#completed-projects">Completed Projects</a>
        <a href="#mini-projects">Mini Projects</a>
      `;
      dropdown.style.display = 'none';
      li.appendChild(dropdown);
      li.addEventListener('mouseenter', () => { dropdown.style.display = 'block'; });
      li.addEventListener('mouseleave', () => { dropdown.style.display = 'none'; });
    }
    if (item.label === 'About') {
      const dropdown = document.createElement('div');
      dropdown.className = 'nav-dropdown';
      dropdown.innerHTML = `
        <a href="#about-our-story">Our Story</a>
        <a href="#about-current-team">Current Team</a>
        <a href="#about-alumni">Alumni</a>
        <a href="#about-outreach">Outreach & Impact</a>
        <a href="#about-contact">Contact</a>
      `;
      dropdown.style.display = 'none';
      li.appendChild(dropdown);
      li.addEventListener('mouseenter', () => { dropdown.style.display = 'block'; });
      li.addEventListener('mouseleave', () => { dropdown.style.display = 'none'; });
    }
    ul.appendChild(li);
    console.log(`[GooeyNav] Added nav item: ${item.label} (${item.href})`);
  });
  // Initial effect
  setTimeout(() => {
    const activeLi = ul.querySelectorAll('li')[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      text.classList.add('active');
      console.log('[GooeyNav] Initial effect position set for active nav item.');
    }
  }, 100);
  // Responsive update
  window.addEventListener('resize', () => {
    const activeLi = ul.querySelectorAll('li')[activeIndex];
    if (activeLi) updateEffectPosition(activeLi);
    console.log('[GooeyNav] Window resized, effect position updated.');
  });
  return containerDiv;
} 