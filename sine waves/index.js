class Sinwave {
    constructor(amp, waveLength, color) {
        this.amp = amp;
        this.waveLength = waveLength;
        this.color = color;
        this.y = canvas.height / 2;
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0.01;
    }
    draw(increment) {
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        for (let i = 0; i < canvas.width; i++) {
            ctx.lineTo(i, this.y  +  Math.sin( i * this.waveLength + increment) * this.amp);
        }
        ctx.strokeStyle = this.color
        ctx.stroke();      
    }
}

const ampInput = document.getElementById('amp');
const wavelengthInput = document.getElementById('wavelength');
const frequencyInput = document.getElementById('frequency');

const background_r = document.getElementById('background_r');
const background_g = document.getElementById('background_g');
const background_b = document.getElementById('background_b');
const background_a = document.getElementById('background_a');


const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");

const sinwave = new Sinwave(ampInput.value, wavelengthInput.value, "#00ff44");
let increment = 0;
let incrementInput = parseFloat(frequencyInput.value)
function animate() {
    requestAnimationFrame(animate);;
    sinwave.draw(increment);
    increment += incrementInput;
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

//
background_r.addEventListener('change', (e)=>{
    sinwave.r = e.target.value;
});

background_g.addEventListener('change', (e)=>{
    sinwave.g = e.target.value;
});

background_b.addEventListener('change', (e)=>{
    sinwave.b = e.target.value;
});

background_a.addEventListener('change', (e)=>{
    incrementInput = parseFloat(e.target.value);
});

animate();
