/**
 * GSAP ScrollTrigger 滚动动画系统
 * 注册全局 scroll reveal 效果
 */

import { register, type AnimationModule } from './view-transition-manager';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scrollAnimModule: AnimationModule = {
  triggers: [] as ScrollTrigger[],

  init() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const yDistance = isMobile ? 15 : 30;
    const duration = isMobile ? 0.5 : 0.8;

    // .reveal-fade-up: 从下方淡入上移
    document.querySelectorAll('.reveal-fade-up').forEach((el) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration,
            ease: 'power2.out',
          });
        },
      });
      this.triggers.push(trigger);
      // 设置初始状态
      gsap.set(el, { opacity: 0, y: yDistance });
    });

    // .reveal-fade-left: 从右侧淡入左移
    document.querySelectorAll('.reveal-fade-left').forEach((el) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            duration,
            ease: 'power2.out',
          });
        },
      });
      this.triggers.push(trigger);
      gsap.set(el, { opacity: 0, x: yDistance });
    });

    // .reveal-scale: 缩放淡入
    document.querySelectorAll('.reveal-scale').forEach((el) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration,
            ease: 'power2.out',
          });
        },
      });
      this.triggers.push(trigger);
      gsap.set(el, { opacity: 0, scale: 0.95 });
    });

    // .reveal-stagger: 子元素依次出现
    document.querySelectorAll('.reveal-stagger').forEach((container) => {
      const children = container.children;
      if (children.length === 0) return;

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.4 : 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          });
        },
      });
      this.triggers.push(trigger);
      gsap.set(children, { opacity: 0, y: 20 });
    });

    // 滚动进度条
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          (progressBar as HTMLElement).style.width = `${self.progress * 100}%`;
        },
      });
      this.triggers.push(trigger);
    }

    ScrollTrigger.refresh();
  },

  destroy() {
    this.triggers.forEach((t) => t.kill());
    this.triggers = [];
  }
};

register(scrollAnimModule);
