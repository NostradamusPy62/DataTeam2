document.addEventListener('DOMContentLoaded', function() {
    // Configuración del canvas interactivo
    const canvas = document.getElementById('interactive-canvas');
    const context = canvas.getContext('2d');
    let canvasWidth = canvas.offsetWidth;
    let canvasHeight = canvas.offsetHeight;
    
    // Redimensionar el canvas al tamaño correcto
    function resizeCanvas() {
      canvasWidth = canvas.offsetWidth;
      canvasHeight = canvas.offsetHeight;
      canvas.width = canvasWidth * window.devicePixelRatio;
      canvas.height = canvasHeight * window.devicePixelRatio;
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    // Llamar a resizeCanvas inicialmente y en cada cambio de tamaño
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Variables para el sistema de partículas
    let particles = [];
    let mouseTrail = [];
    const maxTrailLength = 20;
    let mouseX = 0;
    let mouseY = 0;
    let isDrawing = false;
    
    // Colores de la paleta Diamond
    const colors = [
      '#7ca2b1', // diamond-primary
      '#4f7f8c', // diamond-deep
      '#b9dae9', // diamond-light
      '#a5c6d5', // blue-soft
      '#2d5b67'  // blue-accent
    ];
    
    // Clase Partícula
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.color = color || colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 30 + Math.random() * 30;
        this.maxLife = this.life;
      }
      
      update() {
        this.x += this.speedX * 0.5;
        this.y += this.speedY * 0.5;
        this.life--;
        this.size = (this.life / this.maxLife) * 3;
      }
      
      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.globalAlpha = this.life / this.maxLife;
        context.fill();
        context.globalAlpha = 1;
      }
    }
    
    // Seguimiento del cursor
    canvas.addEventListener('mousemove', function(e) {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      
      // Añadir punto al trail
      mouseTrail.push({x: mouseX, y: mouseY});
      
      // Limitar el tamaño del trail
      if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
      }
      
      // Crear partículas cuando el mouse se mueve
      if (isDrawing) {
        for (let i = 0; i < 3; i++) {
          particles.push(new Particle(
            mouseX + Math.random() * 10 - 5,
            mouseY + Math.random() * 10 - 5
          ));
        }
      }
    });
    
    canvas.addEventListener('mouseenter', function() {
      isDrawing = true;
    });
    
    canvas.addEventListener('mouseleave', function() {
      isDrawing = false;
    });
    
    // Efectos especiales para iconos tecnológicos
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
      // Animación de flotación
      icon.style.animation = `floatAnimation ${3 + Math.random() * 2}s ease-in-out infinite`;
      icon.style.animationDelay = `${Math.random() * 2}s`;
      
      // Interacción con hover (usando enfoque moderno sin transiciones hover tradicionales)
      icon.addEventListener('mouseenter', function() {
        // Mostrar el texto del icono
        const span = this.querySelector('span');
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
        
        // Efecto de escala sutil usando GSAP-like easing
        this.style.transform = 'scale(1.1)';
        
        // Generar partículas especiales alrededor del icono
        const iconRect = this.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const iconCenterX = (iconRect.left + iconRect.width / 2) - canvasRect.left;
        const iconCenterY = (iconRect.top + iconRect.height / 2) - canvasRect.top;
        
        // Color basado en el ícono
        let particleColor;
        switch(this.getAttribute('data-icon')) {
          case 'raspberry': particleColor = '#c51a4a'; break; // Raspberry Pi color
          case 'python': particleColor = '#3776ab'; break;    // Python blue
          case 'arduino': particleColor = '#00979d'; break;   // Arduino teal
          case 'ai': particleColor = '#8e44ad'; break;        // Purple for AI
          case 'computer': particleColor = '#2c3e50'; break;  // Dark blue for computer
          default: particleColor = colors[0];
        }
        
        // Crear explosión de partículas
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 30 + Math.random() * 20;
          particles.push(new Particle(
            iconCenterX + Math.cos(angle) * distance,
            iconCenterY + Math.sin(angle) * distance,
            particleColor
          ));
        }
      });
      
      icon.addEventListener('mouseleave', function() {
        // Ocultar el texto del icono
        const span = this.querySelector('span');
        span.style.opacity = '0';
        span.style.transform = 'translateY(10px)';
        
        // Volver a la escala normal
        this.style.transform = 'scale(1)';
      });
    });
    
    // Animación principal
    function animate() {
      // Limpiar el canvas
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      
      // Dibujar el rastro del cursor
      if (mouseTrail.length > 1) {
        context.beginPath();
        context.moveTo(mouseTrail[0].x, mouseTrail[0].y);
        
        for (let i = 1; i < mouseTrail.length; i++) {
          context.lineTo(mouseTrail[i].x, mouseTrail[i].y);
        }
        
        context.strokeStyle = 'rgba(124, 162, 177, 0.3)';
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
      }
      
      // Actualizar y dibujar partículas
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        // Eliminar partículas muertas
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    // Iniciar la animación
    animate();
    
    // Cursor personalizado
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    
    // Efectos especiales en los enlaces y botones
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.backgroundColor = 'rgba(124, 162, 177, 0.15)';
      });
      
      element.addEventListener('mouseleave', function() {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'rgba(124, 162, 177, 0.3)';
      });
    });
    
    // Animación de las secciones al hacer scroll
    const sections = document.querySelectorAll('.about, .projects, .team-member, .project-card');
    sections.forEach(section => {
      section.classList.add('section-animate');
    });
    
    // Función para verificar si un elemento es visible en el viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    }
    
    // Verificar secciones visibles al hacer scroll
    function checkVisibility() {
      sections.forEach(section => {
        if (isInViewport(section)) {
          section.classList.add('is-visible');
        }
      });
    }
    
    // Verificar inicialmente y al hacer scroll
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    checkVisibility();
    
    // Efectos especiales para las tarjetas de proyectos (sin hover transitions)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      // Detector de proximidad del cursor (en vez de hover)
      document.addEventListener('mousemove', function(e) {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        // Calcular distancia al centro de la tarjeta
        const deltaX = e.clientX - cardCenterX;
        const deltaY = e.clientY - cardCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Solo aplicar efecto si el cursor está cerca
        if (distance < 300) {
          // Factor de proximidad (1 cuando está cerca, 0 cuando está lejos)
          const proximity = Math.max(0, 1 - distance / 300);
          
          // Transformación 3D sutil basada en la posición del cursor
          const tiltX = deltaY * 0.05 * proximity;
          const tiltY = -deltaX * 0.05 * proximity;
          
          card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${1 + proximity * 0.05})`;
          card.style.boxShadow = `0 ${15 + proximity * 15}px ${proximity * 40}px rgba(124, 162, 177, ${0.3 + proximity * 0.2})`;
          card.querySelector('img').style.transform = `scale(${1 + proximity * 0.05})`;
          card.querySelector('.card-body').style.transform = `translateZ(${proximity * 20}px)`;
          card.querySelector('::before').style.opacity = proximity * 0.5;
        } else {
          // Restablecer a valores predeterminados cuando el cursor está lejos
          card.style.transform = '';
          card.style.boxShadow = '';
          card.querySelector('img').style.transform = '';
          card.querySelector('.card-body').style.transform = '';
          card.querySelector('::before').style.opacity = '0';
        }
      });
    });
  });