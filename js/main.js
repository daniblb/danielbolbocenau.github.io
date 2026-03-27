// Jahr automatisch
document.getElementById("year").textContent = new Date().getFullYear();

// Typing Effekt
const el = document.getElementById("typing");
const words = ["Fachinformatiker", "Web Developer", "IT"];
let i = 0;
let j = 0;
let deleting = false;

function type() {
  let word = words[i];

  if (deleting) {
    el.textContent = word.substring(0, j--);
  } else {
    el.textContent = word.substring(0, j++);
  }

  if (!deleting && j === word.length) {
    deleting = true;
    setTimeout(type, 1200);
    return;
  }

  if (deleting && j === 0) {
    deleting = false;
    i = (i + 1) % words.length;
  }

  setTimeout(type, deleting ? 50 : 90);
}

type();