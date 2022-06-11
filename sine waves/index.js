class Sinwave {
    constructor(amp, waveLength) {
        this.amp = amp;
        this.waveLength = waveLength;
        this.y = canvas.height / 2;
        this.bg_r = 0;
        this.bg_g = 0;
        this.bg_b = 0;
        this.bg_a = 0.01;
        this.wave_r;
        this.wave_g;
        this.wave_b;
        this.wave_a;
    }
    draw(increment) {
        ctx.fillStyle = `rgba(${this.bg_r}, ${this.bg_g}, ${this.bg_b}, ${this.bg_a})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        for (let i = 0; i < canvas.width; i++) {
            ctx.lineTo(i, this.y  +  Math.sin( i * this.waveLength + increment) * this.amp);
        }
        ctx.strokeStyle = `rgba(${this.wave_r}, ${this.wave_g}, ${this.wave_b}, ${this.wave_a})`;
        ctx.stroke();      
    }
}

const wave_btn = document.querySelector('.wave_btn');
const bg_btn = document.querySelector('.bg_btn');
const wave_color_btn = document.querySelector('.wave_color_btn');

const ampInput = document.getElementById('amp');
const wavelengthInput = document.getElementById('wavelength');
const frequencyInput = document.getElementById('frequency');

const background_r = document.getElementById('background_r');
const background_g = document.getElementById('background_g');
const background_b = document.getElementById('background_b');
const background_a = document.getElementById('background_a');

const wave_r = document.getElementById('wave_r');
const wave_g = document.getElementById('wave_g');
const wave_b = document.getElementById('wave_b');
const wave_a = document.getElementById('wave_a');

const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");

const sinwave = new Sinwave(
    ampInput.value, 
    wavelengthInput.value
);
let increment = 0;
let incrementInput = parseFloat(frequencyInput.value);


function init(){
    sinwave.bg_r = background_r.value;
    sinwave.bg_g = background_g.value;
    sinwave.bg_b = background_b.value;
    sinwave.bg_a = background_a.value;

    sinwave.wave_r = wave_r.value;
    sinwave.wave_g = wave_g.value;
    sinwave.wave_b = wave_b.value;
    sinwave.wave_a = wave_a.value;
}


function animate() {
    requestAnimationFrame(animate);;
    sinwave.draw(increment);
    increment += incrementInput;
}

function toggleActive(elmClass) {
    document.querySelector(elmClass).classList.toggle('active');
}

// Event Listeners
addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

ampInput.addEventListener('change', (e)=>{
    sinwave.amp = e.target.value;
});

wavelengthInput.addEventListener('change', (e)=>{
    sinwave.waveLength = parseFloat(e.target.value);
});

frequencyInput.addEventListener('change', (e)=>{
    incrementInput = parseFloat(e.target.value);
});

// background color
background_r.addEventListener('change', (e)=>{
    sinwave.bg_r = e.target.value;
});

background_g.addEventListener('change', (e)=>{
    sinwave.bg_g = e.target.value;
});

background_b.addEventListener('change', (e)=>{
    sinwave.bg_b = e.target.value;
});

background_a.addEventListener('change', (e)=>{
    sinwave.bg_a = parseFloat(e.target.value);
});

// wave color
wave_r.addEventListener('change', (e)=>{
    sinwave.wave_r = e.target.value;
});

wave_g.addEventListener('change', (e)=>{
    sinwave.wave_g = e.target.value;
});

wave_b.addEventListener('change', (e)=>{
    sinwave.wave_b = e.target.value;
});

wave_a.addEventListener('change', (e)=>{
    sinwave.wave_a = parseFloat(e.target.value);
});


wave_btn.addEventListener('click', ()=>{
    document.querySelector('.wave_controls').classList.toggle('active');
});

bg_btn.addEventListener('click', ()=>{
    document.querySelector('.bg_controls').classList.toggle('active');
});

wave_color_btn.addEventListener('click', ()=>{
    document.querySelector('.wave_color_controls').classList.toggle('active');
});

init()
animate();
