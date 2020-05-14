const HORSETYPES = {
  SHORT_RACE: 0,
  MEDIUM_RACE: 1,
  LONG_RACE: 2,
};

const HORSES_PER_PLAYER = 5;
const INITIAL_PLAYER_FUNDS = 250;

function AHorse(horseName,owner) {
    this.NAME = horseName;
    this._owner = owner;
    this.animIndexer = 0;
    const horseType = (Math.random() * 3) | 0;
    this.HORSE_TYPE = horseType;
    this.SPEED_FACTOR = 0;
    switch (this.HORSE_TYPE) {
      case HORSETYPES.SHORT_RACE:
        // energy falls after 3 - 6 furlongs
        this.ENERGY_FALL_DISTANCE =
            ((3 + Math.random() * 3) | 0) * PIXELS_PER_FURLONG;
        this.SPEED_FACTOR = 1.2 + this.SPEED_FACTOR + Math.random() / 5;
        this.SLOWER_SPEED_FACTOR = this.SPEED_FACTOR * 0.5 + Math.random() / 10;
        break;
      case HORSETYPES.MEDIUM_RACE:
        // energy fails are 5-15 furlongs
        this.ENERGY_FALL_DISTANCE =
            ((5 + Math.random() * 10) | 0) * PIXELS_PER_FURLONG;
        this.SPEED_FACTOR = 1 + this.SPEED_FACTOR + Math.random() / 4;
        this.SLOWER_SPEED_FACTOR = this.SPEED_FACTOR * 0.6 + Math.random() / 10;
        break;
      case HORSETYPES.LONG_RACE:
        // energy fails are 12+ furlongs
        this.ENERGY_FALL_DISTANCE =
            ((12 + Math.random() * 10) | 0) * PIXELS_PER_FURLONG;
        this.SPEED_FACTOR = 0.9 + this.SPEED_FACTOR + Math.random() / 10;
        this.SLOWER_SPEED_FACTOR = this.SPEED_FACTOR * 0.7 + Math.random() / 10;
        break;
      default:
        break;
    }
}
/*
class Horse {
  constructor(horseName, owner) {

    this._name = horseName;
    this._owner = owner;
    this._backgroundPositionX = 0;
    this._backgroundPositionY = 0;
    this._animIndexer = 0;
    this._left = 0;
    this._top = 0;
    this._finished = false;

    this._raceSpeedFactor = 0;
    const horseType = (Math.random() * 3) | 0;
    this._horseType = horseType;
    this._speedFactor = 0;
    this._slowerSpeedFactor = 0;
    this.FORM = [];

    switch (horseType) {
      case HORSETYPES.SHORT_RACE:
        // energy falls after 3 - 6 furlongs
        this._energyFallPosition =
          ((3 + Math.random() * 3) | 0) * PIXELS_PER_FURLONG;
        this._speedFactor = 1.2 + this._speedFactor + Math.random() / 5;
        this._slowerSpeedFactor = this._speedFactor * 0.5 + Math.random() / 10;
        break;
      case HORSETYPES.MEDIUM_RACE:
        // energy fails are 5-15 furlongs
        this._energyFallPosition =
          ((5 + Math.random() * 10) | 0) * PIXELS_PER_FURLONG;
        this._speedFactor = 1 + this._speedFactor + Math.random() / 4;
        this._slowerSpeedFactor = this._speedFactor * 0.6 + Math.random() / 10;
        break;
      case HORSETYPES.LONG_RACE:
        // energy fails are 12+ furlongs
        this._energyFallPosition =
          ((12 + Math.random() * 10) | 0) * PIXELS_PER_FURLONG;
        this._speedFactor = 0.9 + this._speedFactor + Math.random() / 10;
        this._slowerSpeedFactor = this._speedFactor * 0.7 + Math.random() / 10;
        break;
      default:
        break;
    }
  }

  get horseTypeName() {
    switch (this._horseType) {
      case HORSETYPES.SHORT_RACE:
        return "Short race";
      case HORSETYPES.MEDIUM_RACE:
        return "Medium race";
      case HORSETYPES.LONG_RACE:
        return "Long race";
      default:
        return "Unknown";
    }
  }

  get name() {
    return this._name;
  }

  get owner() {
    return this._owner;
  }

  get backgroundPositionX() {
    return this._backgroundPositionX;
  }

  get backgroundPositionY() {
    return this._backgroundPositionY;
  }

  set backgroundPositionX(val) {
    this._backgroundPositionX = val;
  }

  set backgroundPositionY(val) {
    this._backgroundPositionY = val;
  }

  get animIndexer() {
    return this._animIndexer;
  }
  set animIndexer(val) {
    this._animIndexer = val;
  }

  get left() {
    return this._left;
  }

  set left(val) {
    this._left = val;
  }
  get top() {
    return this._top;
  }

  set top(val) {
    this._top = val;
  }

  get finished() {
    return this._finished;
  }

  set finished(val) {
    this._finished = val;
  }

  get speedFactor() {
    return this._speedFactor;
  }
  set speedFactor(val) {
    this._speedFactor = val;
  }

  get raceSpeedFactor() {
    return this._raceSpeedFactor;
  }

  set raceSpeedFactor(val) {
    this._raceSpeedFactor = val;
  }

  get horseType() {
    return this._horseType;
  }

  getSpeedFactorAtPosition(pos) {
    if (pos < this._energyFallPosition) {
      return this._speedFactor + this._raceSpeedFactor;
    } else {
      return this._slowerSpeedFactor + this._raceSpeedFactor;
    }
  }
}
*/

