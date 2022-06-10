class Ball{
    constructor({color}){
        this.radius = 30;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.dx = Math.random() * 10;
        this.dy = Math.random() * 10;
        this.color = color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${this.color})`;
        ctx.fill();
    }
    update(){
        if(this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.dy * frection;
        } else {
           this.dy += garvity; 
        }

        if(this.x + this.radius + this.dx > canvas.width || this.x + this.radius + this.dx < 0){
            this.dx = -this.dx;
        }
        this.y += this.dy
        this.draw();
    }
}


const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");
const garvity = 1;
const frection = 0.95;
const ballCount = 1;

let ballArray = [];

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);
    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

function init() {
    ballArray = [];
    for (let i = 0; i < ballCount; i++) {
        const color = `${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}`;
        ballArray.push(new Ball({color}));
    }
}


addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

addEventListener('click', ()=>{
    init();
})

init();
animate();
