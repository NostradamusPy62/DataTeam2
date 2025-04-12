// ===== Funciones específicas para componentes de la web =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes interactivos
    initSmoothScroll();
    initProjectCardInteraction();
    initAboutCardInteraction();
    initTechIconsAnimation();
    initGlassmorphismEffects();
    initPageTransitions();
  });
  
  // ===== Smooth Scroll suave entre secciones =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Simular transición tipo SPA con fundido
          document.body.classList.add('page-transitioning');
          
          setTimeout(() => {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
            
            setTimeout(() => {
              document.body.classList.remove('page-transitioning');
            }, 300);
          }, 200);
        }
      });
    });
  }
  
  // ===== Interacción avanzada para Project Cards =====
  function initProjectCardInteraction() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      // Efecto de escala al pasar el ratón
      card.addEventListener('mouseenter', function() {
        // Aumentar el tamaño de la imagen
        const img = this.querySelector('.card-img-top');
        if (img) {
          img.style.transform = 'scale(1.08)';
        }
        
        // Mostrar tecnologías con animación
        const techIcons = this.querySelectorAll('.project-tech i');
        techIcons.forEach((icon, index) => {
          setTimeout(() => {
            icon.style.transform = 'translateY(-5px) scale(1.2)';
            icon.style.color = 'var(--diamond-deep)';
          }, 100 * index);
        });
      });
      
      card.addEventListener('mouseleave', function() {
        // Restaurar el tamaño de la imagen
        const img = this.querySelector('.card-img-top');
        if (img) {
          img.style.transform = 'scale(1)';
        }
        
        // Restaurar tecnologías
        const techIcons = this.querySelectorAll('.project-tech i');
        techIcons.forEach(icon => {
          icon.style.transform = 'translateY(0) scale(1)';
          icon.style.color = 'var(--text-tertiary)';
        });
      });
      
      // Añadir efecto de onda al hacer clic
      card.addEventListener('click', function(e) {
        // Solo si no se ha hecho clic en un botón o enlace
        if (!e.target.closest('a, button')) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Crear elemento de onda
          const ripple = document.createElement('div');
          ripple.className = 'ripple-effect';
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          
          this.appendChild(ripple);
          
          // Eliminar el elemento después de la animación
          setTimeout(() => {
            ripple.remove();
          }, 800);
        }
      });
    });
  }
  
  // ===== Interacción para About Card =====
  function initAboutCardInteraction() {
    const aboutCard = document.querySelector('.about-card');
    
    if (aboutCard) {
      // Resaltar palabras clave al pasar el ratón
      const strongElements = aboutCard.querySelectorAll('strong');
      
      strongElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
          this.style.color = 'var(--teal-light)';
          this.style.transform = 'translateY(-2px)';
          this.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
          this.style.color = 'var(--blue-accent)';
          this.style.transform = 'translateY(0)';
        });
      });
      
      // Efecto de línea animada para el título
      const title = aboutCard.querySelector('h3');
      if (title) {
        title.addEventListener('mouseenter', function() {
          const afterElement = window.getComputedStyle(this, '::after');
          this.style.setProperty('--title-line-width', '100%');
        });
        
        title.addEventListener('mouseleave', function() {
          this.style.setProperty('--title-line-width', '40px');
        });
      }
    }
  }
  
  // ===== Animación para los iconos de tecnología =====
  function initTechIconsAnimation() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
      // Animación de flotación
      icon.style.animation = `float ${2 + Math.random() * 2}s ease-in-out infinite`;
      
      // Efecto de brillo al pasar el ratón
      icon.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(1.2) translateY(-10px)';
        this.style.opacity = '1';
        
        // Efecto de resplandor
        this.style.filter = 'drop-shadow(0 0 8px var(--teal-light))';
        
        // Animar el icono
        const iconElement = this.querySelector('i');
        if (iconElement) {
          iconElement.style.animation = 'pulse 1s infinite';
        }
      });
      
      icon.addEventListener('mouseleave', function() {
        this.style.animation = `float ${2 + Math.random() * 2}s ease-in-out infinite`;
        this.style.transform = 'scale(1) translateY(0)';
        this.style.opacity = '0.7';
        this.style.filter = 'none';
        
        // Detener animación del icono
        const iconElement = this.querySelector('i');
        if (iconElement) {
          iconElement.style.animation = 'none';
        }
      });
    });
  }
  
  // ===== Efectos de Glassmorphism =====
  function initGlassmorphismEffects() {
    // Agregar efectos de vidrio a elementos seleccionados
    const glassElements = document.querySelectorAll('.navbar, .about-card, .project-card, .team-card-front, .team-card-back');
    
    glassElements.forEach(element => {
      // Asegurar que tenga los estilos de glassmorphism
      element.style.backdropFilter = 'blur(10px)';
      element.style.WebkitBackdropFilter = 'blur(10px)';
      element.style.background = 'rgba(248, 252, 255, 0.7)';
      element.style.borderRadius = 'var(--radius-md)';
      
      // Efecto de brillo al pasar el ratón
      element.addEventListener('mouseenter', function() {
        if (!this.classList.contains('no-glass-effect')) {
          this.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.2), 0 4px 8px rgba(31, 38, 135, 0.1)';
          this.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        }
      });
      
      element.addEventListener('mouseleave', function() {
        if (!this.classList.contains('no-glass-effect')) {
          this.style.boxShadow = 'var(--glass-shadow)';
          this.style.borderColor = 'var(--glass-border)';
        }
      });
    });
  }
  
  // ===== Transiciones de página tipo SPA =====
  function initPageTransitions() {
    // Añadir clase para el estilo de transición
    document.body.classList.add('transition-ready');
    
    // Remover el estado de carga cuando la página está lista
    setTimeout(() => {
      document.body.classList.add('page-loaded');
    }, 300);
    
    // Animar entrada de secciones al cargar
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
      section.style.transitionDelay = `${0.1 * index}s`;
      
      setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 100);
    });
    
    // Simular transiciones entre secciones al hacer clic en enlace de navbar
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Añadir efecto de transición
          document.body.classList.add('page-transitioning');
          
          // Desplazarse a la sección después de un breve retraso
          setTimeout(() => {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
            
            // Quitar efecto de transición
            setTimeout(() => {
              document.body.classList.remove('page-transitioning');
              
              // Actualizar navegación activa
              document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => {
                navLink.classList.remove('active');
              });
              this.classList.add('active');
            }, 500);
          }, 200);
        }
      });
    });
    
    // Detectar sección activa al hacer scroll
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const sectionId = section.getAttribute('id');
          
          document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }
  
  // ===== Agregar animaciones de carga a imágenes =====
  document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Crear un contenedor para la animación de carga
      const container = document.createElement('div');
      container.className = 'image-loader-container';
      container.style.position = 'relative';
      
      // Insertar el contenedor antes de la imagen
      img.parentNode.insertBefore(container, img);
      
      // Mover la imagen dentro del contenedor
      container.appendChild(img);
      
      // Crear el spinner de carga
      const loader = document.createElement('div');
      loader.className = 'image-loader';
      loader.style.position = 'absolute';
      loader.style.top = '50%';
      loader.style.left = '50%';
      loader.style.transform = 'translate(-50%, -50%)';
      loader.style.width = '40px';
      loader.style.height = '40px';
      loader.style.borderRadius = '50%';
      loader.style.border = '3px solid var(--bg-secondary)';
      loader.style.borderTopColor = 'var(--diamond-primary)';
      loader.style.animation = 'spin 1s linear infinite';
      
      // Agregar el spinner al contenedor
      container.appendChild(loader);
      
      // Ocultar el spinner cuando la imagen se carga
      img.onload = function() {
        loader.style.display = 'none';
        img.style.opacity = '1';
      };
      
      // Ocultar imagen hasta que se cargue
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
    });
    
    // Agregar animación para el spinner
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  });
  
  // ===== Efecto de revelación de texto =====
  document.addEventListener('DOMContentLoaded', function() {
    const textElements = document.querySelectorAll('.about-card p, .hero .lead, .card-text');
    
    textElements.forEach(element => {
      // Guardar el texto original
      const originalText = element.textContent;
      
      // Crear observador de intersección
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Mostrar texto con efecto de máquina de escribir
            element.textContent = '';
            element.style.borderRight = '2px solid var(--diamond-primary)';
            
            let i = 0;
            const typeEffect = setInterval(() => {
              if (i < originalText.length) {
                element.textContent += originalText.charAt(i);
                i++;
              } else {
                clearInterval(typeEffect);
                element.style.borderRight = 'none';
              }
            }, 10);
            
            // Dejar de observar
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      // Comenzar a observar
      observer.observe(element);
    });
  });
  
  // ===== Efecto de partículas en botones =====
  document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Obtener posición del clic
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Crear partículas
        for (let i = 0; i < 20; i++) {
          createParticle(x, y, button);
        }
      });
    });
    
    function createParticle(x, y, parent) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Estilos de la partícula
      particle.style.position = 'absolute';
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.background = 'white';
      particle.style.borderRadius = '50%';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.pointerEvents = 'none';
      particle.style.opacity = Math.random() * 0.5 + 0.5;
      
      // Añadir a botón
      parent.appendChild(particle);
      
      // Animar partícula
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 3 + 2;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      let posX = x;
      let posY = y;
      let opacity = 1;
      let scale = 1;
      
      // Función de animación
      function animate() {
        posX += vx;
        posY += vy;
        opacity -= 0.02;
        scale -= 0.01;
        
        if (opacity > 0) {
          particle.style.left = `${posX}px`;
          particle.style.top = `${posY}px`;
          particle.style.opacity = opacity;
          particle.style.transform = `scale(${scale})`;
          
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      }
      
      // Iniciar animación
      requestAnimationFrame(animate);
    }
  });