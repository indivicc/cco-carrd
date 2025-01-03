import { ccoLogo } from './logo';

export function initMenu() {
  const menuHTML = `
    ${ccoLogo}
    <div id="menu-container">
      <button id="menu-toggle">
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <g class="symbol">
            <path class="cross-path" d="M15 30 h30 M30 15 v30" stroke="#3856DD" stroke-width="3" opacity="0.8"/>
          </g>
          <g class="donut">
            <circle cx="30" cy="30" r="15" fill="#3856DD" opacity="0.8"/>
            <circle cx="30" cy="30" r="7.5" fill="#FFF6F0" opacity="0.8"/>
          </g>
        </svg>
      </button>
    </div>

    <div id="menu-overlay">
      <div id="menu-content">
        <a href="#shop" class="menu-link">shop</a>
        <a href="#sold" class="menu-link sold-link">sold</a>
        <a href="#about" class="menu-link">about</a>
        <a href="#how-it-works" class="menu-link">how it works</a>
      </div>
      <div id="carbon-copy-container">
        <div class="scroll-gradient"></div>
        <div id="carbon-copy">one-of-a-kind prints, sold exclusively to one customer. choose your favorite and make it yours.</div>
        <div class="scroll-indicator">carbon copy originals</div>
      </div>
    </div>
  `;

  // Add menu styles
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400;700&display=swap');
    
    :root {
      --menu-bg: #3856DD;
      --text-color: #FFF6F0;
      --transition-time: 0.5s;
    }

    #cco-logo {
      position: fixed;
      top: 20px;
      left: 20px;
      width: 120px;
      height: auto;
      z-index: 1000;
      transition: opacity 0.3s ease;
      opacity: 1;
      visibility: visible;
    }

    #cco-logo path,
    #cco-logo rect,
    #cco-logo line {
      transition: all var(--transition-time) ease;
    }

    .menu-open #cco-logo path,
    .menu-open #cco-logo rect,
    .menu-open #cco-logo line {
      fill: var(--text-color) !important;
      stroke: var(--text-color) !important;
    }

    #menu-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }

    #menu-toggle {
      background: none;
      border: none;
      cursor: pointer;
      width: 40px;
      height: 40px;
      padding: 0;
      position: relative;
      z-index: 1002;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #menu-toggle svg {
      width: 100%;
      height: 100%;
      transition: transform 0.5s ease;
    }

    #menu-toggle path,
    #menu-toggle line,
    #menu-toggle circle {
      transition: all 0.5s ease;
    }

    .menu-open #menu-toggle svg {
      transform: rotate(45deg);
    }

    .menu-open #menu-toggle .cross-path {
      stroke: var(--text-color);
    }

    #menu-toggle:hover .symbol {
      opacity: 0;
    }

    #menu-toggle:hover .donut {
      opacity: 1;
    }

    .symbol {
      opacity: 1;
      transition: opacity 0.3s ease;
    }

    .donut {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    #menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 0;
      background-color: var(--menu-bg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: height var(--transition-time) ease;
      z-index: 1001;
    }

    #menu-content {
      opacity: 0;
      transition: opacity var(--transition-time) ease;
      text-align: center;
      margin-bottom: 180px;
    }

    .menu-open #menu-overlay {
      height: 100vh;
    }

    .menu-open #menu-content {
      opacity: 1;
    }

    .menu-link {
      display: block;
      color: var(--text-color);
      font-size: 3.5rem;
      font-weight: normal;
      text-decoration: none;
      margin: 20px 0;
      transition: transform 0.3s ease;
      text-transform: lowercase;
      letter-spacing: 2px;
    }

    .sold-link {
      font-style: italic;
    }

    .menu-link:hover {
      transform: scale(1.1);
    }

    #carbon-copy-container {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 90%;
    }

    #carbon-copy {
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.2rem;
      font-style: italic;
      letter-spacing: 3px;
      text-transform: lowercase;
      width: 100%;
      max-height: 120px;
      overflow-y: auto;
      padding: 0 20px 20px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
      line-height: 1.6;
      text-align: center;
      position: relative;
    }

    @media screen and (max-width: 767px) {
      #carbon-copy-container {
        bottom: 60px;
        max-width: 85%;
      }
      #cco-logo {
        width: 100px;
      }
      #carbon-copy {
        max-height: 100px;
        font-size: 1rem;
        padding-bottom: 25px;
      }
      .menu-link {
        font-size: 2.5rem;
        margin: 15px 0;
      }
      #menu-content {
        margin-bottom: 40px;
      }
    }
  `;

  // Initialize menu functionality
  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', menuHTML);
    document.head.appendChild(style);

    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.querySelectorAll('.menu-link');
    const logo = document.getElementById('cco-logo');

    function toggleMenu() {
      document.body.classList.toggle('menu-open');
    }

    menuToggle.addEventListener('click', toggleMenu);
    
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu();
      });
    });

    window.addEventListener('scroll', () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent <= 0.1) {
        const opacity = 1 - (scrollPercent / 0.1);
        logo.style.opacity = opacity;
        logo.style.visibility = opacity > 0 ? 'visible' : 'hidden';
      } else {
        logo.style.opacity = 0;
        logo.style.visibility = 'hidden';
      }
    });
  });
}