class Player {
  constructor(playerName) {
    this._name = playerName;
    this.horses = [];
    this._funds = INITIAL_PLAYER_FUNDS;
  }

  get name() {
    return this._name;
  }

  get horseCount() {
    return this.horses.length;
  }

  getHorse(index) {
    return this.horses[index];
  }

  addHorse(horse) {
    this.horses.push(horse);
  }

  hasHorse(name) {
    return (
      this.horses.filter((horse) => {
        return horse.NAME === name;
      }).length > 0
    );
  }

  getHorseByName(name) {
    let horses = this.horses.filter((horse) => {
      return horse.NAME === name;
    });
    return horses[0];
  }

  get funds() {
    return this.FUNDS;
  }

  set funds(val) {
    this.FUNDS = val;
  }
}

const RACE_LENGTHS = {
  F5: 0,
  F6: 1,
  F7: 2,
  M1: 3,
  M2: 4,
};

const getRaceLengthText = (len) => {
  switch (len) {
    case RACE_LENGTHS.F5:
      return "5 Furlongs";
    case RACE_LENGTHS.F6:
      return "6 Furlongs";
    case RACE_LENGTHS.F7:
      return "7 Furlongs";
    case RACE_LENGTHS.M1:
      return "1 Mile";
    case RACE_LENGTHS.M2:
      return "2 Miles";
  }
};

const MAX_PROGRESS_PER_SECOND = 250;
const PIXELS_PER_FURLONG = 250; //780;
const HORSE_NOSE = 134;
const HORSE_NOSE_ADJUST = [
  0,
  -8,
  -18,
  -3,
  -10,
  -21,
  -6,
  -16,
  -26,
  -8,
  -20,
  -22,
];

class Race {
  constructor(
    title,
    horsesInRace,
    raceLength,
    imageLoader,
    onRaceFinished,
    players,
    imageUrl,
    pot,
    gameData
  ) {
    this._title = title;
    this.horses = horsesInRace;
    this._raceLength = raceLength;
    this.players = players;
    this._bets = [];
    this._imageUrl = imageUrl;
    this._pot = pot;
    this._gameData = gameData;
    let oddsStats = [];
    horsesInRace.forEach((horse) => {
      let val = this.getHorseWinChanceScore(horse);
      oddsStats.push({ horse: horse, score: val });
    });
    oddsStats.sort((a, b) => {
      if (a.score === b.score) {
        return 0;
      } else if (a.score < b.score) {
        return 1;
      } else {
        return -1;
      }
    });
    console.log("odds stats");
    oddsStats.forEach((stat, index) => {
      stat.odds = 2.0 + index * 0.5;
      if (index > 2) {
        stat.odds = stat.odds * (2 + index - 2);
      }

      stat.horse._raceOdds = stat.odds;
      console.log(stat.horse.NAME + "=" + stat.score + "=" + stat.odds + "/1");
    });
    this._oddsStats = oddsStats;
    this.placeBets(oddsStats).then((bets) => {
      window.alert("Click OK to start race");

      this._gameData = null;
      this._onRaceFinished = onRaceFinished;
      this._finishers = [];
      this._animFrameHandlerRef = null;
      this._imageLoader = imageLoader;
      this._lastFrameTimestamp = -1;
      this._raceFinished = false;
      this._mainCanvas = document.createElement("canvas");
      document.body.innerHTML = "";
      document.body.append(this._mainCanvas);
      this._mainCanvas.id = "raceArea";
      this._mainCanvas.className = "raceArea";
      this._canvasWidth = this._mainCanvas.clientWidth;
      this._canvasHeight = this._mainCanvas.clientHeight;
      this._mainCanvas.width = this._canvasWidth;
      this._mainCanvas.height = this._canvasHeight;
      this._verticalInterval =
        ((4 * this._canvasHeight) / 5 - 100) / this.horses.length;
      this._mainContext = this._mainCanvas.getContext("2d");
      this._backCanvas = document.createElement("canvas");
      this._backContext = this._backCanvas.getContext("2d");
      this._backCanvas.width = this._mainCanvas.width;
      this._backCanvas.height = this._mainCanvas.height;
      this._progressRate = MAX_PROGRESS_PER_SECOND;
      this._scrollAdjust = 0;
      this._averageMovement = 0;
      this._pauseCycles = 0;
      this._lastFrameTimestamp = -1;

      switch (raceLength) {
        case RACE_LENGTHS.F5:
          this._finishLine = 5 * PIXELS_PER_FURLONG;
          this._furlongs = 5;
          break;
        case RACE_LENGTHS.F6:
          this._finishLine = 6 * PIXELS_PER_FURLONG;
          this._furlongs = 6;
          break;
        case RACE_LENGTHS.F7:
          this._finishLine = 7 * PIXELS_PER_FURLONG;
          this._furlongs = 7;
          break;
        case RACE_LENGTHS.M1:
          this._finishLine = 8 * PIXELS_PER_FURLONG;
          this._furlongs = 8;
          break;
        case RACE_LENGTHS.M2:
          this._finishLine = 16 * PIXELS_PER_FURLONG;
          this._furlongs = 16;
          break;
        default:
          // shouldn't happen
          this._finishLine = 5 * PIXELS_PER_FURLONG;
          this._furlongs = 5;
          break;
      }

      let y = this._verticalInterval;
      for (let i = 0; i < this.horses.length; i++) {
        let horse = this.horses[i];
        horse.top = (1 + i) * this._verticalInterval;
      }
      this.horses.forEach((horse) => {
        horse.raceSpeedFactor = Math.random() / 5;
        horse.left = 0;
        horse.finished = false;
      });

      this.addFurlongs();
      this.tileBackground();
      this.drawLines();
      this.drawHorses();
      this.paintFromBackground();

      this._pauseCycles = 60;
      siPlaySound(1);
      window.requestAnimationFrame(this.handleDrawRequest.bind(this));
    });
  }

