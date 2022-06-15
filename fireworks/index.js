// Particle Class
class Particle {
  constructor({x, y, radius, color, velocity}) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
      x: velocity.x,
      y: velocity.y 
    }
    this.alpha = 1 
  }

  draw() {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }

  update() {
    this.draw()
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.velocity.y += gravity
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.alpha -= 0.005
  }
}

const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");

const gravity = 0.005;
const friction = 0.99;

// Particle Variables
const particleCount = 400;
let particles = []
const colors = ['#800000', '#8E388E', '#7171C6', '#7D9EC0', '#388E8E', '#71C671', '#8E8E38', '#C5C1AA', '#C67171'];

const power = 4

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

// Implementation
function init() {
  particles = [];
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
  ctx.fillRect(0,0, innerWidth, innerHeight);
  particles.forEach((particle, i) => {
    if(particle.alpha > 0){
      particle.update();
    } else {
      particles.splice(i, 1);
    }
      
  })
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
addEventListener('resize', ()=>{
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

addEventListener('click', (e)=>{
  mouse.x = e.x;
  mouse.y = e.y;

  const angleIncrement = (Math.PI * 2) / particleCount;

  for (let i = 0; i < particleCount; i++) {
     particles.push(new Particle({
      x: mouse.x, 
      y: mouse.y, 
      radius: 2, 
      color: `hsl(${Math.random() * 360}, 50%, 50%)`, 
      velocity: {
        x: Math.cos(angleIncrement * i) * Math.random() * power, 
        y: Math.sin(angleIncrement * i) * Math.random() * power
      }}));
  }
});
init();
animate();