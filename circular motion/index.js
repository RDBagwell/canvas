class Particle{
    constructor({x, y, radius, color }){
        this.radius = radius;
        this._x = x;
        this._y = y;
        this.x = x;
        this.y = y;
        this.velocity = 0.05;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.distanceFromCenter = randomInitFormRang(50, 120);
        this.lastMouse = {x: x, y: y}
    }
    draw(lastPoint){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }
    update(){
        const lastPoint = {x: this.x, y: this.y}
        
        this.radians += this.velocity;

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        this.x = mouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = mouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    }
}

const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");

// Particle variables
const particleCount = 50;
const colors = ['#2185C5', '#7ECEFD', '#00FFff', '#757F99']
let particles = []


// Mis variables
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}


function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        const color = randomColor(colors);
        const radius = randomInitFormRang(1, 2);
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        particles.push(new Particle({x,y,radius,color}));
    }
}

function animate() {
    requestAnimationFrame(animate);
    // ctx.clearRect(0,0, innerWidth, innerHeight);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle)=>{
        particle.update()
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
    return colors[Math.floor(Math.random() * colors.length)]
  }

// Event Listeners
// addEventListener('mousemove', (event) => {
//     mouse.x = event.clientX
//     mouse.y = event.clientY
//   })

addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

init();
animate();