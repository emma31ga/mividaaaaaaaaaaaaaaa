const garden = document.querySelector('#garden');
const fireflies = document.querySelector('.fireflies');
const bloomButton = document.querySelector('#bloomButton');

const palettes = [
  ['#f38bb0', '#db5e8b'], ['#f7b8d0', '#ef86b1'], ['#c9a5e8', '#a779ca'],
  ['#fff1b5', '#f3bd68'], ['#ffd0a7', '#f29a83'], ['#eaa9cf', '#ce6ea9']
];

function makeFlower(i) {
  const flower = document.createElement('div');
  const [light, dark] = palettes[i % palettes.length];
  flower.className = `flower ${['rose', 'daisy', 'peony'][i % 3]}`;
  flower.style.setProperty('--x', `${1 + ((i * 37) % 99)}%`);
  flower.style.setProperty('--scale', `${0.38 + ((i * 29) % 82) / 100}`);
  flower.style.setProperty('--base', `${(i * 17) % 38}px`);
  flower.style.setProperty('--lean', `${-12 + ((i * 23) % 25)}deg`);
  flower.style.setProperty('--sway', `${3.5 + (i % 4)}s`);
  flower.style.setProperty('--delay', `${-((i * 1.7) % 5)}s`);
  flower.innerHTML = `<div class="stem"></div><div class="leaf left"></div><div class="leaf right"></div><div class="blossom" style="--petal:${light}"><i class="petal"></i><i class="petal"></i><i class="petal"></i><i class="petal"></i><i class="petal"></i><b class="center" style="background:${dark}"></b></div>`;
  garden.appendChild(flower);
}

// Un pequeño bosque de flores: las traseras son más suaves y las delanteras más grandes.
for (let i = 0; i < 96; i++) makeFlower(i);

for (let i = 0; i < 18; i++) {
  const dot = document.createElement('i');
  dot.className = 'firefly';
  dot.style.left = `${8 + (i * 19) % 88}%`;
  dot.style.top = `${42 + (i * 13) % 46}%`;
  dot.style.setProperty('--time', `${2.5 + (i % 5) * .7}s`);
  dot.style.setProperty('--dx', `${-18 + (i * 7) % 38}px`);
  dot.style.setProperty('--dy', `${-22 + (i * 11) % 35}px`);
  fireflies.appendChild(dot);
}

// Preparamos la lluvia al cargar: al tocar el botón solo se reinicia una clase.
const rain = document.createElement('div');
rain.className = 'flower-rain';
const symbols = ['🌸', '🌷', '✿', '❀', '🌼', '♡'];
const fragment = document.createDocumentFragment();
for (let i = 0; i < 84; i++) {
  const petal = document.createElement('span');
  petal.className = 'rain-petal';
  petal.textContent = symbols[i % symbols.length];
  petal.style.setProperty('--start-x', `${8 + Math.random() * 84}%`);
  petal.style.setProperty('--drift', `${-180 + Math.random() * 360}px`);
  petal.style.setProperty('--fall', `${180 + Math.random() * 290}px`);
  petal.style.setProperty('--spin', `${-360 + Math.random() * 720}deg`);
  petal.style.setProperty('--size', `${.72 + Math.random() * .85}`);
  petal.style.setProperty('--delay', `${(i % 21) * .035}s`);
  fragment.appendChild(petal);
}
rain.appendChild(fragment);
document.body.appendChild(rain);

function burstFlowers() {
  // Un solo contenedor y animaciones CSS: respuesta inmediata incluso en móviles.
  rain.classList.remove('active');
  void rain.offsetWidth;
  rain.classList.add('active');
  bloomButton.querySelector('span').textContent = 'Mira cómo florece ✨';
  window.clearTimeout(window.flowerRainTimer);
  window.flowerRainTimer = window.setTimeout(() => {
    rain.classList.remove('active');
    bloomButton.querySelector('span').textContent = 'Haz florecer el jardín';
  }, 5200);
}

bloomButton.addEventListener('pointerdown', burstFlowers, { passive: true });
bloomButton.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') burstFlowers();
});
