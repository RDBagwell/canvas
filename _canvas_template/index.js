// Particle Class
class Particle {
  constructor({x, y, radius, color}) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update() {
    this.draw()
  }
}

const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

// Particle Variables
const particleCount = 1;
let particles = []
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Implementation
function init() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    // particles.push();
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, innerWidth, innerHeight);
  // particles.forEach(particle => {
  //     particle.update();
  // })
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

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
});

addEventListener('resize', ()=>{
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

init();
animate();