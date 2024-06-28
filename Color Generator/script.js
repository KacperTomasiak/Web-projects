const currentColor = document.querySelector('#currentColor');
const text = document.querySelector('#text');

function generateColor() {
  let firstColor = Math.floor(Math.random() * 256);
  let secondColor = Math.floor(Math.random() * 256);
  let thirdColor = Math.floor(Math.random() * 256);
  let color = `rgb(${firstColor}, ${secondColor}, ${thirdColor})`;
  document.body.style.backgroundColor = color;
  currentColor.innerHTML = color;
  color = '';
}

function copyColor() {
  let color = currentColor.innerHTML;
  navigator.clipboard.writeText(color);
  text.innerHTML = 'Copied to clipboard!';
  setTimeout(() => {
    text.innerHTML = '';
  }, 1000);
}

currentColor.addEventListener('click', copyColor);

setInterval(() => {
  generateColor();
}, 1000);