  get gameData() {
    return this._gameData;
  }

  set gameData(val) {
    if (val !== this._gameData) {
      this.this._gameData = val;
    }
  }
  getBets() {
    return this._bets;
  }

  placeBets(odds) {
    // horse, score, odds
    return new Promise((resolve) => {
      const handleClick = () => {
        this._bets = [];
        let table = document.getElementsByClassName("bettingTable")[0];
        if (table) {
          let validationError = false;
          let rows = Array.from(table.children);
          for (let i = 1; i < rows.length; i++) {
            let row = rows[i];
            let cells = Array.from(row.children);
            let bet = parseInt(cells[2].childNodes[0].value, 10) | 0;
            let horseName = cells[1].childNodes[0].value;
            this._bets.push({ horseName: horseName, bet: bet });
            if (bet > this.players[i - 1].funds || bet < 0) {
              validationError = true;
            }
          }
          if (validationError) {
            window.alert("check your bets");
          } else {
            //TODO .. push bets

            resolve(this._bets);
          }
        }
      };
      document.body.innerHTML = "";
      let container = smAddElement(document.body, "div", "", "bookies");
      smAddElement(container, "h1", "Place Your Bets");

      smAddElement(container, "h2", `${this._title}`);
      let table = smAddElement(container, "table", null);
      let row = smAddElement(table, "tr");
      smAddElement(row, "th", "Owner");
      smAddElement(row, "th", "Horse");
      smAddElement(row, "th", "Odds");
      smAddElement(row, "th", "Form");

      odds.forEach((odd) => {
        row = smAddElement(table, "tr");
        smAddElement(row, "td", odd.horse._owner.name);
        smAddElement(row, "td", odd.horse.NAME);
        smAddElement(row, "td", odd.odds + "/1");
        let sForm = "";
        for (let f = odd.horse.FORM.length - 1; f >= 0; f--) {
          if (sForm !== "") {
            sForm += ", ";
          }
          sForm += odd.horse.FORM[f];
        }
        smAddElement(row, "td", sForm);
      });

      table = smAddElement(container, "table", null, "bettingTable");
      row = smAddElement(table, "tr");
      smAddElement(row, "th", "Player");
      smAddElement(row, "th", "Horse");
      smAddElement(row, "th", "Amount");
      this.players.forEach((player) => {
        row = smAddElement(table, "tr");
        smAddElement(row, "td", `${player.NAME}: ${player.FUNDS}`);
        let cell = smAddElement(row, "td");
        let select = smAddElement(cell, "select", null, "betSelect");
        this.horses.forEach((horse) => {
          if (horse._owner !== player) {
            smAddElement(select, "option", horse.NAME);
          }
        });
        cell = smAddElement(row, "td");
        let input = smAddElement(cell, "input");
        input.type = "number";
        input.className = "betAmount";
        input.min = 0;
        input.max = player.FUNDS;
      });

      let buttonContainer = smAddElement(container, "div", null, "wrapper");
      let anchor = smAddElement(buttonContainer, "input", "done");
      anchor.type = "button";
      anchor.value = "done";
      anchor.onclick = handleClick.bind(this);
    });
  }

