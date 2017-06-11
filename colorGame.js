var numSquares = 6
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;

var message = document.querySelector("#message");
var h1 = document.querySelector("h1");

var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// begin the game
init();


function init() {
    // mode button add event listener
    // Setup the mode buttons;
    setupModeButtons();
    setupSquares();  // add color to squares, check pick color, try again.
    reset();
}

function setupModeButtons(){
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            numSquares = (this.textContent === "Easy") ? 3 : 6;
            reset();
        });
    }
}


resetButton.addEventListener("click", function () {
    reset();
});

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) { //  add initial colors to squares
            squares[i].style.background = colors[i];
            squares[i].style.display = "block"; // display the last 3 blocks, 
            //hard mode
        } else {
            squares[i].style.background = "none";
        } // hide the last 3 blocks, easy mode
    }

    h1.style.backgroundColor = "steelblue";
    message.textContent = "";
    resetButton.textContent = "New Colors"
}

function setupSquares(){
     for (var i = 0; i < squares.length; i++) {
        //    add lick listeners to squares
        squares[i].addEventListener("click", function () {
            //      grab color of clicked squares
            var clickedColor = this.style.backgroundColor;

            //      compare color to pickedColor
            if (clickedColor === pickedColor) {
                message.textContent = "Correct!!!";
                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "#232323";
                message.textContent = "Try Again";
            }
        });
    }
}


function changeColors(color) {
    //loop through all squares
    // change each color to match given color
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    var arr = []

    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    // pick red, green, and blue from 0 - 255
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}
