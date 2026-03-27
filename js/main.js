// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => preloader.style.display = 'none', 600);
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active'); // optional für Animation
});

// Rest deines bisherigen main.js (Cursor, Typing, Reveal, etc.) bleibt gleich.
// Füge am Ende nur noch folgendes hinzu, falls du die Hamburger-Animation verbessern willst:

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});