  getHorseWinChanceScore(horse) {
    switch (this._raceLength) {
      case RACE_LENGTHS.F5:
        switch (horse.HORSE_TYPE) {
          case HORSETYPES.SHORT_RACE:
            return horse.SPEED_FACTOR;
          case HORSETYPES.MEDIUM_RACE:
            return horse.SPEED_FACTOR * 0.9;
          case HORSETYPES.LONG_RACE:
            return horse.SPEED_FACTOR * 0.8;
          default:
        }
        break;

      case RACE_LENGTHS.F6:
        switch (horse.HORSE_TYPE) {
          case HORSETYPES.SHORT_RACE * 0.95:
            return horse.SPEED_FACTOR;
          case HORSETYPES.MEDIUM_RACE:
            return horse.SPEED_FACTOR * 0.92;
          case HORSETYPES.LONG_RACE:
            return horse.SPEED_FACTOR * 0.8;
          default:
        }
        break;

      case RACE_LENGTHS.F7:
        switch (horse.HORSE_TYPE) {
          case HORSETYPES.SHORT_RACE:
            return horse.SPEED_FACTOR * 0.85;
          case HORSETYPES.MEDIUM_RACE:
            return horse.SPEED_FACTOR * 0.94;
          case HORSETYPES.LONG_RACE:
            return horse.SPEED_FACTOR * 0.8;
          default:
        }
        break;

      case RACE_LENGTHS.M1:
        switch (horse.HORSE_TYPE) {
          case HORSETYPES.SHORT_RACE:
            return horse.SPEED_FACTOR * 0.75;
          case HORSETYPES.MEDIUM_RACE:
            return horse.SPEED_FACTOR * 0.96;
          case HORSETYPES.LONG_RACE:
            return horse.SPEED_FACTOR * 0.85;
          default:
        }
        break;

      case RACE_LENGTHS.M2:
        switch (horse.HORSE_TYPE) {
          case HORSETYPES.SHORT_RACE:
            return horse.SPEED_FACTOR * 0.6;
          case HORSETYPES.MEDIUM_RACE:
            return horse.SPEED_FACTOR * 0.86;
          case HORSETYPES.LONG_RACE:
            return horse.SPEED_FACTOR;
          default:
        }
        break;

      default:
        break;
    }
  }

  tileBackground() {
    const grass = this._imageLoader.taggedImages.grass;
    const grassTileWidth = parseInt(grass.width, 10) | 0;
    const grassTileHeight = parseInt(grass.height, 10) | 0;
    for (
      let x = 0;
      x < this._canvasWidth + grassTileWidth;
      x += grassTileWidth
    ) {
      for (let y = 0; y < this._canvasHeight; y += grassTileHeight) {
        this._backContext.drawImage(
          grass,
          x - (this._scrollAdjust % grassTileWidth),
          y
        );
      }
    }

    this._backContext.fillStyle = "darkblue";
    this._backContext.font = "24pt arial";
    this._backContext.fillText(this._title, 50, 50);
  }

  drawLines() {
    const drawLineIfVisible = (x, color, label) => {
      let transformedOrigin = x + HORSE_NOSE - this._scrollAdjust;
      if (transformedOrigin > 0 && transformedOrigin < this._canvasWidth) {
        this._backContext.strokeStyle = color;
        this._backContext.beginPath();
        this._backContext.moveTo(transformedOrigin, 0);
        this._backContext.lineTo(transformedOrigin, this._canvasHeight);
        this._backContext.stroke();
        this._backContext.fillStyle = "white";
        this._backContext.font = "12px Sans";
        this._backContext.fillText(label, transformedOrigin, 20);
      }
    };

    this._lines.forEach((line) => {
      drawLineIfVisible(line.x, line.color, line.label);
    });
  }

  addFurlongs() {
    this._lines = [{ x: 0, color: "white", label: "start" }];
    for (var i = 0; i < this._furlongs; i++) {
      let line = {
        x: (i + 1) * PIXELS_PER_FURLONG,
        color: "yellow",
        label: "F" + (i + 1),
      };

      this._lines.push(line);
    }
    this._lines[this._lines.length - 1].label = "Finish";
  }

  drawHorses() {
    this.horses.forEach((horse, index) => {
      const left = horse.left - this._scrollAdjust;
      const top = horse.top;
      this._backContext.drawImage(
        this._imageLoader.horseImages[index % 12],
        horse.backgroundPositionX,
        horse.backgroundPositionY,
        150,
        100,
        left,
        top,
        150,
        100
      );
      this._backContext.fillStyle = horseColors[index % 12 | 0];
      this._backContext.font = "16px Sans";
      this._backContext.fillText(
        horse._owner.NAME + ": " + horse.NAME + "(" + horse._raceOdds + "/1)",
        10,
        top + 30
      );
    });
  }

  paintFromBackground() {
    this._mainContext.drawImage(this._backCanvas, 0, 0);
  }

