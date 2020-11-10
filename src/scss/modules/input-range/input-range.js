import multirange from "../../../js/multiRange";

if (document.querySelector("#product")) {
  let inputRange = document.querySelector(".input-range"); //input, price
  let priceElem = document.querySelector(".rectangle__price");
  multirange(inputRange, priceElem, "5000");
}
