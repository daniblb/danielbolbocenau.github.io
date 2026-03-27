// main.js — Daniel Bolbocenau Portfolio (modernisiert 2026)

const cur = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
  requestAnimationFrame(animTrail);
})();

// Hover-Effekte
document.querySelectorAll('a, button, .tag, .service-card, .btn-primary').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// Nav solid
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', scrollY > 50);
}, { passive: true });

// Hero Glow Mouse Follow
const heroGlow = document.querySelector('.hero-glow');
if (heroGlow) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth) * 35 - 17;
    const y = (e.clientY / window.innerHeight) * 35 - 17;
    heroGlow.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Scroll Reveal (verbessert)
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseFloat(entry.target.dataset.delay) || 0;
      setTimeout(() => {
        entry.target.classList.add('on');
      }, delay);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Stagger für Children
document.querySelectorAll('.stagger').forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.classList.add('reveal');
    child.dataset.delay = i * 80;
    io.observe(child);
  });
});

// Typing Effect (unverändert, aber gut)
const typingEl = document.getElementById('typing');
if (typingEl) {
  const words = ['Fachinformatiker', 'Web Developer', 'IT Consultant', 'Problem Solver'];
  let wi = 0, ci = 0, deleting = false;
  function type() {
    const word = words[wi];
    typingEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ++ci);
    if (!deleting && ci === word.length) setTimeout(() => deleting = true, 1800);
    if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    setTimeout(type, deleting ? 50 : 85);
  }
  type();
}

// Magnetic Buttons + Ripple (bereits im CSS)
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

// Active Nav Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent-primary)' : '';
  });
}, { passive: true });

// Footer Year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();