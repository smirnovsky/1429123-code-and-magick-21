'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 30;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var COLUMN_HEIGHT = 130;
var TEXT_HEIGHT = 20;
var SHADOW = 10;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = (ctx, players, times) => {
  renderCloud(
      ctx,
      CLOUD_X + SHADOW,
      CLOUD_Y + SHADOW,
      `rgba(0, 0, 0, 0.7)`
  );

  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;

  let maxTime = getMaxElement(times);

  ctx.fillText(
      `Ура вы победили!`,
      CLOUD_X + GAP,
      CLOUD_Y + GAP
  );

  ctx.fillText(
      `Список результатов:`,
      CLOUD_X + GAP,
      CLOUD_Y + GAP + TEXT_HEIGHT
  );


  for (let i = 0; i < players.length; i++) {
    ctx.fillStyle = `#000`;
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + GAP + TEXT_HEIGHT + GAP + COLUMN_HEIGHT + (-COLUMN_HEIGHT * times[i]) / maxTime
    );

    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsla(252, ` + Math.random() * 99 + 1 + `%, 28%, 1)`;
    }

    ctx.fillRect(
        CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + GAP + TEXT_HEIGHT + TEXT_HEIGHT + GAP + COLUMN_HEIGHT,
        COLUMN_WIDTH,
        (-COLUMN_HEIGHT * times[i]) / maxTime
    );

    ctx.fillStyle = `#000`;
    ctx.fillText(
        players[i],
        CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + GAP + TEXT_HEIGHT + TEXT_HEIGHT + GAP + COLUMN_HEIGHT + TEXT_HEIGHT
    );

  }
};
