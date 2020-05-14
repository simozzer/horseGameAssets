let bTimerEnabled = false;
let animTimerId = 0;
let audioContext;
let lastFrameTimestamp = -1;
let playerNames = [];
let finishers = [];
let raceFinished = false;
let horseSources;
let mainCanvas, mainContext, backCanvas, backContext;
let pauseCycles = 0;

let canvasWidth, canvasHeight;
let scrollAdjust = 0;
const finishMarker = 2000;
let averageMovement = 0;
let horsesInRace = [];
let gameImages;

function RaceHorse(name) {
  this.name = name;
  this.left = 0;
  this.top = 0;
  this.frameIndexer = 0;
  this.finished = false;
  this.backgroundPositionX = 0;
  this.backgroundPositionY = 0;
  const speedAdjustment = (Math.random() * 6) / 10;
  this.speedFactor = 1 + speedAdjustment;
}

const drawHorsesOnCanvas = function () {
  horsesInRace.forEach((horse, index) => {
    const left = horse.left - scrollAdjust;
    const top = horse.top;
    backContext.drawImage(
      gameImages.horseImages[index % 12],
      horse.backgroundPositionX,
      horse.backgroundPositionY,
      150,
      100,
      left,
      top,
      150,
      100
    );
    backContext.fillStyle = horseColors[index % 12];
    backContext.font = "20px Sans";
    backContext.fillText(horse.name, 10, top + 30);
  });

  mainContext.drawImage(backCanvas, 0, 0);
};

const drawBackGround = function (ticksSinceLastFrame) {
  const grass = gameImages.taggedImages.grass;
  const grassTileWidth = parseInt(grass.width, 10) | 0;
  const grassTileHeight = parseInt(grass.height, 10) | 0;
  for (let x = 0; x < canvasWidth + grassTileWidth; x += grassTileWidth) {
    for (let y = 0; y < canvasHeight; y += grassTileHeight) {
      backContext.drawImage(grass, x - (scrollAdjust % grassTileWidth), y);
    }
  }
  backContext.fillStyle = "white";
  backContext.font = "20px arial";
  backContext.fillText(scrollAdjust, 10, 10);

  // draw start line
  let transformedOrigin;
  transformedOrigin = HORSE_NOSE - scrollAdjust;
  if (scrollAdjust <= HORSE_NOSE) {
    drawLineIfVisible(0, "white");
  }

  drawLineIfVisible(1000, "yellow");
  drawLineIfVisible(finishMarker, "black");
};

const drawLineIfVisible = (x, color, lable) => {
  let transformedOrigin = x + HORSE_NOSE - scrollAdjust;
  if (transformedOrigin > 0 && transformedOrigin < canvasWidth) {
    backContext.strokeStyle = color;
    backContext.beginPath();
    backContext.moveTo(transformedOrigin, 0);
    backContext.lineTo(transformedOrigin, canvasHeight);
    backContext.stroke();
  }
};

const doAdvanceHorseAnim = function (horse, timeSpanMs) {
  if (horse) {
    const framesPerSec = 18;
    const framesThisInterval = timeSpanMs * (12 / 1000);
    horse.frameIndexer += framesThisInterval;
    const frameIndex = horse.frameIndexer % 12 | 0;
    const xIndex = frameIndex % 3;
    const yIndex = frameIndex % 4;
    horse.backgroundPositionX = xIndex * 150;
    horse.backgroundPositionY = yIndex * 100;
  }
};

const addWinner = (horse) => {
  finishers.push(horse);
  if (finishers.length === playerNames.length) {
    raceFinished = true;
  }
};

const getMaxHorsePosition = () => {
  let max = 0;
  horsesInRace.forEach((horse) => {
    if (horse.left > max) {
      max = horse.left;
    }
  });
  return max;
};

const getMinHorsePosition = () => {
  let min = Infinity;
  horsesInRace.forEach((horse) => {
    if (horse.left < min) {
      min = horse.left;
    }
  });
  return min;
};

const getHorsesMidPosition = () => {
  const min = getMinHorsePosition();
  const max = getMaxHorsePosition();
  const range = max - min;
  return min + range / 2;
};

