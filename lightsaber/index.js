import gsap from "./node_modules/gsap/gsap-core.js";

// Particle Class
class Particle {
  constructor({x, y, radius, color, distanceFormCenter}) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.distanceFormCenter = distanceFormCenter
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
    this.x = canvas.width / 2 + this.distanceFormCenter  * Math.cos(angle);
    this.y = canvas.height / 2 + this.distanceFormCenter  * Math.sin(angle)
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
const particleCount = 300;
let particles = []
let hue = 90;
let angle = 0;

// Implementation
function init() {
  particles = [];
  const hueIncament = 360 / particleCount
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle({
      x: canvas.width / 2 + i * Math.cos(Math.PI), 
      y: canvas.height / 2 + i * Math.sin(Math.PI), 
      radius: 5, 
      color: `hsl(${hueIncament * i}, 50%, 50%)`,
      distanceFormCenter: i 
    }));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0,0, innerWidth, innerHeight);
  particles.forEach(particle => {
      particle.update();
  })
}


// Event Listeners
addEventListener('mousemove', (event) => {
  gsap.to(mouse, {
    x: event.clientX - canvas.width / 2, 
    y: event.clientY - canvas.height / 2,
    duration: 1
  });

  angle = Math.atan2(mouse.y, mouse.x);
});

addEventListener('resize', ()=>{
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

init();
animate();