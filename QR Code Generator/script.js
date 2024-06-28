const text = document.querySelector("#text");
const button = document.querySelector("#btn");
const placeholder = document.querySelector("#placeholder");

function generateQRCode() {
  if (text.value != "") {
    placeholder.innerHTML = "";
    let img = document.createElement("img");
    img.src = `https://quickchart.io/qr?text=${text.value}`;
    img.width = 200;
    img.height = 200;
    placeholder.appendChild(img);
    text.value = "";
  } else {
    alert("Error!");
  }
}

button.addEventListener("click", generateQRCode);
