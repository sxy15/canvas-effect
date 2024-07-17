class Particle {
  _w: number;
  _h: number;
  _speed: number;
  _size: number;
  _color: string;
  _ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  angle: number;
  speed: number;
  opacity: number;

  constructor(
    { width, height, speed, size, color, ctx} : 
    { width: number, height: number, speed: number, size: number, color: string, ctx: CanvasRenderingContext2D }) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * speed;
    this.opacity = Math.random() * 0.5 + 0.5;

    this._w = width;
    this._h = height;
    this._speed = speed;
    this._size = size;
    this._ctx = ctx;
    this._color = color;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    if (this.x < 0 || this.x > this._w || this.y < 0 || this.y > this._h) {
      this.x = Math.random() * this._w;
      this.y = Math.random() * this._h;
    }
  }

  draw() {
    const ctx = this._ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this._size, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }
}

export function particleLine(params: { id: string, count?: number, color?: string }) {
  const { id, count = 100, color = '255, 255, 255' } = params;
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!

  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;

  const particles: any[] = [];
  const particleCount = count; // 粒子数量
  const particleSpeed = 0.5; // 粒子速度
  const particleSize = 1; // 粒子大小
  const connectionDistance = 100; // 粒子连接距离
  const connectionOpacity = 0.5; // 粒子连接透明度
  const connectionLineColor = color; // 线条颜色

  function createParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle({
        width,
        height,
        speed: particleSpeed,
        size: particleSize,
        color: color,
        ctx
      }));
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${connectionLineColor}, ${connectionOpacity})`;
          ctx.lineWidth = 0.2 * (1 - distance / connectionDistance);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (const particle of particles) {
      particle.update();
      particle.draw();
    }

    drawConnections();

    requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    for (const particle of particles) {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < connectionDistance) {
        particle.angle = Math.atan2(dy, dx);
        particle.speed = 0.6;
      } else {
        particle.speed = Math.random() * particleSpeed;
      }
    }
  })

  window.addEventListener('resize', () => {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
  })

  createParticles();
  animate();
}