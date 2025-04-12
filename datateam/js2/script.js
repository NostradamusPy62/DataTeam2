/* ✨🌌 DATATEAM - JAVASCRIPT AVANZADO 🌌✨ */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar todas las funcionalidades
  initializeLoadingScreen();
  initializeNavbarEffects();
  initializeCosmicHeader();
  initializeFloatingIcons();
  initializeAnimationsOnScroll();
  initializeTeamCardInteractions();
  initializeParallaxEffects();
});

// ============================================================
// Función para pantalla de carga inicial
// ============================================================
function initializeLoadingScreen() {
  // Crear la pantalla de carga
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading-message';
  loadingScreen.innerHTML = `
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <h2 style="color: var(--accent); font-family: var(--font-display);">DataTeam</h2>
      <p style="color: var(--text-secondary);">Cargando experiencia interactiva...</p>
    </div>
  `;
  document.body.appendChild(loadingScreen);

  // Ocultar la pantalla de carga después de que todo se haya cargado
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      // Eliminar del DOM después de la animación
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1500); // Mostrar por al menos 1.5 segundos
  });
}

// ============================================================
// Función para inicializar el cursor personalizado - ELIMINADA
// ============================================================

// ============================================================
// Función para efectos en la navbar
// ============================================================
function initializeNavbarEffects() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  // Efecto al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Efecto hover avanzado en los links de navegación
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      const highlightEffect = document.createElement('span');
      highlightEffect.className = 'nav-highlight';
      highlightEffect.style.position = 'absolute';
      highlightEffect.style.bottom = '0';
      highlightEffect.style.left = '50%';
      highlightEffect.style.width = '5px';
      highlightEffect.style.height = '5px';
      highlightEffect.style.borderRadius = '50%';
      highlightEffect.style.background = 'var(--diamond-primary)';
      highlightEffect.style.transform = 'translateX(-50%)';
      highlightEffect.style.opacity = '0.8';
      highlightEffect.style.filter = 'blur(2px)';
      highlightEffect.style.boxShadow = '0 0 10px var(--diamond-primary)';
      highlightEffect.style.transition = 'all 0.3s';
      
      link.appendChild(highlightEffect);
      
      setTimeout(() => {
        highlightEffect.style.width = '100%';
        highlightEffect.style.borderRadius = '3px';
        highlightEffect.style.height = '2px';
        highlightEffect.style.opacity = '1';
        highlightEffect.style.filter = 'blur(0)';
      }, 50);
    });
    
    link.addEventListener('mouseleave', (e) => {
      const highlight = link.querySelector('.nav-highlight');
      if (highlight) {
        highlight.style.width = '5px';
        highlight.style.opacity = '0';
        
        setTimeout(() => {
          highlight.remove();
        }, 300);
      }
    });
  });
}

// ============================================================
// Función para el header cósmico con estrellas fugaces
// ============================================================
function initializeCosmicHeader() {
  // Crear el contenedor para efectos cósmicos
  const cosmicHeader = document.createElement('div');
  cosmicHeader.id = 'cosmic-header';
  
  // Obtener la sección hero para añadir el header cósmico
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  heroSection.appendChild(cosmicHeader);
  
  // Añadir estrellas de fondo
  createStarField(cosmicHeader);
  
  // Programar las estrellas fugaces cada 3 segundos
  setInterval(() => {
    createShootingStar(cosmicHeader);
  }, 3000);
  
  // Lista de palabras inspiradoras para mostrar
  const inspirationalWords = [
    'Imagina', 'Construye', 'Diviértete', 'Aprende', 
    'Raspbot', 'Drawbot', 'DataTeam'
  ];
  
  // Mostrar una palabra inspiradora cada 5 segundos
  let wordIndex = 0;
  setInterval(() => {
    const word = inspirationalWords[wordIndex];
    createCosmicWord(word, cosmicHeader);
    
    wordIndex = (wordIndex + 1) % inspirationalWords.length;
  }, 5000);
}

