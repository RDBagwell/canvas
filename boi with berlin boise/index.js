import Particle from "./class/Particle.js";
import {canvas, ctx} from "./utils/Canvas.js";
import {noise} from "./utils/Noice.js";

canvas.width = innerWidth;
canvas.height = innerHeight;

// Particle Variables
const particleCount = 150;
let particles = [];
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

let time = 0;

for (let i = 0; i < particleCount; i++){
  particles.push(new Particle({
    x: noise(time + 20) * canvas.width, 
    y: noise(time) * canvas.height, 
    radius: 10, 
    color:randomColor(colors),
    offset: i * 0.01
  }));
}


function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'Black'
  ctx.fillRect(0,0, innerWidth, innerHeight);
  particles.forEach(circle => {
    circle.update();
    circle.x = noise(time + circle.offset + 20) * canvas.width;
    circle.y = noise(time + circle.offset) * canvas.height; 
  });
  

  time += 0.005;
}

// Utility Functions
function randomInitFormRang(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDistance(x1, y1, x2, y2) {
  let distanceX = x2 - x1;
  let distanceY = y2 - y1;
  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)); 
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

animate();