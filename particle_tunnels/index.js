// Particle Class
class Particle {
  constructor({x, y, radius, color, velocity}) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.ttl = 1000
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl--
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
const particleCount = 30;
let particles = []

function geterateRing() {
  
  setTimeout(geterateRing, 500);

  for (let i = 0; i < particleCount; i++) {
    const radian = (Math.PI * 2) / particleCount;
    const x = mouse.x;
    const y = mouse.y;
    const hueIncament = 360 / particleCount
    particles.push(new Particle({
      x, 
      y, 
      radius: 5, 
      color:`hsl(${hueIncament * i}, 100%, 50%)`,
      velocity: {
        x: Math.cos(radian * i),
        y: Math.sin(radian * i)
      }
    }));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0,0, innerWidth, innerHeight);
  particles.forEach((particle, i) => {
    if(particle.ttl < 0){
      particles.slice(i, i)
    } else {
      particle.update();
    }
      
  })
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

// init();
animate();
geterateRing();