  race() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  moveHorses(ticksSinceLastFrame) {
    if (this._pauseCycles > 0) {
      this._pauseCycles--;
      return;
    }

    let chance = (Math.random() * 200) | 0;

    if (chance === 0) {
      chance = (Math.random() * 3) | 0;
      if (chance === 2) {
        siPlaySound(4);
      } else {
        siPlaySound(0);
      }
    }
    // number of pixels per sec we can move at maximum.
    const maxProgressPerSecMs = MAX_PROGRESS_PER_SECOND / 1000;
    const maxProgressThisFrame = maxProgressPerSecMs * ticksSinceLastFrame;

    let moveValues = [];
    const getHorseSpeedFactorAtPosition = (horse, pos) => {
        if (pos < horse.ENERGY_FALL_DISTANCE) {
          return horse.SPEED_FACTOR + horse.raceSpeedFactor;
        } else {
          return horse.SPEED_FACTOR + horse.raceSpeedFactor;
        }
    };
    this.horses.forEach((horse, index) => {
      this.animateHorse(horse, ticksSinceLastFrame);
      let moveX =
        Math.random() *
        maxProgressThisFrame *
        getHorseSpeedFactorAtPosition(horse,horse.left);
      let left = horse.left + moveX;
      moveValues.push(moveX);
      horse.left = left;
    });

    let maxAfterMove = this.getMaxHorsePosition();
    if (maxAfterMove > this._scrollAdjust + this._canvasWidth - 350) {
      // 1st horse approaching right of screen.
      let adjust = Math.abs(
        this._canvasWidth - 350 - (maxAfterMove + this._scrollAdjust)
      );
      this._scrollAdjust += maxProgressThisFrame;
    }
  }

  getMaxHorsePosition() {
    let max = 0;
    this.horses.forEach((horse) => {
      if (horse.left > max) {
        max = horse.left;
      }
    });
    return max;
  }

  drawFinishers() {
    if (this._finishers.length > 0) {
      this._backContext.fillStyle = "white";
      this._backContext.strokeStyle = "black";
      this._backContext.fillRect(
        this._canvasWidth - 150,
        0,
        150,
        40 + 16 * this._finishers.length
      );
      this._backContext.font = "12px Sans";
      this._backContext.fillStyle = "black";
      this._finishers.forEach((horse, index) => {
        this._backContext.fillText(
          horse.NAME + "/" + horse._owner.NAME,
          this._canvasWidth - 140,
          30 + 16 * index
        );
      });
      this._backContext.stroke();
    }
  }

  getHorsesInOrder(horses) {
    const cloneHorses = [...horses];
    cloneHorses.sort((a, b) => {
      let a1 = a.left;
      let b1 = b.left;
      if (a1 === b1) {
        return 0;
      } else if (a1 < b1) {
        return 1;
      } else {
        return -1;
      }
    });
    return cloneHorses;
  }

  drawPositionList() {
    this._backContext.fillStyle = "Green";
    const boxTop = this._canvasHeight - (40 + 16 * this.horses.length);
    this._backContext.fillRect(
      this._canvasWidth - 150,
      boxTop,
      150,
      40 + 16 * this.horses.length
    );

    this._backContext.font = "12px Sans";
    this._backContext.fillStyle = "white";
    const cloneHorses = this.getHorsesInOrder(this.horses);
    cloneHorses.forEach((horse, index) => {
      this._backContext.fillText(
        horse.NAME + "/" + horse._owner.NAME,
        this._canvasWidth - 140,
        boxTop + 30 + 16 * index
      );
    });
  }

  handleDrawRequest(lTicks) {
    let ticksSinceLastFrame = 0;
    if (this._lastFrameTimestamp > 0) {
      ticksSinceLastFrame = lTicks - this._lastFrameTimestamp;
    } else {
      siPlaySound(5);
    }
    this._lastFrameTimestamp = lTicks;

    this.moveHorses(ticksSinceLastFrame);
    this.checkHorsesFinished();
    this.tileBackground();
    this.drawLines();
    this.drawHorses();
    this.drawFinishers();
    this.drawPositionList();

    this.paintFromBackground();

    if (!this._raceFinished && this._scrollAdjust < 15000) {
      window.requestAnimationFrame(this.handleDrawRequest.bind(this));
    } else {
      // Handle bets
      let bettingSummary = "BETTING RESULTS:";
      this.players.forEach((player, index) => {
        let bet = this._bets[index];
        let amt = bet.bet;
        let n = bet.horseName;

        // find position in winners
        let winningHorseName = this._finishers[0].NAME;

        let winningHorseOdds = 0;
        this._oddsStats.forEach((stat) => {
          if (stat.horse.NAME === winningHorseName) {
            winningHorseOdds = stat.odds;
          }
        });

        if (index >= 0) {
          bettingSummary += "\n";
        }
        if (winningHorseName === n) {
          let winnings = amt * winningHorseOdds;
          player.FUNDS = player.FUNDS + winnings;
          bettingSummary += `${player.NAME} won ${winnings}`;
        } else {
          player.FUNDS = player.FUNDS - amt;
          bettingSummary += `${player.NAME} lost ${amt}`;
        }
      });

      window.alert(bettingSummary);

      this._onRaceFinished(this);
    }
  }