const moveHorses = (ticksSinceLastFrame) => {
  if (pauseCycles > 0) {
    pauseCycles--;
    return;
  }
  // number of pixels per sec we can move at maximum.
  const maxProgressPerSecMs = MAX_PROGRESS_PER_SECOND / 1000;
  const maxProgressThisFrame = maxProgressPerSecMs * ticksSinceLastFrame;

  let midBeforeMove = getHorsesMidPosition();
  let moveValues = [];
  horsesInRace.forEach((horse, index) => {
    doAdvanceHorseAnim(horse, ticksSinceLastFrame);
    let moveX = Math.random() * maxProgressThisFrame * horse.speedFactor;
    let left = horse.left + moveX;
    moveValues.push(moveX);
    horse.left = left;
  });

  let maxAfterMove = getMaxHorsePosition();
  if (maxAfterMove > scrollAdjust + canvasWidth - 350) {
    // 1st horse approaching right of screen.
    let adjust = Math.abs(canvasWidth - 350 - (maxAfterMove + scrollAdjust));
    console.log("adjust: " + adjust);
    scrollAdjust += maxProgressThisFrame;
  }
};

const checkHorsesFinished = () => {
  let winners = [];
  horsesInRace.forEach((horse) => {
    if (!horse.finished) {
      if (horse.left >= finishMarker) {
        winners.push(horse);
        horse.finished = true;
      }
    }
  });
  if (winners.length > 0) {
    if (winners.length === 1) {
      addWinner(winners[0]);
    } else {
      /* Multiple finished in this cycle) */
      winners.sort((a, b) => {
        if (a.left === b.left) {
          return 0;
        } else if (a.left < b.left) {
          return 1;
        } else {
          return -1;
        }
      });
      for (let j = 0; j < winners.length; j++) {
        addWinner(winners[j]);
      }
    }
    // pauseCycles = 40;
  }
};

const doOnAnimTimer = function (lTicks) {
  let ticksSinceLastFrame = 0;
  if (lastFrameTimestamp > 0) {
    ticksSinceLastFrame = lTicks - lastFrameTimestamp;
  } else {
    siPlaySound(5);
  }
  lastFrameTimestamp = lTicks;

  const clientWidth =
    parseInt(document.getElementById("raceArea").clientWidth, 10) | 0;

  moveHorses(ticksSinceLastFrame);

  drawBackGround();

  drawHorsesOnCanvas();

  checkHorsesFinished();

  if (!raceFinished && scrollAdjust < 2500) {
    window.requestAnimationFrame(doOnAnimTimer);
  }
};

function setupHorses() {
  return new Promise(function (resolve, reject) {
    horsesInRace = [];
    //playerNames = [];
    playerNames = JSON.parse(
      '["Paul Kirsty","Simon Corrinda","Kev Lisa","Mart","John","Chris Kat","Vikkie Mark","Claire Matt","Steve Diane","Aidan Monica","Ali"]'
    );
    /*
        while (true) {
          let name = window.prompt("Input a player name (or blank to finish)");
          if (name) {
            playerNames.push(name);
          } else {
            break;
          }
        }
        */

    document.getElementById("intro").style.display = "none";
    let vertInterval = (canvasHeight - 200) / playerNames.length;
    for (let i = 0; i < playerNames.length; i++) {
      const animIndex = (Math.random() * 12) | 0;
      let horse = new RaceHorse(playerNames[i]);
      horse.top = 50 + vertInterval * i;
      horsesInRace.push(horse);
    }

    resolve();
  });
}

const doToggleTimer = () => {
  if (bTimerEnabled) {
    window.cancelAnimationFrame(animTimerId);
    animTimerId = null;
    bTimerEnabled = false;
  } else {
    raceFinished = false;
    mainCanvas = document.getElementById("raceArea");
    mainCanvas.classList.remove("hiddenArea");
    canvasWidth = parseInt(mainCanvas.clientWidth, 10);
    canvasHeight = parseInt(mainCanvas.clientHeight, 10);
    mainCanvas.setAttribute("width", canvasWidth + "px");
    mainCanvas.setAttribute("height", canvasHeight + "px");
    mainContext = mainCanvas.getContext("2d");
    backCanvas = document.createElement("canvas");
    backCanvas.width = mainCanvas.width;
    backCanvas.height = mainCanvas.height;
    backContext = backCanvas.getContext("2d");

    gameImages = new ImageLoader();
    gameImages
      .loadImages()
      .then(() => {
        setupHorses().then(() => {
          pauseCycles = 60;
          animTimerId = window.requestAnimationFrame(doOnAnimTimer);
          bTimerEnabled = true;
        });
      })
      .catch((err) => {
        throw err;
      });

    let audioContext = new AudioContext({});

    //document.getElementById("gallopNoise").play();
  }
};
