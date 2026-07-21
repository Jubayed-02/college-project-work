/* ── Cursor ── */
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  /* ── Sparkle trail ── */
  let sparkleCount = 0;
  document.addEventListener('mousemove', e => {
    sparkleCount++;
    if (sparkleCount % 4 !== 0) return;
    const s = document.createElement('div');
    s.className = 'sparkle';
    const tx = (Math.random() - 0.5) * 40;
    const ty = (Math.random() - 0.5) * 40;
    s.style.left = e.clientX + 'px';
    s.style.top = e.clientY + 'px';
    s.style.setProperty('--tx', tx + 'px');
    s.style.setProperty('--ty', ty + 'px');
    s.style.background = Math.random() > 0.5 ? 'var(--accent)' : 'var(--accent2)';
    s.style.width = s.style.height = (Math.random() * 5 + 3) + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  });

  /* ── Stars ── */
  const starsEl = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%; top:${Math.random()*100}%;
      --d:${Math.random()*4+2}s;
      --delay:-${Math.random()*5}s;
      --op:${Math.random()*0.5+0.2};
    `;
    starsEl.appendChild(s);
  }

  /* ── Scroll Reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  /* ── Cursor hover states ── */
  document.querySelectorAll('a, button, .work-card, .chip, .social-pill').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      ring.style.opacity = '0.2';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.opacity = '0.5';
    });
  });

  /* ── Staggered card reveals ── */
  document.querySelectorAll('.work-grid .reveal, .services-grid .reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
  });