  animateHorse(horse, timeSpanMs) {
    if (horse) {
      const framesThisInterval = timeSpanMs * (12 / 1000);
      horse.animIndexer += framesThisInterval;
      const frameIndex = horse.animIndexer % 12 | 0;
      const xIndex = frameIndex % 3;
      const yIndex = frameIndex % 4;
      horse.backgroundPositionX = xIndex * 150;
      horse.backgroundPositionY = yIndex * 100;
    }
  }

  addWinner(horse) {
    this._finishers.push(horse);
    horse.FORM.push(this._finishers.length);
    siPlaySound(2);
    if (this._finishers.length === this.horses.length) {
      this._raceFinished = true;
    }
  }

  getHorseNoseAdjust(horse) {
    return HORSE_NOSE_ADJUST[horse.animIndexer % 12 | 0];
  }

  checkHorsesFinished() {
    let winners = [];
    this.horses.forEach((horse) => {
      if (!horse.finished) {
        if (horse.left >= this._finishLine) {
          winners.push(horse);
          horse.finished = true;
        }
      }
    });
    if (winners.length > 0) {
      if (winners.length === 1) {
        this.addWinner(winners[0]);
      } else {
        /* Multiple finished in this cycle) */
        winners = this.getHorsesInOrder(winners);
        for (let j = 0; j < winners.length; j++) {
          this.addWinner(winners[j]);
        }
      }
      // this._pauseCycles = 300;
    }
  }
}


const MEETINGS = [
  /*
  {
    venue: "Doncaster",
    races: [
      { name: "Flying Childers Stakes", distance: RACE_LENGTHS.F5 },
      { name: "St Ledger", distance: RACE_LENGTHS.M2 },
      { name: "Park Hill Stakes", distance: RACE_LENGTHS.F7 },
    ],
  },
  {
    venue: "New Market",
    races: [
      { name: "2000 Guineas", distance: RACE_LENGTHS.M1 },
      { name: "Callenge Stakes", distance: RACE_LENGTHS.F7 },
      { name: "Abernant Stakes", distance: RACE_LENGTHS.F6 },
    ],
  },
  */
  {
    venue: "Chester",
    imageUrl: "assets/images/chester.jpg",
    races: [
      { name: "Chester Cup", distance: RACE_LENGTHS.M2, pot: 100 },
      { name: "Chester Vase", distance: RACE_LENGTHS.M1, pot: 100 },
      { name: "Huxley Stakes", distance: RACE_LENGTHS.M1, pot: 100 },
    ],
  },
  {
    venue: "York",
    imageUrl: "assets/images/york.png",
    races: [
      { name: "Musidora Stakes", distance: RACE_LENGTHS.M1, pot: 200 },
      { name: "Yorkshire Oaks", distance: RACE_LENGTHS.M1, pot: 200 },
      { name: "Nunthorpe Stakes", distance: RACE_LENGTHS.F5, pot: 200 },
    ],
  },
  /*
  {
    venue: "Epsom",
    races: [
      { name: "Derby", distance: RACE_LENGTHS.M1 },
      { name: "Oaks", distance: RACE_LENGTHS.M1 },
      { name: "Surrey Stakes", distance: RACE_LENGTHS.M1 },
    ],
  },
  */
  {
    venue: "Royal Ascot",
    imageUrl: "assets/images/ascot.jpg",
    races: [
      { name: "Gold Cup", distance: RACE_LENGTHS.M2, pot: 500 },
      { name: "Coronation Stakes", distance: RACE_LENGTHS.F7, pot: 500 },
      { name: "Diamond Jubilee Stakes", distance: RACE_LENGTHS.F6, pot: 500 },
    ],
  },
  {
    venue: "Goodwood",
    imageUrl: "assets/images/goodwood.jpg",
    races: [
      { name: "Sussex Stakes", distance: RACE_LENGTHS.M1, pot: 1000 },
      { name: "Goodwood Cup", distance: RACE_LENGTHS.M2, pot: 1000 },
      { name: "Richmond Stakes", distance: RACE_LENGTHS.F6, pot: 1000 },
    ],
  },
];

class Meeting {
  constructor(players, meetingData, imageLoader, gameData, onMeetingFinished) {
    this._meeting = meetingData;
    this._imageLoader = imageLoader;
    this._selectedPlayerIndex = 0;
    this._raceIndex = 0;
    this._onMeetingFinished = onMeetingFinished;
    this._gameData = gameData;
    siPlaySound(3, 6000);
  }

  handleHorseSelection() {
    this._selectedPlayerIndex++;
    if (this._selectedPlayerIndex < this._gameData.players.length) {
      this.setupPlayerSelection(this._gameData.players[this._selectedPlayerIndex]);
    } else {
      this.runRace(0);
    }
  }

