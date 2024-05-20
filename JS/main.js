// Sistema Solar
let sun = new Image();
let moon = new Image();
let earth = new Image();

const ctxSolarSystem = document.getElementById("canvasSolarsistem").getContext("2d");

function initSolarSystem() {
  sun.src = "canvas_sun.png";
  moon.src = "canvas_moon.png";
  earth.src = "canvas_earth.png";
  window.requestAnimationFrame(drawSolarSystem);
}

function drawSolarSystem() {
  ctxSolarSystem.globalCompositeOperation = "destination-over";
  ctxSolarSystem.clearRect(0, 0, 300, 300);

  ctxSolarSystem.fillStyle = "rgba(0,0,0,0.4)";
  ctxSolarSystem.strokeStyle = "rgba(0,153,255,0.4)";
  ctxSolarSystem.save();
  ctxSolarSystem.translate(150, 150);

  // La tierra
  let time = new Date();
  ctxSolarSystem.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
    ((2 * Math.PI) / 60000) * time.getMilliseconds()
  );
  ctxSolarSystem.translate(105, 0);
  ctxSolarSystem.fillRect(0, -12, 50, 24);
  ctxSolarSystem.drawImage(earth, -12, -12);

  // La luna
  ctxSolarSystem.save();
  ctxSolarSystem.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
    ((2 * Math.PI) / 6000) * time.getMilliseconds()
  );
  ctxSolarSystem.translate(0, 28.5);
  ctxSolarSystem.drawImage(moon, -3.5, -3.5);
  ctxSolarSystem.restore();

  ctxSolarSystem.restore();

  ctxSolarSystem.beginPath();
  ctxSolarSystem.arc(150, 150, 105, 0, Math.PI * 2, false);
  ctxSolarSystem.stroke();

  ctxSolarSystem.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(drawSolarSystem);
}

// Reloj Analógico
function clock() {
  const now = new Date();
  const canvasClock = document.getElementById("canvasclock");
  const ctxClock = canvasClock.getContext("2d");
  ctxClock.save();
  ctxClock.clearRect(0, 0, 150, 150);
  ctxClock.translate(75, 75);
  ctxClock.scale(0.4, 0.4);
  ctxClock.rotate(-Math.PI / 2);
  ctxClock.strokeStyle = "black";
  ctxClock.fillStyle = "white";
  ctxClock.lineWidth = 8;
  ctxClock.lineCap = "round";

  // Hour marks
  ctxClock.save();
  for (let i = 0; i < 12; i++) {
    ctxClock.beginPath();
    ctxClock.rotate(Math.PI / 6);
    ctxClock.moveTo(100, 0);
    ctxClock.lineTo(120, 0);
    ctxClock.stroke();
  }
  ctxClock.restore();

  // Minute marks
  ctxClock.save();
  ctxClock.lineWidth = 5;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctxClock.beginPath();
      ctxClock.moveTo(117, 0);
      ctxClock.lineTo(120, 0);
      ctxClock.stroke();
    }
    ctxClock.rotate(Math.PI / 30);
  }
  ctxClock.restore();

  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hr = now.getHours() % 12;

  ctxClock.fillStyle = "black";

  // Write Hours
  ctxClock.save();
  ctxClock.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctxClock.lineWidth = 14;
  ctxClock.beginPath();
  ctxClock.moveTo(-20, 0);
  ctxClock.lineTo(80, 0);
  ctxClock.stroke();
  ctxClock.restore();

  // Write Minutes
  ctxClock.save();
  ctxClock.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctxClock.lineWidth = 10;
  ctxClock.beginPath();
  ctxClock.moveTo(-28, 0);
  ctxClock.lineTo(112, 0);
  ctxClock.stroke();
  ctxClock.restore();

  // Write seconds
  ctxClock.save();
  ctxClock.rotate((sec * Math.PI) / 30);
  ctxClock.strokeStyle = "#D40000";
  ctxClock.fillStyle = "#D40000";
  ctxClock.lineWidth = 6;
  ctxClock.beginPath();
  ctxClock.moveTo(-30, 0);
  ctxClock.lineTo(83, 0);
  ctxClock.stroke();
  ctxClock.beginPath();
  ctxClock.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctxClock.fill();
  ctxClock.beginPath();
  ctxClock.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctxClock.stroke();
  ctxClock.fillStyle = "rgb(0 0 0 / 0%)";
  ctxClock.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctxClock.fill();
  ctxClock.restore();

  ctxClock.beginPath();
  ctxClock.lineWidth = 14;
  ctxClock.strokeStyle = "#325FA2";
  ctxClock.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctxClock.stroke();

  ctxClock.restore();

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);
initSolarSystem();

// Desplazamiento de Imagen
const img = new Image();

img.src = "Foto.jpg";
const canvasXSize = 800;
const canvasYSize = 200;
const speed = 30;
const scale = 1.05;
const y = -4.5;

const dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctxImage;

img.onload = () => {
  imgW = img.width * scale;
  imgH = img.height * scale;

  if (imgW > canvasXSize) {
    x = canvasXSize - imgW;
  }

  clearX = Math.max(imgW, canvasXSize);
  clearY = Math.max(imgH, canvasYSize);

  ctxImage = document.getElementById("canvasImage").getContext("2d");

  setInterval(drawImage, speed);
};

function drawImage() {
  ctxImage.clearRect(0, 0, clearX, clearY);

  if (imgW <= canvasXSize) {
    if (x > canvasXSize) {
      x = -imgW + x;
    }

    if (x > 0) {
      ctxImage.drawImage(img, -imgW + x, y, imgW, imgH);
    }

    if (x - imgW > 0) {
      ctxImage.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
    }
  } else {
    if (x > canvasXSize) {
      x = canvasXSize - imgW;
    }

    if (x > canvasXSize - imgW) {
      ctxImage.drawImage(img, x - imgW + 1, y, imgW, imgH);
    }
  }

  ctxImage.drawImage(img, x, y, imgW, imgH);

  x += dx;
}
 // Se llama a la función init para iniciar la animación


