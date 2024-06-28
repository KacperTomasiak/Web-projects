const generateBtn = document.querySelector("#generate-btn");
const copyBtn = document.querySelector("#copy-btn");
const lengthSlider = document.querySelector("#length");
const lengthValue = document.querySelector("#length-value");

function createPassword() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const characters = "!@#$%^&*()_+{}[]|:'<>?,.\"";
  const passwordLength = lengthSlider.value;
  const chars = letters + capitalLetters + numbers + characters;
  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    let char = Math.floor(Math.random() * chars.length);
    password += chars.substring(char, char + 1);
  }
  document.querySelector("#password").value = password;
}

function copyText() {
  let text = document.querySelector("#password");
  navigator.clipboard.writeText(text.value);
  let notification = document.querySelector("#notification");
  notification.classList.add("transition");
  setTimeout(() => {
    notification.classList.remove("transition");
  }, 3500);
}

document.addEventListener("DOMContentLoaded", () => {
  lengthValue.textContent = lengthSlider.value;
});
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});
generateBtn.addEventListener("click", createPassword);
copyBtn.addEventListener("click", copyText);
