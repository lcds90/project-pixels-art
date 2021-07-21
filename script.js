const board = document.querySelector('#pixel-board');
const btnGenerateBoard = document.querySelector('#generate-board');
const btnClearBoard = document.querySelector('#clear-board');
const colors = document.querySelectorAll('.color');

function generateRandomColor() {
  // LINK https://stackoverflow.com/a/23095771
  const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  return `rgb(${r},${g},${b})`;
}

function generateColors() {
  const optionOne = document.querySelector('#optionOne');
  const optionTwo = document.querySelector('#optionTwo');
  const optionThree = document.querySelector('#optionThree');
  const optionFour = document.querySelector('#optionFour');

  optionOne.style.backgroundColor = 'rgb(0, 0, 0)';
  optionOne.classList.add('selected');
  optionTwo.style.backgroundColor = generateRandomColor();
  optionThree.style.backgroundColor = generateRandomColor();
  optionFour.style.backgroundColor = generateRandomColor();
}

function resetStyleBoard() {
  board.innerHTML = '';
}

function setStyleforBoard(input) {
  board.style.gridTemplateColumns = `repeat(${input}, 40px)`;
  board.style.gridTemplateRows = `repeat(${input}, 40px)`;
}

function checkValuesFromInput(input) {
  let number = input.value;
  if (number < 5) number = 5;
  if (number > 50) number = 50;
  return number;
}

function changeColorWhenClicked(event) {
  const findSelectedClass = document.querySelector('.selected');
  const getColorFromClass = findSelectedClass.getAttribute('style').split(':')[1];
  const color = getColorFromClass.substring(1, getColorFromClass.length - 1);
  const div = event.target;
  div.style.backgroundColor = color;
}

function generatePixelRectangle(input) {
  for (let index = 0; index < input * input; index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.addEventListener('click', changeColorWhenClicked);
    board.appendChild(pixel);
  }
}

function generatePixels(isFirstTime = true) {
  if (isFirstTime !== true) {
    const number = checkValuesFromInput(document.querySelector('#board-size'));
    resetStyleBoard();
    generatePixelRectangle(number);
    setStyleforBoard(number);
  } else {
    resetStyleBoard();
    generatePixelRectangle(5);
    setStyleforBoard(5);
  }
}

function setSelectedClass(event) {
  const palleteColors = event.target.parentElement.children;
  for (let index = 0; index < palleteColors.length; index += 1) {
    palleteColors[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function setSelectedColorFunctionInPixel() {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', changeColorWhenClicked);
  }
}

function clearBoardAndFillPixelsWithWhite() {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'rgb(255, 255, 255)';
  }
}

function checkInputAndThenGeneratePixels() {
  const checkInput = document.querySelector('#board-size');

  if (checkInput.value === '') {
    alert('Board inválido!');
  } else {
    generatePixels(false);
  }
}

window.onload = () => {
  generateColors();
  generatePixels();

  btnGenerateBoard.addEventListener('click', () => {
    checkInputAndThenGeneratePixels();
  });

  btnClearBoard.addEventListener('click', () => {
    clearBoardAndFillPixelsWithWhite();
  });

  colors.forEach((color) => {
    color.addEventListener('click', setSelectedClass);
  });

  setSelectedColorFunctionInPixel();
};
