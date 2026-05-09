/**
 * View Transition 生命周期管理器
 * 统一管理所有动画模块的初始化和销毁，防止 View Transitions 页面切换时资源泄漏
 */

export interface AnimationModule {
  init(): void;
  destroy(): void;
}

const modules: AnimationModule[] = [];
let initialized = false;

/** 注册动画模块 */
export function register(module: AnimationModule) {
  modules.push(module);
  // 如果管理器已经初始化过，立即初始化新注册的模块
  if (initialized) {
    module.init();
  }
}

/** 注销动画模块 */
export function unregister(module: AnimationModule) {
  const index = modules.indexOf(module);
  if (index > -1) {
    module.destroy();
    modules.splice(index, 1);
  }
}

/** 初始化所有已注册模块 */
function initAll() {
  modules.forEach((m) => m.init());
  initialized = true;
}

/** 销毁所有已注册模块 */
function destroyAll() {
  modules.forEach((m) => m.destroy());
}

// Astro View Transitions 生命周期钩子
// astro:page-load 在初始加载和每次 View Transition 导航后触发
document.addEventListener('astro:page-load', initAll);

// astro:before-swap 在 View Transition DOM 替换前触发
document.addEventListener('astro:before-swap', destroyAll);