  setupPlayerSelection(player) {
    const that = this;
    const selection = [];
    let btn;
    const handleButtonClick = () => {
      player._raceSelections = selection;
      this.handleHorseSelection();
    };

    const uniqueSelection = () => {
      const isUnique = (name) => {
        let len = selection.filter((item) => {
          if (item === name) {
            return true;
          }
        }).length;
        return len === 1;
      };

      if (selection.length === this._meeting.races.length) {
        for (let i = 0; i < this._meeting.races.length; i++) {
          if (!isUnique(selection[i])) {
            return false;
          }
        }
        return true;
      }
    };

    const handleSelectionChange = () => {
      if (event && event.target) {
        const t = event.target;
        const seletcedVal = t.val;
        const parentRow = t.parentNode.parentNode;
        const table = document.getElementsByClassName("horse-selection")[0];
        const tableRows = Array.from(table.children);
        const selIndex = tableRows.indexOf(parentRow) - 1;
        selection[selIndex] = t.value;
        btn.disabled = !uniqueSelection();
      }
    };

    document.body.innerHTML = "";
    let container = smAddElement(document.body, "div");
    container.style.backgroundImage = "url('" + this._meeting.imageUrl + "')";
    container.style.backgroundSize = "cover";

    smAddElement(container, "h1", this._meeting.venue);
    const caption = `${player.NAME} please select your horses`;
    smAddElement(container, "h2", caption);
    const table = smAddElement(container, "table", null, "horse-selection");
    const headerRow = smAddElement(table, "tr");
    smAddElement(headerRow, "th", "Race");
    smAddElement(headerRow, "th", "Length");
    smAddElement(headerRow, "th", "Horse");
    for (
      var iRaceIndex = 0;
      iRaceIndex < this._meeting.races.length;
      iRaceIndex++
    ) {
      const race = this._meeting.races[iRaceIndex];
      const row = smAddElement(table, "tr");
      smAddElement(row, "td", race.NAME);
      smAddElement(row, "td", getRaceLengthText(race.distance));
      let cell = smAddElement(row, "td");
      let selector = smAddElement(cell, "select");
      selector.onchange = handleSelectionChange;
      player.horses.forEach((horse) => {
        smAddElement(selector, "option", horse.NAME);
      });
      selection[iRaceIndex] = player.horses[iRaceIndex].NAME;
      selector.value = player.horses[iRaceIndex].NAME;
    }
    let buttonContainer = smAddElement(container, "div", null, "wrapper");
    btn = smAddElement(buttonContainer, "input", "Done");
    btn.type = "button";
    btn.value = "Done";
    //btn.disabled = true;
    btn.onclick = handleButtonClick;
  }

  setup() {
    this.setupPlayerSelection(this._gameData.players[0]);
  }

  handleRaceFinished(race) {
    const pot = race._pot;
    race._finishers[0]._owner.funds = race._finishers[0]._owner.funds + pot / 2;
    race._finishers[1]._owner.funds =
      race._finishers[1]._owner.funds + (3 * pot) / 10;
    race._finishers[2]._owner.funds =
      race._finishers[2]._owner.funds + (2 * pot) / 10;

    const sMessage = `${race._finishers[0]._owner.NAME} won ${pot / 2}
    ${race._finishers[1]._owner.NAME} won ${(3 * pot) / 10}
    ${race._finishers[2]._owner.NAME} won ${(2 * pot) / 10}`;

    window.alert(sMessage);

    if (this._raceIndex < this._meeting.races.length - 1) {
      this._raceIndex++;
      this.runRace(this._raceIndex);
    } else {
      window.alert("Meeting over");
      this._onMeetingFinished();
    }
  }

  async runRace(raceIndex) {
    let horsesToEnter = [];
    this._gameData.players.forEach((player) => {

      const getHorseByName = (horseName) => {
        return player.horses.find((horse) => {
          if (horse.NAME === horseName) {
            return true;
          }
        });
      }

      const horseName = player._raceSelections[raceIndex];
      const horse = getHorseByName(horseName);
      horsesToEnter.push(horse);
    },this);

    for(let playerIndex in this._gameData.players) {
      let player = this._gameData.players[playerIndex];
      for(let horseIndex in player.horses) {
        let horse = player.horses[horseIndex];
        horse.FORM = await getHorseForm(this._gameData.ID,horse.ID);
      }
    }

    let raceData = this._meeting.races[raceIndex];
    let title = `${this._meeting.venue}:  ${raceData.NAME} [${getRaceLengthText(
      raceData.distance
    )}, Prize: ${raceData.pot}]`;
    let race = new Race(
      title,
      horsesToEnter,
      raceData.distance,
      this._imageLoader,
      this.handleRaceFinished.bind(this),
      this._gameData.players,
      this._meeting.url,
      raceData.pot,
        this._gameData
    );

  }

  run() {
    //TODO:: run the series of races
  }
}

class HorseGame {
  constructor() {
    this._meetingIndex = 0;
    this._meetings = MEETINGS;
    loadSounds();
  }

  playerHasHorse(player,horseName) {
    if (player && player.horses) {
      let count = player.horses.filter((horse) => {
        if (horse.NAME === horseName) {
          return horse;
        }
      }).length;
      return count > 0;
    }
  };

