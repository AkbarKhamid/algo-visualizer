const speedSlider = document.querySelector("input[name='speed']");
const lengthSlider = document.querySelector("input[name='length']");
const formEl = document.querySelector("form.form-inline");
let values = [];
let w = 10;
let states = []; // pivot states for coloring
let speed = parseInt(speedSlider.value);
let length = parseInt(lengthSlider.value);
let sorting = Boolean();

speedSlider.addEventListener('input', function(){
    speed = parseInt(speedSlider.value);
});

lengthSlider.addEventListener('input', function(){
    length = parseInt(lengthSlider.value);
    generateNewArray(length);
});

formEl.addEventListener('submit', function(e){
    e.preventDefault();
    generateNewArray(length);
    quickSort(values, 0, values.length - 1);
});

function setup() {
    windowWidth = windowWidth / 1.2;
    windowHeight = windowHeight / 1.2;
    // dynamically set max attroibute on length slider
    lengthSlider.setAttribute('max', `${floor(windowWidth/w)}`);
    createCanvas(windowWidth, windowHeight);
    generateNewArray(length);

}

function generateNewArray(length){
    values = new Array(length);
    for (let i = 0; i < values.length; i++) {
      values[i] = random(height);
      // default state
      states[i] = -1;
    }
}

async function quickSort(arr, start, end) {
    // end of the array
  if (start >= end) {
    return;
  }
  // using Lamuto partitioning scheme
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]).then(() => console.log('Finished' + values.length) );
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

function draw() {
  background('#D3D3D3');

  for (let i = 0; i < values.length; i++) {
    noStroke();
    // it is pivot
    if (states[i] == 0) {
      fill('#E0777D');
    // in the partition
    } else if (states[i] == 1) {
      fill('#D6FFB7');
    } else {
      fill(255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }

}

async function swap(arr, a, b) {
  await sleep(500 / speed);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}