"use strict";

import Grid from "./gridModel.js";

window.addEventListener("load", start);

const grid = new Grid(15, 15);
let isStarted = false;
let intervalId;

function start() {
  console.log("Controller script running...");
  grid.set({ row: 7, col: 7 }, 1);
  grid.set({ row: 7, col: 8 }, 1);
  grid.set({ row: 7, col: 6 }, 1);
  grid.dump();
  eventListeners();
  updateDisplayGrid();
}

function eventListeners() {
  document.getElementById("start-btn").addEventListener("click", startClick);
  document.getElementById("stop-btn").addEventListener("click", stopClick);
  document.getElementById("clear-btn").addEventListener("click", clearClick);
  document.getElementById("random-btn").addEventListener("click", randomClick);
}

function newGeneration() {
  for (let row = 0; row < grid.getRows(); row++) {
    for (let col = 0; col < grid.getCols(); col++) {
      const cell = { row: row, col: col };
      if (isCellAlive(cell)) {
        grid.set(cell, 1);
      } else {
        grid.set(cell, 0);
      }
    }
  }
}

function activateGame() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(() => {
    if (isStarted) {
      newGeneration();
      updateDisplayGrid();
    }
  }, 500);
}

function startClick() {
  console.log("Start clicked");
  isStarted = true;
  activateGame();
  updateDisplayGrid();
}
function stopClick() {
  console.log("Stop clicked");
  isStarted = false;
  updateDisplayGrid();
}
function clearClick() {
  console.log("Clear clicked");
  grid.fill(0);
  updateDisplayGrid();
}
function randomClick() {
  console.log("Random clicked");
  while (true) {
    const randomI = Math.floor(Math.random() * grid.size());
    const rowCol = grid.rowColFor(randomI);
    if (grid.get(rowCol) === 0) {
      grid.set(rowCol, 1);
      updateDisplayGrid();
      return;
    }
  }
}

function noOfNeighbours(cell) {
  const values = grid.neighbourValues(cell);
  let alive = [];
  for (const value of values) {
    if (value === 1) {
      alive.push(value);
    }
  }
  console.log(alive);
  return alive.length;
}

function isCellAlive(cell) {
  const alive = noOfNeighbours(cell);
  return alive >= 2 && alive <= 3;
}

function updateDisplayGrid() {
  const gridDisplay = document.getElementById("grid-display");
  let gridString = "";

  for (let row = 0; row < grid.getRows(); row++) {
    for (let col = 0; col < grid.getCols(); col++) {
      gridString += grid.get({ row: row, col: col }) === 1 ? "1 " : "0 ";
    }
    gridString += "\n";
  }

  gridDisplay.textContent = gridString;
}
