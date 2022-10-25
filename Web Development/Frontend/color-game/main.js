var numSquares = 6;
var colors = [];
var pickedColor;
var messageDisplay = document.getElementById("checker");
var colorDisplay = document.getElementById("color");
var square = document.querySelectorAll(".square");
var header = document.getElementById("header");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButton();
  setupSquares();
  reset();
}

function setupModeButton() {
  // mode buttons event listeners
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
      reset();
    });
  }
}

function setupSquares() {
  for (let i = 0; i < square.length; i++) {
    // add click listerners to squares
    square[i].addEventListener("click", function () {
      // grab color of clicked square
      var clickedColor = square[i].style.backgroundColor;
      // compare color to picked color (logic)
      if (pickedColor === clickedColor) {
        messageDisplay.textContent = "correct!!!";
        resetButton.textContent = "Play again?";
        header.style.backgroundColor = pickedColor;
        changeColor(clickedColor);
      } else {
        messageDisplay.textContent = "try again!!";
        this.style.backgroundColor = "rgb(35, 35, 35)";
      }
    });
  }
}

function reset() {
  // generate all new colors
  colors = generaterRandomColors(numSquares);
  // pick a new random color from array
  pickedColor = pickColor();
  // change colors of squares
  for (let i = 0; i < square.length; i++) {
    if (colors[i]) {
      square[i].style.display = "block";
      square[i].style.backgroundColor = colors[i];
    } else {
      square[i].style.display = "none";
    }
  }
  // change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New colors";
  // change the backgrd color of the header
  header.style.backgroundColor = "steelblue";
  // clear massage displayed when user try again
  messageDisplay.textContent = "";
}

resetButton.addEventListener("click", function () {
  reset();
});

function changeColor(color) {
  // loop through all square
  for (let i = 0; i < square.length; i++) {
    // change each squares to matchch given color
    square[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generaterRandomColors(num) {
  // create a new array
  var arr = [];
  // loop through the generate color;
  for (var i = 0; i < num; i++) {
    // randomcolor
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  var r = Math.floor(Math.random() * 256);

  var g = Math.floor(Math.random() * 256);

  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}