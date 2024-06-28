function displayTime() {
  let time = new Date();
  let hr = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let day = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();

  if (sec < 10) {
    sec = "0" + sec;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (hr < 10) {
    hr = "0" + hr;
  }

  document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec;
  document.getElementById("date").innerHTML = day + "/" + month + "/" + year;
}

document.addEventListener("DOMContentLoaded", displayTime);

setInterval(displayTime, 500);
