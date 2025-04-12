// ===== Efectos oscuros para DataTeam =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los efectos
    initDarkBackgroundCanvas();
    initDarkCircuitOverlay();
    initDarkCursorEffects();
    initDarkCardEffects();
    enhanceDarkSectionTransitions();
  });
  
  // ===== Canvas de fondo con circuitos oscuros =====
  function initDarkBackgroundCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'background-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Colores más oscuros basados en la paleta Diamond actualizada
    const colors = [
      'rgba(90, 128, 144, 0.5)',   // diamond-primary oscurecido
      'rgba(45, 90, 103, 0.5)',    // diamond-deep oscurecido
      'rgba(136, 181, 200, 0.5)',  // diamond-light oscurecido
      'rgba(110, 174, 193, 0.5)',  // teal-light oscurecido
      'rgba(26, 60, 71, 0.5)'      // blue-accent oscurecido
    ];
    
    // Crear nodos de circuito
    const nodes = [];
    const nodeCount = Math.floor(canvas.width * canvas.height / 20000); // Ajustar densidad
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      });
    }
    
    // Establecer conexiones
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          nodes[i].connections.push(j);
        }
      }
    }
    
    // Crear pulsos eléctricos
    const pulses = [];
    
    function createPulse() {
      if (nodes.length > 0) {
        const startNodeIndex = Math.floor(Math.random() * nodes.length);
        
        if (nodes[startNodeIndex].connections.length > 0) {
          const endNodeIndex = nodes[startNodeIndex].connections[
            Math.floor(Math.random() * nodes[startNodeIndex].connections.length)
          ];
          
          pulses.push({
            startNode: startNodeIndex,
            endNode: endNodeIndex,
            progress: 0,
            speed: Math.random() * 0.01 + 0.002,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 2 + 1
          });
        }
      }
    }
    
    // Crear pulsos periódicamente
    setInterval(createPulse, 200);
    
    // Función de animación
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Actualizar y dibujar nodos
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Mover nodos lentamente
        node.x += node.vx;
        node.y += node.vy;
        
        // Rebotar en los bordes
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Dibujar nodo
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Dibujar conexiones tenues
        ctx.lineWidth = 0.3;
        for (let j = 0; j < node.connections.length; j++) {
          const connectedNode = nodes[node.connections[j]];
          const dx = node.x - connectedNode.x;
          const dy = node.y - connectedNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Dibujar línea con opacidad basada en la distancia
          const opacity = 1 - distance / 150;
          ctx.strokeStyle = `rgba(110, 174, 193, ${opacity * 0.15})`;
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.stroke();
        }
      }
      
      // Actualizar y dibujar pulsos
      for (let i = 0; i < pulses.length; i++) {
        const pulse = pulses[i];
        const startNode = nodes[pulse.startNode];
        const endNode = nodes[pulse.endNode];
        
        pulse.progress += pulse.speed;
        
        if (pulse.progress >= 1) {
          // Eliminar pulso cuando llega al final
          pulses.splice(i, 1);
          i--;
          continue;
        }
        
        // Calcular posición actual
        const x = startNode.x + (endNode.x - startNode.x) * pulse.progress;
        const y = startNode.y + (endNode.y - startNode.y) * pulse.progress;
        
        // Dibujar pulso brillante
        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, pulse.size * 2
        );
        gradient.addColorStop(0, pulse.color);
        gradient.addColorStop(1, 'rgba(110, 174, 193, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, pulse.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Dibujar línea iluminada
        ctx.strokeStyle = pulse.color;
        ctx.lineWidth = pulse.size * 0.8;
        ctx.beginPath();
        ctx.moveTo(startNode.x, startNode.y);
        ctx.lineTo(endNode.x, endNode.y);
        ctx.stroke();
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // ===== Overlay de circuitos para imágenes =====
  function initDarkCircuitOverlay() {
    // Buscar imagen del hero si existe
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;
    
    // Verificar si ya existe un canvas overlay
    let overlayCanvas = document.querySelector('.hero-canvas-overlay');
    if (!overlayCanvas) {
      // Crear nuevo canvas
      overlayCanvas = document.createElement('canvas');
      overlayCanvas.classList.add('hero-canvas-overlay');
      heroImage.parentNode.appendChild(overlayCanvas);
    }
    
    const ctx = overlayCanvas.getContext('2d');
    
    // Ajustar tamaño al contenedor
    function resizeCanvas() {
      const rect = heroImage.getBoundingClientRect();
      overlayCanvas.width = rect.width;
      overlayCanvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Crear circuitos
    const circuits = [];
    const circuitCount = 15;
    
    for (let i = 0; i < circuitCount; i++) {
      circuits.push({
        path: generateCircuitPath(overlayCanvas.width, overlayCanvas.height),
        progress: 0,
        speed: Math.random() * 0.001 + 0.0005,
        color: `rgba(110, 174, 193, ${Math.random() * 0.3 + 0.2})`,
        width: Math.random() * 1.5 + 0.5
      });
    }
    
    // Generar un camino de circuito
    function generateCircuitPath(width, height) {
      const path = [];
      const steps = Math.floor(Math.random() * 5) + 3;
      
      // Punto inicial
      let x = Math.random() * width;
      let y = Math.random() * height;
      path.push({ x, y });
      
      // Generar segmentos rectos con giros a 90 grados
      for (let i = 0; i < steps; i++) {
        // Dirección: 0 = horizontal, 1 = vertical
        const direction = Math.round(Math.random());
        
        if (direction === 0) {
          // Movimiento horizontal
          x = Math.random() * width;
          path.push({ x, y });
        } else {
          // Movimiento vertical
          y = Math.random() * height;
          path.push({ x, y });
        }
      }
      
      return path;
    }
    
    // Función de animación
    function animate() {
      ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      
      for (let i = 0; i < circuits.length; i++) {
        const circuit = circuits[i];
        
        // Actualizar progreso
        circuit.progress += circuit.speed;
        if (circuit.progress > 1) {
          circuit.progress = 0;
          circuit.path = generateCircuitPath(overlayCanvas.width, overlayCanvas.height);
        }
        
        // Calcular cuántos segmentos del camino dibujar
        const pathLength = circuit.path.length;
        const segmentsToShow = Math.ceil(pathLength * circuit.progress);
        
        // Dibujar circuito
        ctx.strokeStyle = circuit.color;
        ctx.lineWidth = circuit.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        
        if (segmentsToShow > 0) {
          ctx.moveTo(circuit.path[0].x, circuit.path[0].y);
          
          for (let j = 1; j < segmentsToShow; j++) {
            ctx.lineTo(circuit.path[j].x, circuit.path[j].y);
          }
          
          // Si está en progreso, dibujar una parte del último segmento
          if (segmentsToShow < pathLength) {
            const lastPoint = circuit.path[segmentsToShow - 1];
            const nextPoint = circuit.path[segmentsToShow];
            const segmentProgress = (circuit.progress * pathLength) % 1;
            
            const partialX = lastPoint.x + (nextPoint.x - lastPoint.x) * segmentProgress;
            const partialY = lastPoint.y + (nextPoint.y - lastPoint.y) * segmentProgress;
            
            ctx.lineTo(partialX, partialY);
          }
        }
        
        ctx.stroke();
        
        // Dibujar nodos en las intersecciones
        for (let j = 0; j < Math.min(segmentsToShow, pathLength); j++) {
          ctx.beginPath();
          ctx.arc(circuit.path[j].x, circuit.path[j].y, circuit.width * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = circuit.color;
          ctx.fill();
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // ===== Efectos de cursor oscuros =====
  function initDarkCursorEffects() {
    // Crear elemento de cursor personalizado
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Crear elementos de estela
    const trails = [];
    const trailCount = 8;
    
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      document.body.appendChild(trail);
      trails.push(trail);
    }
    
    // Posiciones históricas para la estela
    const positions = [];
    
    // Evento de movimiento del cursor
    document.addEventListener('mousemove', (e) => {
      // Actualizar cursor principal
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Actualizar historial de posiciones
      positions.unshift({ x: e.clientX, y: e.clientY });
      if (positions.length > trailCount) {
        positions.pop();
      }
      
      // Actualizar estelas
      trails.forEach((trail, index) => {
        if (positions[index]) {
          trail.style.opacity = 1 - (index / trailCount);
          trail.style.left = positions[index].x + 'px';
          trail.style.top = positions[index].y + 'px';
          trail.style.width = 20 - (index * 1.5) + 'px';
          trail.style.height = 20 - (index * 1.5) + 'px';
        }
      });
    });
    
    // Efectos de hover para elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .team-card, .project-card');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.width = '35px';
        cursor.style.height = '35px';
        cursor.style.backgroundColor = 'rgba(110, 174, 193, 0.3)';
        cursor.style.mixBlendMode = 'overlay';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'rgba(110, 174, 193, 0.6)';
        cursor.style.mixBlendMode = 'screen';
      });
      
      // Agregar efecto de ondulación al hacer clic
      element.addEventListener('click', createRippleEffect);
    });
    
    // Función para crear efecto de ondulación
    function createRippleEffect(e) {
      const element = this;
      
      // Crear elemento de ondulación
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      
      // Posicionar en el punto de clic
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      // Agregar al elemento
      element.appendChild(ripple);
      
      // Eliminar después de la animación
      setTimeout(() => {
        ripple.remove();
      }, 800);
    }
    
    // Ocultar cursor por defecto excepto en dispositivos táctiles
    if (!('ontouchstart' in window)) {
      document.body.style.cursor = 'none';
    }
  }
  
  // ===== Efectos para tarjetas oscuras =====
  function initDarkCardEffects() {
    // Agregar clase para mejorar profundidad
    const cards = document.querySelectorAll('.project-card, .team-card, .about-card');
    
    cards.forEach(card => {
      card.classList.add('depth-element');
      
      // Efecto de movimiento 3D
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calcular rotación basada en la posición del cursor
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 5; // -5 a 5 grados
        const rotateX = ((y - centerY) / centerY) * -5; // 5 a -5 grados (invertido)
        
        // Aplicar transformación
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Efecto de iluminación
        card.style.boxShadow = `
          0 15px 35px rgba(19, 31, 49, 0.15),
          ${rotateY * -0.5}px ${rotateX * -0.5}px 10px rgba(110, 174, 193, 0.1)
        `;
      });
      
      // Restaurar al salir
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.boxShadow = 'var(--shadow-md)';
      });
      
      // Agregar efecto de borde brillante
      card.classList.add('glow-border');
    });
    
    // Mejorar efecto de flip para tarjetas de equipo
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
      const infoBtn = card.querySelector('.info-btn');
      const backBtn = card.querySelector('.back-btn');
      
      if (infoBtn && backBtn) {
        // Agregar efecto de pulso al botón de info
        infoBtn.style.animation = 'pulse 2s infinite';
        
        // Mejorar transición de flip
        card.querySelector('.team-card-inner').style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }
    });
  }
  
  // ===== Mejorar transiciones entre secciones =====
  function enhanceDarkSectionTransitions() {
    // Animación de entrada para secciones
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          
          // Animar elementos dentro de la sección
          const elementsToAnimate = entry.target.querySelectorAll('.fade-in, .slide-in-left, .zoom-in');
          elementsToAnimate.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('active');
            }, 100 * index);
          });
        }
      });
    }, { threshold: 0.15 });
    
    sections.forEach(section => {
      observer.observe(section);
      
      // Agregar un fondo sutil de circuitos
      section.classList.add('circuit-bg');
      
      // Transición suave del scroll
      const links = section.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Efecto de desenfoque temporal
            document.body.classList.add('blur-on-scroll');
            
            setTimeout(() => {
              window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
              });
              
              setTimeout(() => {
                document.body.classList.remove('blur-on-scroll');
              }, 500);
            }, 200);
          }
        });
      });
    });
    
    // Añadir estilos CSS para la transición de secciones
    const style = document.createElement('style');
    style.textContent = `
      .section-visible {
        animation: fadeInSection 0.8s ease forwards;
      }
      
      @keyframes fadeInSection {
        from {
          opacity: 0.8;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .blur-on-scroll {
        transition: filter 0.5s ease;
        filter: blur(5px);
      }
    `;
    document.head.appendChild(style);
    
    // Efecto para el título principal
    const mainTitle = document.querySelector('.hero h1');
    if (mainTitle) {
      // Crear efecto de texto con brillo
      mainTitle.innerHTML = mainTitle.textContent.split('').map(char => 
        char === ' ' ? ' ' : `<span>${char}</span>`
      ).join('');
      
      // Animar cada letra
      Array.from(mainTitle.querySelectorAll('span')).forEach((span, index) => {
        span.style.display = 'inline-block';
        span.style.animationDelay = `${index * 0.05}s`;
        span.style.animation = 'glowText 3s ease-in-out infinite';
        span.style.animationDelay = `${index * 0.05}s`;
      });
      
      // Agregar keyframes para el efecto de brillo
      const glowKeyframes = `
        @keyframes glowText {
          0%, 100% {
            text-shadow: 0 0 2px rgba(110, 174, 193, 0.3);
            transform: translateY(0);
          }
          50% {
            text-shadow: 0 0 10px rgba(110, 174, 193, 0.6);
            transform: translateY(-2px);
          }
        }
      `;
      
      const styleSheet = document.createElement('style');
      styleSheet.textContent = glowKeyframes;
      document.head.appendChild(styleSheet);
    }
  }
  
  // ===== Función para agregar ondas sutiles al fondo =====
  function addDarkWaves() {
    const waves = document.createElement('div');
    waves.className = 'dark-waves';
    document.body.appendChild(waves);
    
    // Crear múltiples ondas
    for (let i = 0; i < 3; i++) {
      const wave = document.createElement('div');
      wave.className = 'dark-wave';
      wave.style.animationDelay = `${i * 2}s`;
      waves.appendChild(wave);
    }
    
    // Agregar estilos para las ondas
    const style = document.createElement('style');
    style.textContent = `
      .dark-waves {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
      }
      
      .dark-wave {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 200%;
        height: 100%;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%236eaec1" fill-opacity="0.05" d="M0,224L60,229.3C120,235,240,245,360,229.3C480,213,600,171,720,165.3C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        animation: waveAnimation 20s linear infinite;
        opacity: 0.3;
      }
      
      @keyframes waveAnimation {
        0% {
          transform: translateX(0) translateZ(0);
        }
        50% {
          transform: translateX(-25%) translateZ(0);
        }
        100% {
          transform: translateX(-50%) translateZ(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Ejecutar la función de ondas después de que el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    addDarkWaves();
    
    // Mejorar el efecto de carga inicial de la página
    document.body.classList.add('transition-ready');
    
    setTimeout(() => {
      document.body.classList.add('page-loaded');
      
      // Agregar animación de entrada al título principal
      const heroTitle = document.querySelector('.hero h1');
      if (heroTitle) {
        heroTitle.classList.add('animate-title');
      }
    }, 100);
    
    // Estilos para la transición de carga
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
      .transition-ready {
        opacity: 0;
        transition: opacity 0.8s ease;
      }
      
      .page-loaded {
        opacity: 1;
      }
      
      .animate-title {
        animation: titleEnter 1.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      }
      
      @keyframes titleEnter {
        0% {
          opacity: 0;
          transform: translateY(-30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(loadingStyle);
  });