  async doInitialPlayerSetupForGame(gameData) {

    if (gameData && gameData.players && gameData.players.length) {

      for (const player of gameData.players) {
        player.horses = [];
        for (let i = 0; i < HORSES_PER_PLAYER; i++) {
          // player horse names should be unique
          let horseName = "";
          do {
            horseName = getHorseName();
          } while (this.playerHasHorse(player, horseName));
          const horse = new AHorse(horseName, player);
          player.horses.push(horse);
        }
        await savePlayerHorses(gameData.ID,player.PLAYER_ID,player.horses).catch((err) => {
          console.log("Failed to save player horses: " + err);
        });

        player.horses = await getPlayerHorses(gameData.ID,player.PLAYER_ID).catch( (err) => {
          console.log("Failed to fetch player horses: " + err);
        });
        player.horses.forEach((horse) => {
          horse._owner = player;
          horse.animIndexer = 0;
        });
        player.FUNDS = INITIAL_PLAYER_FUNDS;

      }
    }

    this.gameData = gameData;
  }

  async setupPlayers() {

    await getHorseGamesList().then( async (games)=>{
      return new Promise((resolve,reject) => {

        const doGameItemClicked = async () => {
          let id = event.target.id | 0;
          
          let gameData = await getHorseGameData(id);
          this.gameData = gameData;
          if (gameData) {
            gameData.players = await getPlayersInGame(gameData.ID);
            let gameState = gameData.state | 0;
            switch (gameState) {
              case 0:
                await this.doInitialPlayerSetupForGame(gameData).catch( (err) => {
                  console.log("failed to setup players in game: " + err);
                });
                break;
              default:
                window.alert('unhandled case');
            }
          }
          resolve();
        };

        document.body.innerHTML = '';
        let gameListContainer = smAddElement(document.body,'div');
        smAddElement(gameListContainer,'h2','currentGames');
        smAddElement(gameListContainer,'hr');
        if (games && games.length) {
          let gameList = smAddElement(gameListContainer,'ul');
          for(let iGameIndex = 0; iGameIndex < games.length; iGameIndex++) {
            let game = games[iGameIndex];
            let gameListItem = smAddElement(gameList,'a',game.NAME,'gameListItem');
            gameListItem.id = game.ID;
            gameListItem.onclick = doGameItemClicked;
          }
        }

        smAddElement(gameListContainer,'h3','Select game');
      });
    });
  }

  doNextMeeting() {
    if (this._meetingIndex < this._meetings.length - 1) {
      this._meetingIndex++;
      const meeting = new Meeting(
        this.players,
        this._meetings[this._meetingIndex],
        this._imageLoader,
        this.gameData,
        this.doMeetingFinished.bind(this)
      );
      meeting.setup();
    } else {
      window.alert("GAME OVER");
      this.displayStatus(null);
    }
  }

  doMeetingFinished() {
    this.displayStatus(this.doNextMeeting.bind(this));
  }

  doStartMeetings() {
    //meetings.forEach((meetingInfo) => {
    const meetingInfo = this._meetings[0];
    const meeting = new Meeting(
      this.players,
      meetingInfo,
      this._imageLoader,
      this.gameData,
      this.doMeetingFinished.bind(this)
    );
    meeting.setup();
  }

  async start() {
    // clear the body and create a screen for adding users and horses.
    this._imageLoader = new ImageLoader();
    await this._imageLoader.loadImages().then(async () => {
      await this.setupPlayers();

      this.displayStatus(this.doStartMeetings.bind(this));
    });
  };

  addPlayer(player) {
    this.players.push(player);
  }

  displayStatus(handleClick) {
    document.body.innerHTML = "";
    let statusContainer = smAddElement(
      document.body,
      "div",
      "",
      "statusContainer"
    );

    smAddElement(statusContainer, "h1", "Leaderboard");
    let table = smAddElement(statusContainer, "table");
    let columnHeaders = smAddElement(table, "tr");
    smAddElement(columnHeaders, "th", "Owner");
    smAddElement(columnHeaders, "th", "Funds");
    const sortedPlayers = [...this.gameData.players];
    sortedPlayers.sort((a, b) => {
      if (a.funds === b.funds) {
        return 0;
      } else if (a.funds < b.funds) {
        return 1;
      } else {
        return 0;
      }
    });
    for (let i = 0; i < sortedPlayers.length; i++) {
      let player = sortedPlayers[i];
      let row = smAddElement(table, "tr");
      smAddElement(row, "td", player.NAME);
      smAddElement(row, "td", player.FUNDS);
    }
    statusContainer.append(table);

    if (handleClick) {
      let anchor = smAddElement(
        statusContainer,
        "h2",
        "Click to start next meeting..."
      );

      anchor.onclick = handleClick;
    }
  }
}

const doStartGame = () => {
  game = new HorseGame();
  game.start();
};