// Crear un campo de estrellas en el fondo
function createStarField(container) {
  const starCount = 100;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 3 + 1}px`;
    star.style.height = star.style.width;
    star.style.opacity = Math.random() * 0.8 + 0.2;
    star.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(star);
  }
}

// Crear una estrella fugaz en una posición aleatoria
function createShootingStar(container) {
  // Crear el contenedor de la estrella fugaz
  const shootingStarContainer = document.createElement('div');
  shootingStarContainer.className = 'shooting-star-container';
  shootingStarContainer.style.position = 'absolute';
  shootingStarContainer.style.top = `${Math.random() * 70}%`;
  shootingStarContainer.style.left = `${Math.random() * 70}%`;
  shootingStarContainer.style.zIndex = '2';
  shootingStarContainer.style.transform = `rotate(${Math.random() * 45 - 22.5}deg)`;
  
  // Crear la estrella
  const star = document.createElement('div');
  star.className = 'shooting-star';
  
  // Crear la estela
  const trail = document.createElement('div');
  trail.className = 'star-trail';
  
  // Añadir elementos al DOM
  shootingStarContainer.appendChild(star);
  shootingStarContainer.appendChild(trail);
  container.appendChild(shootingStarContainer);
  
  // Animar la estrella fugaz
  const duration = 1000 + Math.random() * 1000; // 1-2 segundos
  const distance = 100 + Math.random() * 150; // 100-250px
  
  // Animación de la estrella
  star.style.opacity = '1';
  star.style.filter = 'drop-shadow(0 0 10px var(--diamond-light))';
  
  // Animación de la estela
  trail.style.opacity = '0.7';
  trail.style.width = `${distance}px`;
  trail.style.transform = 'scaleX(1)';
  
  // Movimiento
  shootingStarContainer.style.transition = `transform ${duration/1000}s linear`;
  shootingStarContainer.style.transform = `rotate(${Math.random() * 45 - 22.5}deg) translateX(${distance}px)`;
  
  // Programar la explosión después de que la estrella haya viajado
  setTimeout(() => {
    // Ocultar la estrella y la estela
    star.style.opacity = '0';
    trail.style.opacity = '0';
    
    // Crear explosión
    createStarExplosion(
      shootingStarContainer.offsetLeft + distance * Math.cos(shootingStarContainer.style.transform.match(/rotate\(([^)]+)\)/)[1] * Math.PI / 180),
      shootingStarContainer.offsetTop + distance * Math.sin(shootingStarContainer.style.transform.match(/rotate\(([^)]+)\)/)[1] * Math.PI / 180),
      container
    );
    
    // Eliminar la estrella después de la animación
    setTimeout(() => {
      shootingStarContainer.remove();
    }, 500);
  }, duration);
}

// Crear efecto de explosión de estrella
function createStarExplosion(x, y, container) {
  const particleCount = 10 + Math.floor(Math.random() * 10);
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'star-particle';
    particle.style.position = 'absolute';
    particle.style.top = `${y}px`;
    particle.style.left = `${x}px`;
    particle.style.width = `${Math.random() * 4 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.background = 'var(--diamond-light)';
    particle.style.borderRadius = '50%';
    particle.style.filter = 'blur(1px)';
    particle.style.boxShadow = '0 0 10px var(--diamond-light)';
    particle.style.zIndex = '2';
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 20;
    const duration = Math.random() * 1000 + 500;
    
    particle.style.transition = `transform ${duration/1000}s ease-out, opacity ${duration/1000}s ease-out`;
    
    container.appendChild(particle);
    
    // Pequeño retraso para que la animación funcione
    setTimeout(() => {
      particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
      particle.style.opacity = '0';
    }, 10);
    
    // Eliminar partícula después de la animación
    setTimeout(() => {
      particle.remove();
    }, duration + 100);
  }
}

// Crear y animar palabras cósmicas
function createCosmicWord(word, container) {
  const cosmicWord = document.createElement('div');
  cosmicWord.className = 'cosmic-word';
  cosmicWord.textContent = word;
  
  // Posición aleatoria en el hero
  const x = 30 + Math.random() * 40; // 30-70% del ancho
  const y = 30 + Math.random() * 40; // 30-70% del alto
  
  cosmicWord.style.left = `${x}%`;
  cosmicWord.style.top = `${y}%`;
  cosmicWord.style.fontSize = `${2 + Math.random() * 1.5}rem`; // 2-3.5rem
  
  container.appendChild(cosmicWord);
  
  // Animación de aparición y desaparición
  cosmicWord.style.animation = 'cosmicWordAnimation 4s ease-in-out forwards';
  
  // Eliminar del DOM después de la animación
  setTimeout(() => {
    cosmicWord.remove();
  }, 4000);
}

