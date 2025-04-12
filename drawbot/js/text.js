/**
 * DrawBot - Efecto de escritura con cursor parpadeante
 * Este script crea un efecto de escritura para el título principal "DrawBot"
 * seguido por un cursor parpadeante que se detiene al terminar
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el elemento h1 con el título "DrawBot"
    const titleElement = document.querySelector('.hero h1');
    
    if (!titleElement) return; // Salir si no encuentra el elemento
    
    // Texto original
    const originalText = titleElement.textContent.trim();
    // Limpiar el contenido inicial
    titleElement.textContent = '';
    
    // Crear el span para el texto que se va a escribir
    const textSpan = document.createElement('span');
    textSpan.className = 'typing-text';
    titleElement.appendChild(textSpan);
    
    // Crear el span para el cursor
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typing-cursor';
    cursorSpan.innerHTML = '|';
    titleElement.appendChild(cursorSpan);
    
    // Función para escribir el texto letra por letra
    function typeText(text, index = 0) {
      // Si hemos llegado al final del texto
      if (index >= text.length) {
        // Mantener el cursor parpadeando por un momento y luego detenerlo
        setTimeout(() => {
          cursorSpan.classList.add('typing-cursor-stop');
          
          // Después de 2 segundos, reiniciar la animación
          setTimeout(() => {
            textSpan.textContent = '';
            cursorSpan.classList.remove('typing-cursor-stop');
            typeText(text);
          }, 2000);
        }, 500);
        return;
      }
      
      // Añadir la siguiente letra
      textSpan.textContent += text.charAt(index);
      
      // Programar la siguiente letra
      setTimeout(() => {
        typeText(text, index + 1);
      }, 150); // Velocidad de escritura (ajustable)
    }
    
    // Iniciar el efecto de escritura
    typeText(originalText);
  });