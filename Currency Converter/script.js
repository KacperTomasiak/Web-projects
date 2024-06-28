const selectFrom = document.querySelector("#currency-select-from");
const selectTo = document.querySelector("#currency-select-to");
const currencyFrom = document.querySelector("#currency-from");
const currencyTo = document.querySelector("#currency-to");
const disclaimer = document.querySelector("#disclaimer");
const arrows = document.querySelector(".fa-arrows-rotate");
const notification = document.getElementById("notification");
let dataLength = 0;

async function getAndChangeCurrenciesOnLoad(next) {
  const host = "api.frankfurter.app";
  let query = await fetch(`https://${host}/currencies`);
  let res = await query.json();
  let arr = [];
  for (let key in res) {
    arr.push(key);
  }
  for (let i in arr) {
    let option = document.createElement("option");
    option.innerHTML = arr[i];
    selectFrom.appendChild(option);
  }
  for (let i in arr) {
    let option = document.createElement("option");
    option.innerHTML = arr[i];
    selectTo.appendChild(option);
  }
  dataLength = arr.length;
  selectFrom.value = "USD";
  selectTo.value = "EUR";
  next();
}

function checkAndFixErrors() {
  if (selectFrom.value == selectTo.value) {
    if (selectTo.selectedIndex == dataLength - 1) {
      selectTo.selectedIndex = 0;
    } else {
      selectTo.selectedIndex += 1;
    }
    notification.classList.add("transition");
    notification.innerHTML = "Currencies have to be different!";
    setTimeout(() => {
      notification.classList.remove("transition");
    }, 3500);
  }
  if (currencyTo.value == "" || currencyTo.value == 0) {
    notification.classList.add("transition");
    notification.innerHTML = "Value has to be a number greater than zero!";
    setTimeout(() => {
      notification.classList.remove("transition");
    }, 3500);
    currencyTo.value = "100";
  }
  if (currencyFrom.value == "" || currencyFrom.value == 0) {
    notification.classList.add("transition");
    notification.innerHTML = "Value has to be a number greater than zero!";
    setTimeout(() => {
      notification.classList.remove("transition");
    }, 3500);
    currencyFrom.value = "100";
  }
}

async function convertFirstCurrency() {
  const host = "api.frankfurter.app";
  let res = await fetch(
    `https://${host}/latest?amount=${currencyFrom.value}&from=${selectFrom.value}&to=${selectTo.value}`
  );
  let data = await res.json();
  currencyTo.value = eval("data.rates." + selectTo.value).toFixed(2);
}

async function convertSecondCurrency() {
  const host = "api.frankfurter.app";
  let res = await fetch(
    `https://${host}/latest?amount=${currencyTo.value}&from=${selectTo.value}&to=${selectFrom.value}`
  );
  let data = await res.json();
  currencyFrom.value = eval("data.rates." + selectFrom.value).toFixed(2);
}

function getCurrentRate() {
  disclaimer.textContent = `Rate: 1 ${selectFrom.value} ~ ${(
    currencyTo.value / currencyFrom.value
  ).toFixed(2)} ${selectTo.value}`;
}

function changeCurrencies() {
  let currency = selectFrom.value;
  selectFrom.value = selectTo.value;
  selectTo.value = currency;
}

setInterval(() => {
  getCurrentRate();
}, 200);

document.addEventListener("DOMContentLoaded", () => {
  getAndChangeCurrenciesOnLoad(convertFirstCurrency);
});
currencyFrom.addEventListener("input", () => {
  checkAndFixErrors();
  convertFirstCurrency();
});
currencyTo.addEventListener("input", () => {
  checkAndFixErrors();
  convertSecondCurrency();
});
arrows.addEventListener("click", () => {
  changeCurrencies();
  checkAndFixErrors();
  convertFirstCurrency();
});
selectFrom.addEventListener("change", () => {
  checkAndFixErrors();
  convertFirstCurrency();
});
selectTo.addEventListener("change", () => {
  checkAndFixErrors();
  convertFirstCurrency();
});
