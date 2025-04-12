  /* Script para implementar el efecto de rastro de letras del cursor */
  document.addEventListener('DOMContentLoaded', function() {
    // Letras para el efecto de cursor
    const letters = ['R', 'A', 'S', 'P', 'B', 'O', 'T'];
    let letterIndex = 0;
    let lastCursorPosition = { x: 0, y: 0 };
    let lastLetterTime = 0;
    
    // Crear contenedor para el efecto
    const cursorEffectContainer = document.createElement('div');
    cursorEffectContainer.className = 'cursor-writing-effect';
    document.body.appendChild(cursorEffectContainer);
    
    // Seguimiento del cursor
    document.addEventListener('mousemove', function(e) {
      lastCursorPosition.x = e.clientX;
      lastCursorPosition.y = e.clientY;
      
      const now = Date.now();
      // Añadir letra cada 100ms mientras se mueve
      if (now - lastLetterTime > 150) {
        createLetterAtCursor(lastCursorPosition.x, lastCursorPosition.y, letters[letterIndex]);
        letterIndex = (letterIndex + 1) % letters.length;
        lastLetterTime = now;
      }
    });
    
    // Función para crear letra en la posición del cursor
    function createLetterAtCursor(x, y, letter) {
      const letterElement = document.createElement('div');
      letterElement.className = 'cursor-letter';
      letterElement.textContent = letter;
      letterElement.style.left = `${x}px`;
      letterElement.style.top = `${y}px`;
      letterElement.style.fontSize = `${16 + Math.random() * 8}px`; // Tamaño aleatorio entre 16-24px
      
      cursorEffectContainer.appendChild(letterElement);
      
      // Eliminar letra después de la animación
      setTimeout(() => {
        if (letterElement.parentNode === cursorEffectContainer) {
          cursorEffectContainer.removeChild(letterElement);
        }
      }, 1500);
    }
    
    // Añadir event listeners para interacciones
    document.querySelectorAll('.info-card, .flip-card, .about-card, .btn, .nav-link').forEach(el => {
      el.addEventListener('mouseenter', function(e) {
        // Actualizar variables CSS para efecto de gradiente
        this.style.setProperty('--x', `${e.offsetX}px`);
        this.style.setProperty('--y', `${e.offsetY}px`);
      });
    });
  });