/**
 * Canvas 2D 粒子星空背景
 * 鼠标交互 + 粒子连线 + 漂移效果
 */

import { register, type AnimationModule } from './view-transition-manager';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  targetOpacity: number;
}

const DESKTOP_COUNT = 80;
const MOBILE_COUNT = 30;
const LINE_DISTANCE = 120;
const MOUSE_RADIUS = 150;

const particleModule: AnimationModule = {
  canvas: null as HTMLCanvasElement | null,
  ctx: null as CanvasRenderingContext2D | null,
  particles: [] as Particle[],
  animationId: null as number | null,
  mouse: { x: -1000, y: -1000 },
  isMobile: false,
  reducedMotion: false,

  init() {
    this.canvas = document.getElementById('particle-bg') as HTMLCanvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;

    this.isMobile = window.innerWidth < 768;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.resize();
    this.createParticles();
    this.bindEvents();
    if (!this.reducedMotion) {
      this.animate();
    } else {
      this.drawStatic();
    }
  },

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  createParticles() {
    const count = this.isMobile ? MOBILE_COUNT : DESKTOP_COUNT;
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * (this.canvas?.width || window.innerWidth),
        y: Math.random() * (this.canvas?.height || window.innerHeight),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        targetOpacity: Math.random() * 0.5 + 0.2,
      });
    }
  },

  bindEvents() {
    const handleResize = () => {
      this.resize();
      this.isMobile = window.innerWidth < 768;
    };

    const handleMouse = (e: MouseEvent) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    if (!this.isMobile) {
      window.addEventListener('mousemove', handleMouse);
    }

    // 存储引用以便销毁
    this._handleResize = handleResize;
    this._handleMouse = handleMouse;
  },

  _handleResize: null as (() => void) | null,
  _handleMouse: null as ((e: MouseEvent) => void) | null,

  animate() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 更新和绘制粒子
    for (const p of this.particles) {
      // 漂移
      p.x += p.vx;
      p.y += p.vy;

      // 边界循环
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // 鼠标交互（仅桌面端）
      if (!this.isMobile) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.x += dx * force * 0.02;
          p.y += dy * force * 0.02;
          p.targetOpacity = Math.min(1, p.opacity + force * 0.5);
        } else {
          p.targetOpacity = p.opacity;
        }
      }

      // 闪烁效果
      const currentOpacity = p.targetOpacity + Math.sin(Date.now() * 0.001 + p.x) * 0.1;

      // 绘制粒子
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, currentOpacity))})`;
      this.ctx.fill();
    }

    // 绘制连线
    if (!this.isMobile) {
      this.ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      this.ctx.lineWidth = 0.5;
      this.ctx.beginPath();

      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < LINE_DISTANCE) {
            const alpha = (1 - dist / LINE_DISTANCE) * 0.15;
            this.ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          }
        }
      }
      this.ctx.stroke();
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  },

  drawStatic() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      this.ctx.fill();
    }
  },

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this._handleResize) {
      window.removeEventListener('resize', this._handleResize);
    }
    if (this._handleMouse) {
      window.removeEventListener('mousemove', this._handleMouse);
    }
    this.particles = [];
    this.ctx = null;
    this.canvas = null;
  }
};

register(particleModule);
