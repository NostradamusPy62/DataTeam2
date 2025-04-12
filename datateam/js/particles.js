// ===== Canvas de Partículas y Circuitos =====
document.addEventListener('DOMContentLoaded', function() {
    // Crear el canvas para el fondo interactivo
    createInteractiveBackground();
  });
  
  function createInteractiveBackground() {
    // Crear elemento canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'interactive-canvas';
    
    // Buscar el contenedor del canvas si existe
    const canvasContainer = document.querySelector('.canvas-container');
    
    if (canvasContainer) {
      canvasContainer.appendChild(canvas);
      
      // Configurar el canvas
      const ctx = canvas.getContext('2d');
      
      // Ajustar tamaño inicial
      function resizeCanvas() {
        canvas.width = canvasContainer.offsetWidth;
        canvas.height = canvasContainer.offsetHeight || 400; // Altura mínima
      }
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      // Configuración de partículas
      const particles = [];
      const connections = [];
      
      // Colores de la paleta Diamond
      const colors = [
        'rgba(124, 162, 177, 0.7)', // --diamond-primary
        'rgba(79, 127, 140, 0.7)',  // --diamond-deep
        'rgba(185, 218, 233, 0.7)', // --diamond-light
        'rgba(159, 209, 224, 0.7)', // --teal-light
        'rgba(180, 214, 209, 0.7)'  // --mint-soft
      ];
      
      // Íconos tecnológicos
      const techIcons = document.querySelectorAll('.tech-icon');
      const techIconPositions = [];
      
      techIcons.forEach(icon => {
        const rect = icon.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        
        techIconPositions.push({
          x: rect.left - canvasRect.left + rect.width / 2,
          y: rect.top - canvasRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
          type: icon.getAttribute('data-icon') || 'default'
        });
      });
      
      // Crear nodos para los circuitos
      function createCircuitNodes() {
        const nodes = [];
        const nodeCount = Math.floor(canvas.width / 50); // Un nodo por cada 50px de ancho
        
        for (let i = 0; i < nodeCount; i++) {
          nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
        
        // Añadir nodos en los íconos tecnológicos
        techIconPositions.forEach(icon => {
          // Añadir un nodo en el centro del icono
          nodes.push({
            x: icon.x,
            y: icon.y,
            radius: 3,
            color: colors[0], // Color primario para íconos
            isIconNode: true,
            iconType: icon.type
          });
          
          // Añadir nodos alrededor del icono
          for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 30 + 20;
            
            nodes.push({
              x: icon.x + Math.cos(angle) * distance,
              y: icon.y + Math.sin(angle) * distance,
              radius: Math.random() * 2 + 1,
              color: colors[Math.floor(Math.random() * colors.length)],
              isIconNode: false,
              iconType: icon.type
            });
          }
        });
        
        return nodes;
      }
      
      // Crear conexiones entre nodos
      function createConnections(nodes) {
        const connections = [];
        
        for (let i = 0; i < nodes.length; i++) {
          // Cada nodo se conecta con 1-3 nodos cercanos
          const connectionCount = Math.floor(Math.random() * 3) + 1;
          
          // Organizar nodos por distancia
          const nodesByDistance = [];
          
          for (let j = 0; j < nodes.length; j++) {
            if (i !== j) {
              const dx = nodes[i].x - nodes[j].x;
              const dy = nodes[i].y - nodes[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 150) { // Máxima distancia para conexiones
                nodesByDistance.push({
                  index: j,
                  distance: distance
                });
              }
            }
          }
          
          // Ordenar por distancia
          nodesByDistance.sort((a, b) => a.distance - b.distance);
          
          // Conectar con los nodos más cercanos
          for (let k = 0; k < Math.min(connectionCount, nodesByDistance.length); k++) {
            connections.push({
              from: i,
              to: nodesByDistance[k].index,
              active: Math.random() > 0.5, // Algunas conexiones comienzan activas
              pulsePosition: 0,
              pulseSpeed: Math.random() * 0.02 + 0.01,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }
          
          // Si es un nodo de icono, asegurar que tenga más conexiones
          if (nodes[i].isIconNode) {
            for (let k = 0; k < 3; k++) {
              if (k + connectionCount < nodesByDistance.length) {
                connections.push({
                  from: i,
                  to: nodesByDistance[k + connectionCount].index,
                  active: true, // Siempre activo para nodos de icono
                  pulsePosition: 0,
                  pulseSpeed: Math.random() * 0.02 + 0.01,
                  color: colors[0] // Color primario para conexiones de íconos
                });
              }
            }
          }
        }
        
        return connections;
      }
      
      // Crear partículas
      function createParticles() {
        const particleCount = Math.floor(canvas.width / 10); // Una partícula por cada 10px de ancho
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.5 + 0.2
          });
        }
      }
      
      // Inicializar
      const nodes = createCircuitNodes();
      const connectionList = createConnections(nodes);
      createParticles();
      
      // Variables para interacción con el ratón
      let mouseX = 0;
      let mouseY = 0;
      let mouseRadius = 100;
      
      // Detectar movimiento del ratón
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      });
      
      // Función de animación
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar conexiones
        for (let i = 0; i < connectionList.length; i++) {
          const connection = connectionList[i];
          const fromNode = nodes[connection.from];
          const toNode = nodes[connection.to];
          
          // Calcular distancia al ratón para activar conexiones
          const dx1 = mouseX - fromNode.x;
          const dy1 = mouseY - fromNode.y;
          const dx2 = mouseX - toNode.x;
          const dy2 = mouseY - toNode.y;
          const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          // Activar conexiones cercanas al ratón
          if (distance1 < mouseRadius || distance2 < mouseRadius) {
            connection.active = true;
          }
          
          if (connection.active) {
            // Dibujar línea de conexión
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.strokeStyle = connection.color || 'rgba(124, 162, 177, 0.3)';
            ctx.lineWidth = fromNode.isIconNode || toNode.isIconNode ? 1.5 : 0.5;
            ctx.stroke();
            
            // Dibujar pulso en la conexión
            connection.pulsePosition += connection.pulseSpeed;
            if (connection.pulsePosition > 1) {
              connection.pulsePosition = 0;
              // 50% de probabilidad de desactivar la conexión si no está cerca del ratón
              if (distance1 > mouseRadius && distance2 > mouseRadius && Math.random() > 0.5) {
                connection.active = false;
              }
            }
            
            const pulseX = fromNode.x + (toNode.x - fromNode.x) * connection.pulsePosition;
            const pulseY = fromNode.y + (toNode.y - fromNode.y) * connection.pulsePosition;
            
            // Gradiente para el pulso
            const gradient = ctx.createRadialGradient(
              pulseX, pulseY, 0,
              pulseX, pulseY, 5
            );
            gradient.addColorStop(0, connection.color || 'rgba(159, 209, 224, 0.8)');
            gradient.addColorStop(1, 'rgba(159, 209, 224, 0)');
            
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        }
        
        // Dibujar nodos
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();
          
          // Efecto hover en nodos cerca del ratón
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 30) {
            // Dibujar halo alrededor del nodo
            const gradient = ctx.createRadialGradient(
              node.x, node.y, node.radius,
              node.x, node.y, node.radius + 10
            );
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, 'rgba(159, 209, 224, 0)');
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + 10, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Activar conexiones relacionadas con este nodo
            for (let j = 0; j < connectionList.length; j++) {
              if (connectionList[j].from === i || connectionList[j].to === i) {
                connectionList[j].active = true;
              }
            }
          }
        }
        
        // Dibujar partículas
        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i];
          
          // Mover partículas
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Rebotar en los bordes
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
          
          // Atraer partículas hacia el cursor
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseRadius - distance) / mouseRadius * 0.02;
            
            particle.speedX += Math.cos(angle) * force;
            particle.speedY += Math.sin(angle) * force;
          }
          
          // Limitar velocidad
          const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
          if (speed > 1) {
            particle.speedX = (particle.speedX / speed) * 1;
            particle.speedY = (particle.speedY / speed) * 1;
          }
          
          // Dibujar partícula
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(')', `, ${particle.alpha})`).replace('rgba', 'rgba');
          ctx.fill();
        }
        
        // Solicitar siguiente frame
        requestAnimationFrame(animate);
      }
      
      // Iniciar animación
      animate();
      
      // Mostrar iconos tecnológicos con efecto de aparición
      techIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          icon.style.opacity = '0.7';
          icon.style.transform = 'translateY(0)';
        }, 200 + index * 100);
      });
    }
  }
  
  // ===== Animación de burbuja en el fondo =====
  document.addEventListener('DOMContentLoaded', function() {
    createBubbleEffect();
  });
  
  function createBubbleEffect() {
    // Crear el elemento canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'bubble-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Crear burbujas
    const bubbles = [];
    const bubbleCount = Math.floor(window.innerWidth / 50); // Una burbuja por cada 50px de ancho
    
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 30 + 10,
        color: `rgba(${180 + Math.random() * 20}, ${215 + Math.random() * 15}, ${230 + Math.random() * 10}, ${Math.random() * 0.2 + 0.1})`,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulseFactor: 0,
        pulseDirection: 1
      });
    }
    
    // Función de animación
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        
        // Actualizar pulsación
        bubble.pulseFactor += bubble.pulseSpeed * bubble.pulseDirection;
        if (bubble.pulseFactor > 1 || bubble.pulseFactor < 0) {
          bubble.pulseDirection *= -1;
        }
        
        // Calcular radio con pulsación
        const currentRadius = bubble.radius * (1 + bubble.pulseFactor * 0.1);
        
        // Mover burbujas
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;
        
        // Rebotar en los bordes
        if (bubble.x < -currentRadius) bubble.x = canvas.width + currentRadius;
        if (bubble.x > canvas.width + currentRadius) bubble.x = -currentRadius;
        if (bubble.y < -currentRadius) bubble.y = canvas.height + currentRadius;
        if (bubble.y > canvas.height + currentRadius) bubble.y = -currentRadius;
        
        // Dibujar burbuja
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          bubble.x, bubble.y, 0,
          bubble.x, bubble.y, currentRadius
        );
        gradient.addColorStop(0, bubble.color.replace(')', ', 0.1)').replace('rgba', 'rgba'));
        gradient.addColorStop(0.8, bubble.color);
        gradient.addColorStop(1, bubble.color.replace(')', ', 0)').replace('rgba', 'rgba'));
        
        ctx.arc(bubble.x, bubble.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // ===== Efecto de circuito eléctrico =====
  document.addEventListener('DOMContentLoaded', function() {
    createElectricCircuitEffect();
  });
  
  function createElectricCircuitEffect() {
    // Crear elemento canvas para el efecto de circuito
    const canvas = document.createElement('canvas');
    canvas.id = 'circuit-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.05';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateCircuit(); // Regenerar circuito al cambiar tamaño
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Parámetros del circuito
    let nodes = [];
    let paths = [];
    let currentPaths = [];
    
    // Generar el circuito
    function generateCircuit() {
      nodes = [];
      paths = [];
      currentPaths = [];
      
      // Crear rejilla
      const gridSize = 50;
      const cols = Math.floor(canvas.width / gridSize);
      const rows = Math.floor(canvas.height / gridSize);
      
      // Crear nodos
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Añadir nodo con algo de variación aleatoria
          if (Math.random() > 0.7) {
            nodes.push({
              x: x * gridSize + Math.random() * 10 - 5,
              y: y * gridSize + Math.random() * 10 - 5,
              connections: []
            });
          }
        }
      }
      
      // Conectar nodos cercanos
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        for (let j = 0; j < nodes.length; j++) {
          if (i !== j) {
            const otherNode = nodes[j];
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Conectar si están suficientemente cerca
            if (distance < gridSize * 1.5) {
              // Evitar demasiadas conexiones
              if (node.connections.length < 3 && otherNode.connections.length < 3) {
                node.connections.push(j);
                
                // Crear camino
                paths.push({
                  from: i,
                  to: j,
                  active: false
                });
              }
            }
          }
        }
      }
      
      // Activar algunos caminos inicialmente
      const initialActivePaths = Math.min(10, paths.length);
      for (let i = 0; i < initialActivePaths; i++) {
        const randomPath = Math.floor(Math.random() * paths.length);
        activatePath(randomPath);
      }
    }
    
    // Activar un camino
    function activatePath(pathIndex) {
      const path = paths[pathIndex];
      if (!path.active) {
        path.active = true;
        
        // Crear un pulso que viaja a lo largo del camino
        currentPaths.push({
          path: pathIndex,
          progress: 0,
          speed: Math.random() * 0.01 + 0.005,
          color: `rgba(159, 209, 224, ${Math.random() * 0.3 + 0.4})`
        });
      }
    }
    
    // Función de animación
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar conexiones
      ctx.strokeStyle = 'rgba(124, 162, 177, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const fromNode = nodes[path.from];
        const toNode = nodes[path.to];
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      }
      
      // Dibujar nodos
      ctx.fillStyle = 'rgba(124, 162, 177, 0.2)';
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Actualizar y dibujar pulsos activos
      for (let i = 0; i < currentPaths.length; i++) {
        const current = currentPaths[i];
        const path = paths[current.path];
        const fromNode = nodes[path.from];
        const toNode = nodes[path.to];
        
        // Actualizar progreso
        current.progress += current.speed;
        
        if (current.progress > 1) {
          // Llegó al final del camino
          paths[current.path].active = false;
          
          // Activar caminos conectados aleatoriamente
          const nextNode = path.to;
          const possiblePaths = [];
          
          for (let j = 0; j < paths.length; j++) {
            if (paths[j].from === nextNode && !paths[j].active) {
              possiblePaths.push(j);
            }
          }
          
          // Activar un nuevo camino si existe
          if (possiblePaths.length > 0 && Math.random() > 0.3) {
            const nextPath = possiblePaths[Math.floor(Math.random() * possiblePaths.length)];
            activatePath(nextPath);
          }
          
          // Eliminar este pulso
          currentPaths.splice(i, 1);
          i--;
          continue;
        }
        
        // Calcular posición actual
        const x = fromNode.x + (toNode.x - fromNode.x) * current.progress;
        const y = fromNode.y + (toNode.y - fromNode.y) * current.progress;
        
        // Dibujar pulso
        ctx.fillStyle = current.color;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Dibujar estela
        ctx.strokeStyle = current.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fromNode.x + (toNode.x - fromNode.x) * Math.max(0, current.progress - 0.1), 
                   fromNode.y + (toNode.y - fromNode.y) * Math.max(0, current.progress - 0.1));
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      
      // Activar nuevos caminos ocasionalmente
      if (Math.random() > 0.98 && currentPaths.length < 10) {
        const randomPath = Math.floor(Math.random() * paths.length);
        activatePath(randomPath);
      }
      
      requestAnimationFrame(animate);
    }
    
    // Inicializar
    generateCircuit();
    animate();
  }