import { initMenu } from './core/menu';

// Wait for everything to be ready
window.addEventListener('load', () => {
  console.log('Window loaded, initializing menu');
  initMenu();
});