const startButton = document.querySelector('#start');
const editButton = document.querySelector('#edit');
const timeUnits = document.querySelectorAll('.time-units');
const logo = document.querySelector('#logo');
const daysRemaining = document.querySelector('#days');
const hoursRemaining = document.querySelector('#hours');
const minutesRemaining = document.querySelector('#minutes');
const secondsRemaining = document.querySelector('#seconds');
let timeout;

const editTime = () => {
  clearTimeout(timeout);
  startButton.disabled = false;
  for (let i = 0; i < timeUnits.length; i++) {
    timeUnits[i].readOnly = false;
    timeUnits[i].value = '';
    timeUnits[i].placeholder = '00';
  }
}

const getAndUpdateTime = () => {
  startButton.disabled = true;
  for (let i = 0; i < timeUnits.length; i++) {
    timeUnits[i].readOnly = true;
  }

  let time = parseInt(daysRemaining.value * 24 * 60 * 60 * 1000) +
    parseInt(hoursRemaining.value * 60 * 60 * 1000) +
    parseInt(minutesRemaining.value * 60 * 1000) +
    parseInt(secondsRemaining.value * 1000);
  time--;

  let days = Math.floor(time / (1000 * 60 * 60 * 24));
  let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);

  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (days < 10) {
    days = '0' + days;
  }

  daysRemaining.value = days;
  hoursRemaining.value = hours;
  minutesRemaining.value = minutes;
  secondsRemaining.value = seconds;

  timeout = setTimeout(getAndUpdateTime, 1000);

  if (time < 1000) {
    editTime();
  }
}

editButton.addEventListener('click', editTime);
startButton.addEventListener('click', getAndUpdateTime);
logo.addEventListener('click', () => {
  window.location.reload();
});