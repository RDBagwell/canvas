class Circle{
    constructor({x, y, radius, color }){
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dx = 10;
        this.dy = 10;
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
        this.draw();
    }
}


const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");
const color1 = `${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}`;
const color2 = `${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}`;

let circle1;
let circle2;

const mouse = {
    x: undefined,
    y: undefined
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);
    circle1.update();
    circle2.update();
    const destance = getDistance(circle1.x, circle1.y, circle2.x, circle2.y);

    if (destance < circle1.radius + circle2.radius) {
        circle2.color = '255, 0, 0';
    } else {
        circle2.color = '0, 0, 0';
    }

}


function init() {
    circle1 = new Circle({x: 300, y: 300, radius: 50, color: color1 });
    circle2 = new Circle({x: 500, y: 500, radius: 100, color: color2 });
}

function getDistance(x1, y1, x2, y2) {
    let distanceX = x2 - x1;
    let distanceY = y2 - y1;
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)); 
}

addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

// addEventListener('click', ()=>{
// });

addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    circle1.x = mouse.x;
    circle1.y = mouse.y;
});

init();
animate();