// ============================================================
// Función para los íconos flotantes que siguen al cursor
// ============================================================
function initializeFloatingIcons() {
  // Lista de íconos SVG para mostrar
  const icons = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#4f7f8c"><path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#4f7f8c"><path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM224 272a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="#4f7f8c"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#4f7f8c"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>'
  ];
  
  // Seguimiento del ratón para los íconos
  document.addEventListener('mousemove', (e) => {
    // Limitar la creación de íconos para no sobrecargar
    if (Math.random() < 0.05) { // 5% de probabilidad por movimiento
      createFloatingIcon(e.clientX, e.clientY, icons);
    }
  });
}

// Crear un ícono flotante en la posición del cursor
function createFloatingIcon(x, y, icons) {
  const icon = document.createElement('div');
  icon.className = 'floating-icon';
  
  // Seleccionar un ícono aleatorio
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];
  icon.innerHTML = randomIcon;
  
  // Posicionar el ícono
  icon.style.left = `${x}px`;
  icon.style.top = `${y}px`;
  
  document.body.appendChild(icon);
  
  // Animar el ícono
  setTimeout(() => {
    icon.style.opacity = '0.8';
    icon.style.animation = 'floatUp 1s forwards';
    
    // Variable aleatoria para el movimiento horizontal
    icon.style.setProperty('--random-x', `${Math.random() * 100 - 50}px`);
  }, 10);
  
  // Eliminar el ícono después de la animación
  setTimeout(() => {
    icon.remove();
  }, 1000);
}

// ============================================================
// Función para animar elementos al hacer scroll
// ============================================================
function initializeAnimationsOnScroll() {
  // Obtener todos los elementos animables
  const animatableElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
  
  // Opciones para Intersection Observer
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% del elemento visible
  };
  
  // Crear el observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Dejar de observar el elemento una vez animado
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar cada elemento
  animatableElements.forEach(element => {
    observer.observe(element);
  });
  
  // Animación adicional para títulos de secciones
  document.querySelectorAll('section h2').forEach(heading => {
    if (!heading.classList.contains('fade-in')) {
      heading.style.position = 'relative';
      heading.style.opacity = '0';
      heading.style.transform = 'translateY(30px)';
      heading.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      
      observer.observe(heading);
    }
  });
}

// ============================================================
// Función para interacciones con tarjetas de equipo
// ============================================================
function initializeTeamCardInteractions() {
  // Asegurarse de que los event listeners estén configurados
  document.querySelectorAll('.team-card').forEach(card => {
    // Obtener los botones dentro de la tarjeta
    const infoBtn = card.querySelector('.info-btn');
    const backBtn = card.querySelector('.back-btn');
    
    if (infoBtn) {
      infoBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que el evento se propague
        card.classList.add('flipped');
      });
    }
    
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que el evento se propague
        card.classList.remove('flipped');
      });
    }
    
    // Añadir efecto de hover 3D suavizado
    card.addEventListener('mousemove', (e) => {
      if (card.classList.contains('flipped')) return; // No aplicar efecto si está volteada
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Posición X del ratón dentro de la tarjeta
      const y = e.clientY - rect.top;  // Posición Y del ratón dentro de la tarjeta
      
      // Calcular la rotación basada en la posición del ratón (reducida para un efecto más sutil)
      const rotateY = ((x / rect.width) - 0.5) * 8; // -4 a 4 grados
      const rotateX = ((y / rect.height) - 0.5) * -8; // 4 a -4 grados (invertido)
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Restaurar la posición original al salir
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('flipped')) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      }
    });
    
    // Añadir interacción al clic en la tarjeta para facilitar uso móvil
    card.addEventListener('click', (e) => {
      // Solo voltear si se hace clic en la tarjeta, no en los botones
      if (e.target === card || e.target.closest('.team-card-front')) {
        if (!card.classList.contains('flipped') && 
            !e.target.classList.contains('info-btn') && 
            !e.target.closest('.info-btn')) {
          card.classList.add('flipped');
        }
      } else if (e.target.closest('.team-card-back') && 
                !e.target.classList.contains('back-btn') && 
                !e.target.closest('.back-btn')) {
        card.classList.remove('flipped');
      }
    });
  });
  
  // Hacer que toda la sección sea responsive
  window.addEventListener('resize', () => {
    adjustTeamLayout();
  });
  
  // Llamar inicialmente para asegurar la disposición correcta
  adjustTeamLayout();
}

// Función para ajustar la disposición de las tarjetas del equipo según el tamaño de pantalla
function adjustTeamLayout() {
  const teamRow = document.querySelector('.team-row');
  if (!teamRow) return;
  
  const windowWidth = window.innerWidth;
  
  // Esta función permite ajustar dinámicamente la disposición si es necesario
  // También podríamos agregar aquí cualquier ajuste adicional para asegurar proporciones correctas
}

