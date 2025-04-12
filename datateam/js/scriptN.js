// ===== Inicialización del documento =====
document.addEventListener('DOMContentLoaded', function() {
    // Crear el canvas de fondo
    createBackgroundCanvas();
    
    // Crear el canvas interactivo del header
    createHeaderCanvas();
    
    // Inicializar el efecto de cursor
    initCursorEffect();
    
    // Inicializar animaciones en scroll
    initScrollAnimations();
    
    // Inicializar efecto hover 3D para cards
    init3DCardEffect();
    
    // Inicializar animación de flip para tarjetas de equipo
    initTeamCardFlip();
    
    // Navbar scrolled effect
    initNavbarScroll();
    
    // Iniciar imagen animada del header si existe
    initHeaderImage();
  });
  
  // ===== Canvas de Fondo con Circuitos y Partículas =====
  function createBackgroundCanvas() {
    // Crear el elemento canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'background-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Resize listener
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
    // Colores basados en la paleta Diamond
    const colors = [
      '#7ca2b1', // --diamond-primary
      '#4f7f8c', // --diamond-deep
      '#b9dae9', // --diamond-light
      '#9fd1e0', // --teal-light
      '#b4d6d1'  // --mint-soft
    ];
    
    // Puntos de circuito
    const points = [];
    const numPoints = Math.floor(window.innerWidth / 50); // Ajustar según el ancho
    
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: []
      });
    }
    
    // Partículas flotantes
    const particles = [];
    const numParticles = Math.floor(window.innerWidth / 100); // Ajustar según el ancho
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2
      });
    }
    
    // Establecer conexiones iniciales entre puntos cercanos
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          points[i].connections.push(j);
        }
      }
    }
    
    // Función de animación
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar conexiones de circuito
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        // Mover puntos
        point.x += point.vx;
        point.y += point.vy;
        
        // Rebote en los bordes
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        
        // Dibujar conexiones
        for (let j = 0; j < point.connections.length; j++) {
          const targetPoint = points[point.connections[j]];
          const dx = point.x - targetPoint.x;
          const dy = point.y - targetPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const alpha = 1 - distance / 150;
            ctx.strokeStyle = `rgba(124, 162, 177, ${alpha * 0.3})`;
            
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(targetPoint.x, targetPoint.y);
            ctx.stroke();
          }
        }
        
        // Dibujar puntos
        ctx.fillStyle = point.color + '40'; // 25% de opacidad
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Dibujar partículas
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        // Mover partículas
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        
        // Cambiar dirección ligeramente
        particle.angle += (Math.random() - 0.5) * 0.05;
        
        // Rebote en los bordes
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.angle = Math.PI - particle.angle;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.angle = -particle.angle;
        }
        
        // Dibujar partícula
        ctx.fillStyle = `rgba(185, 218, 233, ${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // ===== Crear Canvas Interactivo del Header =====
  function createHeaderCanvas() {
    const heroSection = document.getElementById('home');
    
    if (!heroSection) return;
    
    // Crear canvas para efectos de rastro del mouse
    const canvas = document.createElement('canvas');
    canvas.id = 'header-canvas';
    canvas.width = window.innerWidth;
    canvas.height = heroSection.offsetHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    heroSection.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Crear imágenes para el rastro
    const iconImages = [];
    const iconTypes = ['raspberry', 'python', 'arduino', 'ai'];
    const loadedIcons = 0;
    
    // Añadir imagen de robot
    const robotIcon = new Image();
    robotIcon.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjN2NhMmIxIiBkPSJNMjU2IDM1MmM1My4wMiAwIDk2LTQyLjk4IDk2LTk2di0zMmMwLTUzLjAyLTQyLjk4LTk2LTk2LTk2cy05NiA0Mi45OC05NiA5NnYzMmMwIDUzLjAyIDQyLjk4IDk2IDk2IDk2em0tNTYtMTI4YzAtMzAuODggMjUuMTItNTYgNTYtNTZzNTYgMjUuMTIgNTYgNTZ2MzJjMCAzMC44OC0yNS4xMiA1Ni01NiA1NnMtNTYtMjUuMTItNTYtNTZ2LTMyek0xMTIgMjI0YzAgNTAuNjYtNS43NyA4Ni4yLTE0LjE3IDEwNS44OC04LjMgMTkuNS0xOS40NCAyOS4xMy0zOC40NyAzNy4yQzQyLjc1IDM3My43NSAyOS43MSAzNzkuMiAyMi41NiAzOTkuMDVjLTUuNSAxNS4yNCAyLjA0IDMyLjI3IDE2Ljk3IDM4LjQyIDE0LjkzIDYuMTUgMzEuOC0uOTcgMzguMTItMTUuOTIgMi43NS02LjU2IDguNzYtMTAuMTcgMTMuMzctMTIuMDcgNC4yLTEuNzIgOC44LTIuODggMTIuMzYtNC4zQzczLjQ3IDM5NS40IDgwIDM2OS4zNCA4MCAyMjRjMC0xMTIuMDQgNzguOC0yODggMTc2LTI4OCAxOCAyMC40OSA0MC4yNSA2My5xOCA1Ni45MyAxMjIuMiAxMC43MSAzNy44NiAxOC4wNiA3OS44MyAxOS4wOCAxMjAuMjYgMi45OCAzLjIgNC4yIDcuMDUgNC4yIDExLjU0IDAgOS42MS03Ljc1IDE2LTE2IDE2aC00OGMtOC40OSAwLTE2LTcuMi0xNi0xNnM3LjUxLTE2IDE2LTE2aDIyLjA3Yy0uNDMtMzQuNS02LjI1LTY5LjI5LTE0Ljc3LTk5LjE3QzI1NC4yNiA0Ny44NyAyMzYgMTYgMjI0IDBjLTk2IDAtMTEyIDE2LTExMiAyMjR6bTI4OC0OTZjMC0xNy4wNy04LjUtMzEuOTYtMjEuNDktNDFoMTM4Ljk4Yy0xMi45OSA5LjA0LTIxLjQ5IDIzLjkzLTIxLjQ5IDQxdjMyYzAgMTcuMDcgOC41IDMxLjk2IDIxLjQ5IDQxSDM3OC41Yy0xMi45OS05LjA0LTIxLjQ5LTIzLjkzLTIxLjQ5LTQxdi0zMnptMzIgNTh2LTUzYzAtOC44MSA2LjQ1LTE2IDE1LTE2IDguMzkgMCAxNSA3LjE1IDE1IDE2djUzYzAgOC44MS02LjQ1IDE2LTE1IDE2LTguMzkgMC0xNS03LjE1LTE1LTE2em01MiAwdi01M2MwLTguODEgNi40NS0xNiAxNS0xNiA4LjM5IDAgMTUgNy4xNSAxNSAxNnY1M2MwIDguODEtNi40NSAxNi0xNSAxNi04LjM5IDAtMTUtNy4xNS0xNS0xNnpNNDcyLjEyIDM2Ny41MSA0MDIuMDMgMzI1LjNjLTIxLjU0IDE1LjE2LTQ3Ljf1IDI0LjcxLTc2LjAzIDI0LjcxLTQuOTggMC05Ljg4LS4yOC0xNC43LS44MUMzMDkuNzIgNC4yMyAyNzIuNDggMCA0ODcuOTggMGMyNCAwIDI0IDM0Ljk5IDI0IDc4LjIzIDAgNDMuMjQgMCA4OS4wOS0yNCA1Ny4yNCAwLTE3LjkyLTUuNTgtMzQtMTQuMDItNDcuOTJDNDY0LjA2IDc1LjEyIDQ1Ni4wMiA2NCA0NDcuOTggNjRoLTQ1LjkyQzQxMC4wMiA2NCAzNzMuOTggNjQgMzczLjk4IDk2djkuNjljLTggMS45OC0xNS40MyA1LjM0LTIxLjk2IDkuOTktNi43My00LjY0LTE0LjE1LTguMDEtMjIuMDItOS45OVY5NiB6bTQuODggMTA4LjYxYzguODEtNi43NyAxOS45Ni0xMC44MSAzMi0xMC44MSAyOS40IDAgNTMgMjMuNiA1MyA1M3YxMC44OWwtNDUuMTIgLTI5Ljk3em0xNS45OS0zMC44MWMtNTIuNzcgMC05MS45OCA0Ni4yNS04NS45NyA5OC42MkM0MzcuMjcgNTE3LjM5IDUxMiA1MTIgNTEyIDM4NHYtNzAuNjdjLTUuNi0yNC43NC0xOC40OC00OC41Mi0xOS4wMS02OC4wMnoiPjwvcGF0aD48L3N2Zz4=';
    
    // Crear otras imágenes de iconos
    const pythonIcon = new Image();
    pythonIcon.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBmaWxsPSIjN2NhMmIxIiBkPSJNNDM5LjggMjAwLjVjLTcuNy0zMC45LTIyLjMtNTQuMi01My40LTU0LjJINzMuOWMtMzAuNiAwLTQ1LjUgMjUuNS01Mi4xIDU1LjYtMTEuNCA1Mi44LTExLjQgMTQ3LjkgMCB6MDAgODYuMXptLTcuNy0zMS41YzguMy0yNSA4LjMtNjguNiAwLTk0LjYtNy44LTI5LjgtMjIuNC01MC44LTUyLjctNTAuOGgtMjc3Yy0zNSAwLTUyLjMgMjEuNi02MS45IDUxLjItOTcuNyAxNDUuNC0xMDkuMzktNDcuMzQgMTguOC0zMC45QzEwNC43IDM2LjIgMTA1LjEgMzUuNiAxMDUuMSAzMy44YzAtMyAyLjUtNi41IDIuNS0xMy4xIDAtMTcuMiAxOC0yMC43IDQzLjUtMjAuNyA2Ny45IDAgNDIuMyAyOC40IDEwNC4zIDIzLjkgNTguMi00LjIgMTEyLjUgMjYuNyAxMDkuNyA0NS44LTEuNCAxMC4yLTUgMTQuMy0yNC4zIDI1LjgtMyAxLjgtMTEuOSA2LjMtMTguMiAxXS45LTMuMyA0LjgtOC4zIDQuOC0xNS41IDAtMTAuMS0zLjgtMTcuOC0xNi45LTIyLjUtNi4zLTMuNS05Ny40LTli41LTg5LjUtNC41LTExLjMgOC01LjYgMjItNS42IDMxLjEgMCA4LjUtNS4zIDE5LjItMTUuNSAyMS40LTk0LjM5IDIwLjMtNzguNiAxNS45LTg5LjYgNTUuN3oiPjwvcGF0aD48L3N2Zz4=';
    
    const arduinoIcon = new Image();
    arduinoIcon.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjN2NhMmIxIiBkPSJNLjUtMC4yYzU2LjkgMTEuNDggOTYuNyA2NCA5Ni43IDEyNS40IDAgNjEuMy0zOS44NyAxMTMuOC05Ni43IDEyNS40di0zNi45QzE5LjQgMjAzLjcgNDQuOCAxNjYuMiA0NC44IDEyNS4yUzE5LjQgNDYuNjguNS0wLjJ6TTE3Mi4zIDY5LjY3Yy0xLjQgMC0yLjggLjA4LTQuMi4yNWwtNDIuMTcgMTUuMyA2LjggMTguOCA0Mi4xNy0xNS4zYzM1LjgtNi4zIDY4LjUgMjEuOCA2OC41IDU4LjIgMCAyNS45LTE3LjEgNDkuMS00Mi4xNyA1Ni4yYTU3Ljc2IDU3Ljc2IDAgMCAxLTEwLjIgMS40N2MtMjcuODIgMC01MS42Ni0yMC40Ny01Ni4xOS00OC4yTDc3LjMgMTQxLjhsLTYuOC0xOC44LTU2LjE5IDE1LjNjLTEuNCAwLTIuOC0uOC00LjItLjI1QzQuMS0uMiAyNTYtLjIgMjU2IDEyNS4yYzAgMTI1LjQtMjUyLjMgMTI1LjQtMjU2IDAtLjA1LTIxLjkgNC45Mi00My40IDE0LjcyLTYyLjVDMzUuNjIgODguMTQgNjcuNyA2OS42OSAxMDYuMSA2OS42OWg2Ni4ydjAgek0yMzEuMyA0ODIuM2MxLjQgMCAyLjgtLjA4IDQuMi0uMjVsNDIuMTctMTUuMyA2LjggMTguOC00Mi4xNyAxNS4zYy0zNS44IDYuMy02OC41LTIxLjgtNjguNS01OC4yIDAtMjUuOSAxNy4xLTQ5LjEgNDIuMTctNTYuMmE1Ny43NiA1Ny43NiAwIDAgMSAxMC4yLTEuNDdjMjcuODIgMCA1MS42NiAyMC40NyA1Ni4xOSA0OC4ybDU2Ljg3LTE1LjNMNzc3LjMgMTQxLjhsLjYuOCAxOC44IDU2LjE5IDE1LjNhMTEuNDggMTEuNDggMCAwIDEgNi4yIC4yNWM2IDEzOC44Ni0yNTIgMTM4Ljg2LTI1NiAwLS4wNS0yMS45IDQuOTItNDMuNCAxNC43Mi02Mi41IDIwLjktMzcuOCA1My02MC4xIDkxLjQtNjAuMWg2Ni4ydjAgeiIvPjwvc3ZnPg==';
    
    const aiIcon = new Image();
    aiIcon.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjN2NhMmIxIiBkPSJNMTg0IDI1NmMwIDEzLjI1LTEwLjc1IDI0LTI0IDI0cy0yNC0xMC43NS0yNC0yNHMxMC43NS0yNCAyNC0yNHMyNCAxMC43NSAyNCAyNHptMTkyLTI0Yy0xMy4yNSAwLTI0IDEwLjc1LTI0IDI0czEwLjc1IDI0IDI0IDI0czI0LTEwLjc1IDI0LTI0cy0xMC43NS0yNCAyNC0yNHpNNTEyIDI1NmMwIDE0MS40LTExNC42IDI1Ni0yNTYgMjU2UzAgMzk3LjQgMCAyNTYgMTE0LjYgMCAyNTYgMHMyNTYgMTE0LjYgMjU2IDI1NnptLTMyIDBjMC0xMjMuNy0xMDAuMy0yMjQtMjI0LTIyNFM1NiAxMzIuMyA1NiAyNTZzMTAwLjMgMjI0IDIyNCAyMjRzMjI0LTEwMC4zIDIyNC0yMjR6TTExNC4xIDM0NGwxMDQtMjRoMTAxLjhsMTA0IDI0YzkuOCAyLjIgMTkuNC01LjYgMTkuNC0xNS43VjE4OS4zYzAtMTAuMS05LjYtMTcuOS0xOS40LTE1LjdsLTEwNCAyNGgtMTAxLjhsLTEwNC0yNGMtOS44LTIuMi0xOS40IDUuNi0xOS40IDE1Ljd2MTM5YzAgMTAuMSA5LjYgMTcuOSAxOS40IDE1Ljd6Ij48L3BhdGg+PC9zdmc+';
    
    iconImages.push(robotIcon, pythonIcon, arduinoIcon, aiIcon);
    
    // Partículas de rastro
    const trailParticles = [];
    const maxTrailParticles = 50;
    
    // Evento de movimiento del ratón
    heroSection.addEventListener('mousemove', function(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Añadir nueva partícula de rastro con un icono aleatorio
      if (trailParticles.length < maxTrailParticles) {
        const randomIcon = Math.floor(Math.random() * iconImages.length);
        
        trailParticles.push({
          x: x,
          y: y,
          size: Math.random() * 15 + 5,
          speedX: (Math.random() - 0.5) * 3,
          speedY: (Math.random() - 0.5) * 3,
          alpha: 1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
          icon: iconImages[randomIcon]
        });
      }
    });
    
    // Función de animación
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Actualizar y dibujar partículas de rastro
      for (let i = 0; i < trailParticles.length; i++) {
        const particle = trailParticles[i];
        
        // Actualizar posición
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Actualizar rotación
        particle.rotation += particle.rotationSpeed;
        
        // Actualizar opacidad
        particle.alpha -= 0.01;
        
        // Dibujar partícula
        if (particle.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = particle.alpha;
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.drawImage(
            particle.icon,
            -particle.size / 2,
            -particle.size / 2,
            particle.size,
            particle.size
          );
          ctx.restore();
        } else {
          // Eliminar partícula si es invisible
          trailParticles.splice(i, 1);
          i--;
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    // Iniciar animación una vez que las imágenes estén cargadas
    Promise.all(
      iconImages.map(img => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
          }
        });
      })
    ).then(() => {
      animate();
    });
  }
  
  // ===== Inicializar efectos de cursor personalizados =====
  function initCursorEffect() {
    // Crear elementos de cursor personalizados
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Añadir trail elements para efecto de estela
    const trailElements = [];
    const trailCount = 10;
    
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      document.body.appendChild(trail);
      trailElements.push(trail);
    }
    
    // Posiciones previas para el efecto de estela
    const trailPositions = Array(trailCount).fill().map(() => ({ x: 0, y: 0 }));
    
    // Actualizar posición del cursor personalizado
    document.addEventListener('mousemove', (e) => {
      // Actualizar cursor principal
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Actualizar estela con efecto de retraso
      trailPositions.unshift({ x: e.clientX, y: e.clientY });
      trailPositions.pop();
      
      trailElements.forEach((trail, index) => {
        const position = trailPositions[Math.min(index * 2, trailPositions.length - 1)];
        if (position) {
          trail.style.left = `${position.x}px`;
          trail.style.top = `${position.y}px`;
          trail.style.width = `${10 - index * 0.5}px`;
          trail.style.height = `${10 - index * 0.5}px`;
          trail.style.opacity = 1 - index / trailCount;
        }
      });
    });
    
    // Efecto hover para elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .team-card, .project-card, .info-btn, .back-btn');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.backgroundColor = 'rgba(159, 209, 224, 0.2)';
        cursor.style.mixBlendMode = 'difference';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'rgba(159, 209, 224, 0.6)';
        cursor.style.mixBlendMode = 'screen';
      });
    });
    
    // Ocultar cursor por defecto
    document.body.style.cursor = 'none';
    
    // Pero mostrar el cursor por defecto en dispositivos táctiles
    window.addEventListener('touchstart', () => {
      document.body.style.cursor = 'auto';
      cursor.style.display = 'none';
      trailElements.forEach(trail => trail.style.display = 'none');
    });
  }
  
  // ===== Inicializar animaciones al hacer scroll =====
  function initScrollAnimations() {
    // Seleccionar elementos animados
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    // Opciones para el observador de intersecciones
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    // Callback cuando los elementos entran en el viewport
    const animateOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Dejar de observar el elemento una vez animado
          observer.unobserve(entry.target);
        }
      });
    };
    
    // Crear observador de intersecciones
    const observer = new IntersectionObserver(animateOnScroll, options);
    
    // Observar cada elemento
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // ===== Inicializar efecto 3D para tarjetas =====
  function init3DCardEffect() {
    const cards = document.querySelectorAll('.project-card, .about-card');
    
    cards.forEach(card => {
      // Variables para seguimiento de movimiento
      let rect, centerX, centerY;
      
      const mouseEnter = () => {
        rect = card.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        card.style.transition = 'transform 0.2s ease-out';
      };
      
      const mouseMove = (e) => {
        if (!rect) return;
        
        // Calcular la posición relativa al centro de la tarjeta
        const relX = e.clientX - centerX;
        const relY = e.clientY - centerY;
        
        // Limitar la rotación a 10 grados
        const maxRotation = 5;
        const rotateX = maxRotation * -relY / (rect.height / 2);
        const rotateY = maxRotation * relX / (rect.width / 2);
        
        // Aplicar transformación
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      };
      
      const mouseLeave = () => {
        card.style.transition = 'transform 0.5s ease-out';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        rect = null;
      };
      
      card.addEventListener('mouseenter', mouseEnter);
      card.addEventListener('mousemove', mouseMove);
      card.addEventListener('mouseleave', mouseLeave);
    });
  }
  
  // ===== Inicializar animación de flip para tarjetas de equipo =====
  function initTeamCardFlip() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
      const front = card.querySelector('.team-card-front');
      const back = card.querySelector('.team-card-back');
      const infoBtn = card.querySelector('.info-btn');
      const backBtn = card.querySelector('.back-btn');
      
      if (infoBtn && backBtn) {
        infoBtn.addEventListener('click', () => {
          card.classList.add('flipped');
        });
        
        backBtn.addEventListener('click', () => {
          card.classList.remove('flipped');
        });
      }
      
      // Añadir efecto de desplazamiento 3D al pasar el ratón
      card.addEventListener('mousemove', (e) => {
        if (card.classList.contains('flipped')) return;
        
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const relX = e.clientX - centerX;
        const relY = e.clientY - centerY;
        
        const maxRotation = 5;
        const rotateX = maxRotation * -relY / (rect.height / 2);
        const rotateY = maxRotation * relX / (rect.width / 2);
        
        card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('flipped')) {
          card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
        }
      });
    });
  }
  
  // ===== Inicializar efecto de scroll en navbar =====
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
  }
  
  // ===== Inicializar imagen animada del header =====
  function initHeaderImage() {
    const heroSection = document.getElementById('home');
    const heroRow = heroSection.querySelector('.row');
    
    // Si solo hay una columna, crear una columna adicional para la imagen
    if (heroRow.children.length === 1) {
      const imageCol = document.createElement('div');
      imageCol.className = 'col-lg-6 slide-in-right';
      
      // Contenedor para la imagen y el canvas superpuesto
      const imageContainer = document.createElement('div');
      imageContainer.className = 'hero-image-container';
      
      // Imagen del robot
      const heroImage = document.createElement('img');
      heroImage.className = 'hero-image';
      heroImage.src = 'img/robot-hero.png'; // Usa una imagen PNG existente o crea una
      heroImage.alt = 'Robot DataTeam';
      
      // Canvas para el overlay de circuitos
      const overlayCanvas = document.createElement('canvas');
      overlayCanvas.className = 'hero-canvas-overlay';
      
      // Añadir elementos al DOM
      imageContainer.appendChild(heroImage);
      imageContainer.appendChild(overlayCanvas);
      imageCol.appendChild(imageContainer);
      heroRow.appendChild(imageCol);
      
      // Inicializar el canvas de circuitos
      initCircuitOverlay(overlayCanvas);
    }
  }
  
  // ===== Inicializar overlay de circuitos para la imagen =====
  function initCircuitOverlay(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas
    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Crear circuitos
    const circuits = [];
    const circuitCount = 20;
    
    for (let i = 0; i < circuitCount; i++) {
      circuits.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 50 + 20,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        width: Math.random() * 2 + 1
      });
    }
    
    // Función para dibujar un circuito
    function drawCircuit(x, y, size, angle, width, opacity) {
      ctx.strokeStyle = `rgba(124, 162, 177, ${opacity})`;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      ctx.beginPath();
      
      // Dibujar líneas de circuito
      ctx.moveTo(-size / 2, 0);
      ctx.lineTo(size / 2, 0);
      
      // Dibujar bifurcaciones
      ctx.moveTo(size / 4, 0);
      ctx.lineTo(size / 4, size / 3);
      
      ctx.moveTo(-size / 4, 0);
      ctx.lineTo(-size / 4, -size / 3);
      
      // Dibujar nodos
      ctx.moveTo(size / 2, 0);
      ctx.arc(size / 2, 0, width * 2, 0, Math.PI * 2);
      
      ctx.moveTo(-size / 2, 0);
      ctx.arc(-size / 2, 0, width * 2, 0, Math.PI * 2);
      
      ctx.moveTo(size / 4, size / 3);
      ctx.arc(size / 4, size / 3, width * 1.5, 0, Math.PI * 2);
      
      ctx.moveTo(-size / 4, -size / 3);
      ctx.arc(-size / 4, -size / 3, width * 1.5, 0, Math.PI * 2);
      
      ctx.stroke();
      ctx.restore();
    }
    
    // Animación de circuitos
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < circuits.length; i++) {
        const circuit = circuits[i];
        
        // Mover circuito
        circuit.x += Math.cos(circuit.angle) * circuit.speed;
        circuit.y += Math.sin(circuit.angle) * circuit.speed;
        
        // Cambiar dirección si sale del canvas
        if (circuit.x < -circuit.size || circuit.x > canvas.width + circuit.size ||
            circuit.y < -circuit.size || circuit.y > canvas.height + circuit.size) {
          circuit.x = Math.random() * canvas.width;
          circuit.y = Math.random() * canvas.height;
          circuit.angle = Math.random() * Math.PI * 2;
        }
        
        // Dibujar circuito
        drawCircuit(
          circuit.x,
          circuit.y,
          circuit.size,
          circuit.angle,
          circuit.width,
          circuit.opacity
        );
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }