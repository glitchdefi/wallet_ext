function getRandomColor() {
  const letters = 'BCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

const randomAngle = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export function getAvatar() {
  const randomColor = getRandomColor();
  const randomColor2 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  // SET VALUE for PIES
  const angle1 = randomAngle(46, 229);

  const data = [angle1, 360 - angle1];
  const colors = [randomColor, randomColor2];

  let canvas = null;

  if (document.getElementsByTagName('canvas').length) {
    canvas = document.getElementsByTagName('canvas')[0];
  } else {
    canvas = document.createElement('canvas');
    canvas.height = 400;
    canvas.width = 400;
  }

  const context = canvas.getContext('2d');

  // Draw 3 pies
  for (var i = 0; i < data.length; i++) {
    drawSegment(canvas, context, i, data, colors);
  }

  return canvas.toDataURL();
}

// Draw a part
function drawSegment(canvas, context, i, data, colors) {
  context.save();
  var centerX = Math.floor(canvas.width / 2);
  var centerY = Math.floor(canvas.height / 2);
  const radius = Math.floor(canvas.width / 2);

  var startingAngle = degreesToRadians(sumTo(data, i));
  var arcSize = degreesToRadians(data[i]);
  var endingAngle = startingAngle + arcSize;

  context.beginPath();
  context.moveTo(centerX, centerY);
  context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
  context.closePath();

  context.fillStyle = colors[i];
  context.fill();

  context.restore();
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function sumTo(a, i) {
  var sum = 0;
  for (var j = 0; j < i; j++) {
    sum += a[j];
  }
  return sum;
}
