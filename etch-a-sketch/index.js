const grids = document.querySelector(".container");

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(color, percent) {
  const rgb = color.match(/\d+/g).map(Number);
  const darkened = rgb.map((value) => Math.floor(value * (1 - percent / 100)));
  return `rgb(${darkened.join(", ")})`;
}

function generateGrid(size) {
  grids.innerHTML = "";
  const squareSize = 960 / size;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-item");
    square.style.flexBasis = `calc(100% / ${size})`;
    square.dataset.interactions = "0";

    square.addEventListener("mouseover", (e) => {
      const interactions = parseInt(e.target.dataset.interactions) || 0;
      if (interactions < 10) {
        const baseColor = getRandomColor();
        const darkenAmount = (interactions + 1) * 10;
        e.target.style.backgroundColor = darkenColor(baseColor, darkenAmount);
        e.target.dataset.interactions = interactions + 1;
      }
    });

    grids.appendChild(square);
  }
}

generateGrid(16); //generates default grid
const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  let numOfSquares = prompt(
    "Enter the number of squares per side for the new Sketch Pad"
  );
  numOfSquares = parseInt(numOfSquares);
  if (isNaN(numOfSquares)) {
    alert("Please enter a number!");
  } else if (numOfSquares > 100 || numOfSquares < 1) {
    alert("Choose between 1 and 100");
  } else {
    generateGrid(numOfSquares);
  }
});
