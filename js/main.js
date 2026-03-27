/* main.js — Daniel Bolbocenau Portfolio */

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }
});

// Custom Cursor
const cur = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; 
  my = e.clientY;
  if (cur) {
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  }
});

(function animTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  if (trail) {
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
  }
  requestAnimationFrame(animTrail);
})();

document.querySelectorAll('a, button, .tag, .service-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Nav on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('solid', scrollY > 50);
}, { passive: true });

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = +e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('on'), delay);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.querySelectorAll('.stagger').forEach(parent => {
  [...parent.children].forEach((child, i) => {
    child.classList.add('reveal');
    child.dataset.delay = i * 100;
    io.observe(child);
  });
});

// Typing effect
const typingEl = document.getElementById('typing');
if (typingEl) {
  const words = ['Fachinformatiker', 'Web Developer', 'Software Engineer', 'Problem Solver'];
  let wi = 0, ci = 0, deleting = false;
  
  function type() {
    const word = words[wi];
    typingEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ++ci);
    
    if (!deleting && ci === word.length) {
      setTimeout(() => deleting = true, 1800);
    }
    if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  type();
}

// Magnetic button effect
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinksItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinksItems.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent-primary)' : '';
  });
}, { passive: true });

// Footer year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();