// ============================================================
// Función para efectos de parallax
// ============================================================
function initializeParallaxEffects() {
  // Elementos para efectos parallax
  const heroSection = document.querySelector('.hero');
  const aboutSection = document.querySelector('.about');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      // Mover elementos del hero con efecto parallax
      heroSection.style.backgroundPositionY = `${scrollY * 0.5}px`;
    });
  }
  
  // Efecto parallax en la sección about
  if (aboutSection) {
    window.addEventListener('scroll', () => {
      const rect = aboutSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
        const translateY = Math.max(0, scrollProgress * 50); // 0-50px
        
        // Aplicar efecto a los diferentes elementos
        const aboutCard = aboutSection.querySelector('.about-card');
        if (aboutCard) {
          aboutCard.style.transform = `translateY(-${translateY * 0.3}px)`;
        }
        
        const carousel = aboutSection.querySelector('.about-carousel');
        if (carousel) {
          carousel.style.transform = `translateY(-${translateY * 0.5}px)`;
        }
      }
    });
  }
  
  // Efecto parallax en las cards de proyectos
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length > 0) {
    window.addEventListener('scroll', () => {
      projectCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
          const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
          const scale = 1 + scrollProgress * 0.05; // 1-1.05
          
          // Solo aplicar si no tiene hover
          if (!card.matches(':hover')) {
            card.style.transform = `scale(${scale})`;
          }
        }
      });
    });
  }
}

// ============================================================
// Funcionalidad adicional para mejorar la experiencia de usuario
// ============================================================

// Manejar la navegación suave
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Animación de desplazamiento suave
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Compensar la altura de la navbar
          behavior: 'smooth'
        });
        
        // Cerrar el menú móvil si está abierto
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
});

// Función para animar los números en el contador
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 16ms por frame (aproximadamente 60fps)
  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);
    
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// Inicializar contadores si existen
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      observer.observe(counter);
    });
  }
});

// Mejorar la accesibilidad
document.addEventListener('DOMContentLoaded', () => {
  // Añadir atributos aria para mejorar la accesibilidad
  document.querySelectorAll('.nav-link').forEach(link => {
    link.setAttribute('aria-label', link.textContent.trim());
  });
  
  document.querySelectorAll('.btn').forEach(button => {
    if (!button.getAttribute('aria-label')) {
      button.setAttribute('aria-label', button.textContent.trim());
    }
  });
  
  // Hacer que los cards sean navegables por teclado
  document.querySelectorAll('.team-card, .project-card').forEach(card => {
    if (!card.getAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
    }
  });
});

// JavaScript para manejar el funcionamiento de las flipcards
document.addEventListener('DOMContentLoaded', function() {
  // Manejo del efecto flip en las tarjetas de equipo
  const teamCards = document.querySelectorAll('.team-card');
  
  teamCards.forEach(card => {
    const infoBtn = card.querySelector('.info-btn');
    const backBtn = card.querySelector('.back-btn');
    
    if (infoBtn) {
      infoBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Detiene la propagación del evento
        card.classList.add('flipped');
        console.log('Tarjeta volteada hacia adelante');
      });
    }
    
    if (backBtn) {
      backBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Detiene la propagación del evento
        card.classList.remove('flipped');
        console.log('Tarjeta volteada hacia atrás');
      });
    }
  });
  
  // Detección de animaciones en el viewport
  function checkIfInView() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .zoom-in');
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      if (rect.top <= windowHeight * 0.8) {
        element.classList.add('active');
      }
    });
  }
  
  // Eventos para las animaciones
  window.addEventListener('scroll', checkIfInView);
  window.addEventListener('resize', checkIfInView);
  
  // Verificar animaciones al cargar la página
  checkIfInView();
  
  // Manejo del navbar en dispositivos móviles
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.add('show');
      this.classList.add('active');
    });
    
    // Función para cerrar el menú
    function closeNav() {
      navbarCollapse.classList.remove('show');
      if (navbarToggler) {
        navbarToggler.classList.remove('active');
      }
    }
    
    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', closeNav);
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
      if (navbarCollapse.classList.contains('show') && 
          !navbarCollapse.contains(e.target) && 
          !navbarToggler.contains(e.target)) {
        closeNav();
      }
    });
  }
  
  // Smooth scrolling para enlaces de anclaje
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
});