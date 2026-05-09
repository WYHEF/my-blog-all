/**
 * 鼠标追踪光晕效果
 * 柔和的 radial-gradient 跟随鼠标移动
 */

import { register, type AnimationModule } from './view-transition-manager';

const cursorGlowModule: AnimationModule = {
  glow: null as HTMLElement | null,
  animationId: null as number | null,
  mouse: { x: 0, y: 0 },
  current: { x: 0, y: 0 },
  isMobile: false,
  reducedMotion: false,
  _handleMouse: null as ((e: MouseEvent) => void) | null,

  init() {
    this.isMobile = window.innerWidth < 768;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.isMobile || this.reducedMotion) return;

    this.glow = document.getElementById('cursor-glow');
    if (!this.glow) return;

    this._handleMouse = (e: MouseEvent) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.glow?.classList.add('active');
    };

    window.addEventListener('mousemove', this._handleMouse);

    // 鼠标离开窗口时隐藏光晕
    document.addEventListener('mouseleave', () => {
      this.glow?.classList.remove('active');
    });

    this.animate();
  },

  animate() {
    if (!this.glow) return;

    // 平滑跟随 (lerp)
    this.current.x += (this.mouse.x - this.current.x) * 0.1;
    this.current.y += (this.mouse.y - this.current.y) * 0.1;

    this.glow.style.transform = `translate(${this.current.x - 200}px, ${this.current.y - 200}px)`;

    this.animationId = requestAnimationFrame(() => this.animate());
  },

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this._handleMouse) {
      window.removeEventListener('mousemove', this._handleMouse);
    }
    this.glow = null;
  }
};

register(cursorGlowModule);
