// Particle Class
class Particle {
  constructor({x, y, radius, color}) {
    this.x = x
    this.y = y
    this.radius = radius || 0
    this.color = color
    this.velocity = {
      x: randomInitFormRang(-15, 15),
      y: 3
    }
    this.friction = .8
    this.gravity = 1
    this.numberOfShards = 8
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = '#E3EAEF';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.draw()
      this.y += this.velocity.y;
      this.x += this.velocity.x;

      if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
        this.velocity.y = -this.velocity.y * this.friction;
        this.shatter();
      } else {
        this.velocity.y += this.gravity;
      }
      if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0 ) {
        this.velocity.x = -this.velocity.x;
        this.shatter();
      }
      
  }

  shatter(){
    this.radius -= 10
    if(this.radius < 0)this.radius = 0;
    for (let i = 0; i < this.numberOfShards; i++) {
      ministars.push(new MiniStar({x: this.x, y: this.y, radius: randomInitFormRang(1, 2)}))
    }
  }

}

class MiniStar extends Particle{
  constructor({x, y, radius, color}){
    super({x, y, radius, color})
    this.friction = .8
    this.gravity = 0.3
    this.velocity = {
      x: randomInitFormRang(-5, 5),
      y: randomInitFormRang(-15, 15)
    }
    this.ttl = 100
    this.opacity = 1
  }
  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.shadowColor = '#E3EAEF';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.draw()
      this.y += this.velocity.y;
      this.x += this.velocity.x;
      this.ttl -= 1;
      this.opacity -= 1 / this.ttl;

      if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
        this.velocity.y = -this.velocity.y * this.friction
      } else {
        this.velocity.y += this.gravity 
      }
  }
}

const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");

const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
backgroundGradient.addColorStop(0, "black");
backgroundGradient.addColorStop(1, "#001520");

// Particle Variables
const particleCount = 1;
const backgroundStarsCount = 150;
const groundHeight = 200;
let particles;
let ministars;
let backgroundStars;
let ticker = 0;
let spawnRate = 75


// Implementation
function init() {
  particles = [];
  ministars = [];
  backgroundStars = []
  for (let i = 0; i < particleCount; i++) {
    const radius = randomInitFormRang(6, 18);
    const x = randomInitFormRang(radius, canvas.width - radius);
    const y = radius;
    particles.push( new Particle({x, y, radius, color: "white"}) );
  }

  for (let i = 0; i < backgroundStarsCount; i++) {
    const x = randomInitFormRang(0, canvas.width);
    const y = randomInitFormRang(0, canvas.height);
    const radius = Math.random() * 3 
    backgroundStars.push( new Particle({x, y, radius, color: "white"}));
    
  }
}

function createMountainRange(mountainAmount, height, color){
  for (let i = 0; i < mountainAmount; i++) {
    const mountainWidth = canvas.width / mountainAmount
    ctx.beginPath();
    ctx.moveTo(i * mountainWidth, canvas.height);
    ctx.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
    ctx.lineTo(i * mountainWidth + mountainWidth / 2,  canvas.height - height);
    ctx.lineTo(i * mountainWidth - 325, canvas.height);
    ctx.fillStyle = color
    ctx.fill();
    ctx.closePath();
  }
}


function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = backgroundGradient
  ctx.fillRect(0,0, innerWidth, innerHeight);
  backgroundStars.forEach(backgroundStar=>{
    backgroundStar.draw();
  });
  createMountainRange(1, canvas.height / 2 - 50, "#221133");
  createMountainRange(2, canvas.height / 2 - 100, "#442266");
  createMountainRange(3, canvas.height / 2 - 300 , "#8844aa");

  ctx.fillStyle = '#182028'
  ctx.fillRect(0,canvas.height - groundHeight, innerWidth, groundHeight)

  particles.forEach((particle, index) => {
      particle.update();
      if(particle.radius === 0 ){
        particles.splice(index, 1);
      }
  });
  ministars.forEach((ministar, index) => {
      ministar.update();
      if(ministar.ttl === 0 ){
        ministars.splice(index, 1);
      }
  });
  ticker++;
  if(ticker % spawnRate === 0){
    const radius = randomInitFormRang(6, 18);
    const x = randomInitFormRang(radius, canvas.width - radius);
    const y = radius;
    particles.push( new Particle({x, y, radius, color: "white"}));
    spawnRate = randomInitFormRang(75, 100)
  }
}

// Utility Functions
function randomInitFormRang(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Event Listeners
addEventListener('resize', ()=>{
  init();
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

init();
animate();