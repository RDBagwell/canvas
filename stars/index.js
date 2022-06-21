// Particle Class
class Particle {
  constructor({x, y, radius, color}) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw()
  }
}

const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");


const rotattionSpeed = 0.003;

// Particle Variables
const particleCount = 2000;
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
let particles = [];

let radians = 0;
let alpha = 1;

let mouseDown = false;

// Implementation
function init() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    const canvasWidth = canvas.width * 2;
    const canvasHeight = canvas.height * 2 ;
    const x = Math.random() * canvasWidth - canvas.width / 2;
    const y = Math.random() * canvasHeight - canvas.height / 2;
    const radius = Math.random() * 2
    particles.push(new Particle({x, y, radius, color: randomColor(colors)}));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = `rgba(0,0,20, ${alpha})` 
  ctx.fillRect(0,0, innerWidth, innerHeight);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate(radians)
  particles.forEach(particle => {
      particle.update();
  });
  ctx.restore();
  radians += rotattionSpeed;


  if(mouseDown && alpha > 0.03){
    alpha -= 0.01;
  } else if (!mouseDown && alpha < 1){
    alpha += 0.01;
  }
}

// Utility Functions
function randomInitFormRang(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Event Listeners
addEventListener('mousedown', () => {
  mouseDown = true;
});

addEventListener('mouseup', (event) => {
  mouseDown = false;
});

addEventListener('resize', ()=>{
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

init();
animate();