class Circle{
    constructor({color}){
        this.radius = minRadius;
        this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius;
        this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius;
        this.xd = (Math.random() - 0.5) * 10;
        this.yd = (Math.random() - 0.5) * 10;
        this.color = color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${this.color})`;
        ctx.strokeStyle = `rgba(${this.color})`;
        ctx.stroke();
        ctx.fill();
    }
    update(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.xd = -this.xd 
        }
        if (this.y + this.radius > innerWidth || this.y - this.radius < 0) {
            this.yd = -this.yd 
        }
        this.x += this.xd;
        this.y += this.yd;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius){
                this.radius += 1
            }
        } else if (this.radius > minRadius){
            this.radius -= 1
        }
        this.draw();
    }
}

const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");


let circleArray = [];
const maxRadius = 40;
const minRadius = 10;
const particleCount = 1000;

const mouse = {
    x: undefined,
    y: undefined
}

function init() {
    circleArray = [];
    for (let i = 0; i < particleCount; i++) {
        const color = `${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}`;
        circleArray.push(new Circle({color}));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
});

addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})
init();
animate();