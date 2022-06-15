import {ctx} from "../utils/Canvas.js";


class Particle {
    constructor({x, y, radius, color, offset}) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.offset = offset
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
    }
  }

  export default Particle