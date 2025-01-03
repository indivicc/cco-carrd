// CCO Custom Cursor implementation
export const shapes = {
  circle: `
    <circle cx="30" cy="30" r="15" fill="#3856DD" opacity="0.8"/>
    <circle cx="30" cy="30" r="7.5" fill="#FFF6F0" opacity="0.8"/>
  `,
  square: `
    <rect x="15" y="15" width="30" height="30" fill="#3856DD" opacity="0.8"/>
  `,
  diamond: `
    <path d="M30 15 l 15 15 l -15 15 l -15 -15 z" fill="#3856DD" opacity="0.8"/>
  `,
  cross: `
    <path d="M15 30 h30 M30 15 v30" stroke="#3856DD" stroke-width="3" opacity="0.8"/>
  `,
  triangle: `
    <path d="M30 15 l 15 30 h-30 z" fill="#3856DD" opacity="0.8"/>
  `
};

function updateCursorShape(cursor, shape, rotation = 0) {
  cursor.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"
      style="transform: rotate(${rotation}deg); transition: transform 0.2s ease">
      ${shapes[shape]}
    </svg>
  `;
}

export function initCursor() {
  const cursor = document.createElement('div');
  cursor.id = 'cursor';
  cursor.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
  `;
  
  document.body.appendChild(cursor);
  
  // Add cursor styles
  const style = document.createElement('style');
  style.textContent = `* { cursor: none !important; }`;
  document.head.appendChild(style);
  
  let lastX = 0;
  let lastY = 0;
  let lastTime = Date.now();
  
  // Mouse movement handler
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTime;
    
    if (timeDiff > 50) {
      const xDiff = e.clientX - lastX;
      const yDiff = e.clientY - lastY;
      const speed = Math.sqrt(xDiff * xDiff + yDiff * yDiff) / timeDiff;
      
      if (speed < 0.1) {
        updateCursorShape(cursor, 'circle');
        cursor.style.width = '30px';
        cursor.style.height = '30px';
      } else if (Math.abs(yDiff) > Math.abs(xDiff) * 1.5) {
        updateCursorShape(cursor, 'triangle', yDiff > 0 ? 180 : 0);
        cursor.style.width = '35px';
        cursor.style.height = '35px';
      } else if (Math.abs(xDiff) > Math.abs(yDiff) * 1.5) {
        updateCursorShape(cursor, 'triangle', xDiff > 0 ? 90 : -90);
        cursor.style.width = '35px';
        cursor.style.height = '35px';
      } else {
        updateCursorShape(cursor, 'diamond');
        cursor.style.width = '35px';
        cursor.style.height = '35px';
      }
      
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = currentTime;
    }
  });
  
  // Window boundary handling
  document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
  });
}