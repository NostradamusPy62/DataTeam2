// Módulo de animaciones interactivas para Raspbot
// Incluye: 
// 1. Animación de burbujas que siguen al ratón y explotan al hacer clic
// 2. Efecto de circuito eléctrico en el header

// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
  // Crear los canvas necesarios
  setupBubblesCanvas();
  setupCircuitCanvas();
  
  // Iniciar animaciones
  animateBubbles();
  animateCircuit();
});

// ===== 1. CANVAS DE BURBUJAS INTERACTIVAS =====
let bubblesCanvas, bubblesCtx;
let bubbles = [];
let mouseX = 0, mouseY = 0;
let canvasWidth, canvasHeight;

// Colores para las burbujas (tonos de azul claro a oscuro)
const bubbleColors = [
  'rgba(173, 216, 230, 0.7)',  // Light blue
  'rgba(135, 206, 235, 0.7)',  // Sky blue
  'rgba(0, 191, 255, 0.7)',    // Deep sky blue
  'rgba(30, 144, 255, 0.7)',   // Dodger blue
  'rgba(100, 149, 237, 0.7)'   // Cornflower blue
];

// Configuración del canvas de burbujas
function setupBubblesCanvas() {
  // Crear elemento canvas y añadirlo al DOM
  bubblesCanvas = document.createElement('canvas');
  bubblesCanvas.id = 'particleCanvas';
  bubblesCanvas.style.position = 'fixed';
  bubblesCanvas.style.top = '0';
  bubblesCanvas.style.left = '0';
  bubblesCanvas.style.width = '100%';
  bubblesCanvas.style.height = '100%';
  bubblesCanvas.style.zIndex = '-1';
  bubblesCanvas.style.pointerEvents = 'none'; // Permite interactuar con elementos debajo del canvas
  document.body.prepend(bubblesCanvas);
  
  // Obtener contexto y ajustar dimensiones
  bubblesCtx = bubblesCanvas.getContext('2d');
  resizeCanvas();
  
  // Eventos para seguimiento del ratón
  document.addEventListener('mousemove', trackMouse);
  document.addEventListener('click', createExplosion);
  window.addEventListener('resize', resizeCanvas);
  
  // Inicializar burbujas
  createInitialBubbles();
}

// Ajustar dimensiones del canvas según la ventana
function resizeCanvas() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  bubblesCanvas.width = canvasWidth;
  bubblesCanvas.height = canvasHeight;
}

// Seguimiento de la posición del ratón
function trackMouse(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

// Crear burbujas iniciales
function createInitialBubbles() {
  bubbles = [];
  const bubbleCount = Math.floor(window.innerWidth / 30); // Cantidad proporcional al ancho de pantalla
  
  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push(createBubble());
  }
}

// Crear una burbuja con propiedades aleatorias
function createBubble(x, y, isExplosion = false) {
  const size = isExplosion ? 2 + Math.random() * 5 : 5 + Math.random() * 20;
  return {
    x: x !== undefined ? x : Math.random() * canvasWidth,
    y: y !== undefined ? y : Math.random() * canvasHeight,
    radius: size,
    originalRadius: size,
    color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
    speedX: Math.random() * 2 - 1,
    speedY: Math.random() * 2 - 1,
    mouseInfluence: isExplosion ? 0 : 0.03 + Math.random() * 0.07,
    growth: isExplosion ? 0.2 + Math.random() * 0.3 : 0,
    opacity: 1,
    isExplosion: isExplosion
  };
}

// Crear efecto de explosión al hacer clic
function createExplosion(e) {
  // Crear entre 10-20 burbujas pequeñas en la posición del clic
  const particleCount = 10 + Math.floor(Math.random() * 10);
  for (let i = 0; i < particleCount; i++) {
    bubbles.push(createBubble(e.clientX, e.clientY, true));
  }
}

// Animación principal de burbujas
function animateBubbles() {
  // Limpiar canvas
  bubblesCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Actualizar y dibujar cada burbuja
  for (let i = 0; i < bubbles.length; i++) {
    const b = bubbles[i];
    
    // Actualizar posición
    b.x += b.speedX;
    b.y += b.speedY;
    
    // Rebote en los bordes
    if (b.x < 0 || b.x > canvasWidth) b.speedX *= -1;
    if (b.y < 0 || b.y > canvasHeight) b.speedY *= -1;
    
    // Atracción del ratón para burbujas normales
    if (!b.isExplosion) {
      // Calcular dirección hacia el ratón
      const dx = mouseX - b.x;
      const dy = mouseY - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Aplicar atracción si está a cierta distancia
      if (distance < 200) {
        b.x += (dx / distance) * b.mouseInfluence;
        b.y += (dy / distance) * b.mouseInfluence;
      }
    } 
    // Efecto de explosión
    else {
      b.radius += b.growth;
      b.opacity -= 0.02;
      
      // Eliminar partículas de explosión que ya no son visibles
      if (b.opacity <= 0) {
        bubbles.splice(i, 1);
        i--;
        continue;
      }
    }
    
    // Dibujar burbuja
    bubblesCtx.beginPath();
    bubblesCtx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    bubblesCtx.fillStyle = b.isExplosion ? 
      b.color.replace(')', `, ${b.opacity})`) : b.color;
    bubblesCtx.fill();
    
    // Añadir brillo (círculo interno más claro)
    const highlightRadius = b.radius * 0.5;
    bubblesCtx.beginPath();
    bubblesCtx.arc(b.x - highlightRadius / 3, b.y - highlightRadius / 3, highlightRadius, 0, Math.PI * 2);
    bubblesCtx.fillStyle = b.isExplosion ? 
      `rgba(255, 255, 255, ${b.opacity * 0.5})` : 'rgba(255, 255, 255, 0.3)';
    bubblesCtx.fill();
  }
  
  // Regenerar burbujas si hay menos de la cantidad inicial
  if (bubbles.filter(b => !b.isExplosion).length < Math.floor(window.innerWidth / 30)) {
    bubbles.push(createBubble());
  }
  
  // Continuar animación
  requestAnimationFrame(animateBubbles);
}

// ===== 2. EFECTO DE CIRCUITO ELÉCTRICO EN HEADER =====
let circuitCanvas, circuitCtx;
let nodes = [];
let connections = [];
let particles = [];

// Configuración del canvas de circuito
function setupCircuitCanvas() {
  // Encontrar el header
  const header = document.querySelector('#home');
  if (!header) return;
  
  // Asegurar que el header tenga posición relativa para posicionar el canvas correctamente
  header.style.position = header.style.position || 'relative';
  header.style.overflow = 'hidden';
  
  // Crear elemento canvas y añadirlo al header
  circuitCanvas = document.createElement('canvas');
  circuitCanvas.id = 'circuitCanvas';
  circuitCanvas.style.position = 'absolute';
  circuitCanvas.style.top = '0';
  circuitCanvas.style.left = '0';
  circuitCanvas.style.width = '100%';
  circuitCanvas.style.height = '100%';
  circuitCanvas.style.zIndex = '0';
  circuitCanvas.style.pointerEvents = 'none';
  header.appendChild(circuitCanvas);
  
  // Obtener contexto y ajustar dimensiones
  circuitCtx = circuitCanvas.getContext('2d');
  resizeCircuitCanvas();
  
  // Ajustar dimensiones al cambiar tamaño de ventana
  window.addEventListener('resize', resizeCircuitCanvas);
  
  // Inicializar circuito
  createCircuitLayout();
}

// Ajustar dimensiones del canvas según el header
function resizeCircuitCanvas() {
  const header = document.querySelector('#home');
  if (!header || !circuitCanvas) return;
  
  const headerWidth = header.offsetWidth;
  const headerHeight = header.offsetHeight;
  
  circuitCanvas.width = headerWidth;
  circuitCanvas.height = headerHeight;
  
  // Recrear circuito al redimensionar
  createCircuitLayout();
}

// Crear layout del circuito
function createCircuitLayout() {
  if (!circuitCanvas) return;
  
  // Obtener dimensiones
  const width = circuitCanvas.width;
  const height = circuitCanvas.height;
  
  // Crear nodos
  nodes = [];
  const nodeCount = Math.floor(width / 100) * Math.floor(height / 100);
  
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 2 + Math.random() * 3
    });
  }
  
  // Crear conexiones entre nodos cercanos
  connections = [];
  
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    
    // Encontrar nodos cercanos
    for (let j = i + 1; j < nodes.length; j++) {
      const otherNode = nodes[j];
      const dx = node.x - otherNode.x;
      const dy = node.y - otherNode.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Conectar si están suficientemente cerca
      if (distance < 150) {
        connections.push({
          from: i,
          to: j,
          active: false,
          lastActive: 0
        });
      }
    }
  }
  
  // Inicializar partículas que representan la corriente
  particles = [];
  
  // Crear varias partículas iniciales
  for (let i = 0; i < 10; i++) {
    createCircuitParticle();
  }
}

// Crear una nueva partícula en el circuito
function createCircuitParticle() {
  if (connections.length === 0) return;
  
  // Elegir una conexión aleatoria
  const connectionIndex = Math.floor(Math.random() * connections.length);
  const connection = connections[connectionIndex];
  
  // Activar la conexión
  connection.active = true;
  connection.lastActive = Date.now();
  
  // Crear partícula en el nodo inicial
  const startNode = nodes[connection.from];
  
  particles.push({
    x: startNode.x,
    y: startNode.y,
    connectionIndex: connectionIndex,
    progress: 0,
    speed: 0.02 + Math.random() * 0.03
  });
}

// Animación del circuito eléctrico
function animateCircuit() {
  if (!circuitCanvas || !circuitCtx) {
    requestAnimationFrame(animateCircuit);
    return;
  }
  
  // Limpiar canvas
  circuitCtx.clearRect(0, 0, circuitCanvas.width, circuitCanvas.height);
  
  // Dibujar conexiones
  for (let i = 0; i < connections.length; i++) {
    const connection = connections[i];
    const fromNode = nodes[connection.from];
    const toNode = nodes[connection.to];
    
    // Determinar si la conexión está activa
    const timeSinceActive = Date.now() - connection.lastActive;
    const isRecentlyActive = timeSinceActive < 1000;
    
    // Dibujar línea con opacidad según actividad
    circuitCtx.beginPath();
    circuitCtx.moveTo(fromNode.x, fromNode.y);
    circuitCtx.lineTo(toNode.x, toNode.y);
    
    // Color según actividad
    if (connection.active || isRecentlyActive) {
      const alpha = isRecentlyActive ? 1 - (timeSinceActive / 1000) : 1;
      circuitCtx.strokeStyle = `rgba(100, 217, 255, ${alpha * 0.8})`;
      circuitCtx.lineWidth = 2;
    } else {
      circuitCtx.strokeStyle = 'rgba(100, 149, 237, 0.3)';
      circuitCtx.lineWidth = 1;
    }
    
    circuitCtx.stroke();
    
    // Desactivar conexiones después de un tiempo
    if (connection.active && timeSinceActive > 500) {
      connection.active = false;
    }
  }
  
  // Dibujar nodos
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    
    circuitCtx.beginPath();
    circuitCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    circuitCtx.fillStyle = 'rgba(135, 206, 250, 0.8)';
    circuitCtx.fill();
    
    // Añadir brillo
    circuitCtx.beginPath();
    circuitCtx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
    circuitCtx.fillStyle = 'rgba(135, 206, 250, 0.2)';
    circuitCtx.fill();
  }
  
  // Actualizar y dibujar partículas
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const connection = connections[p.connectionIndex];
    const fromNode = nodes[connection.from];
    const toNode = nodes[connection.to];
    
    // Actualizar progreso
    p.progress += p.speed;
    
    // Calcular posición actual
    p.x = fromNode.x + (toNode.x - fromNode.x) * p.progress;
    p.y = fromNode.y + (toNode.y - fromNode.y) * p.progress;
    
    // Dibujar partícula
    circuitCtx.beginPath();
    circuitCtx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    circuitCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    circuitCtx.fill();
    
    // Brillo alrededor de la partícula
    circuitCtx.beginPath();
    circuitCtx.arc(p.x, p.y, 8, 0, Math.PI * 2);
    circuitCtx.fillStyle = 'rgba(100, 217, 255, 0.5)';
    circuitCtx.fill();
    
    // Si la partícula llegó al final, crear una nueva
    if (p.progress >= 1) {
      // Eliminar partícula actual
      particles.splice(i, 1);
      i--;
      
      // Buscar conexiones desde el nodo destino
      const nextConnections = connections.filter(c => 
        c.from === connection.to || c.to === connection.to
      );
      
      // Si hay conexiones disponibles, crear una nueva partícula
      if (nextConnections.length > 0) {
        const nextConnection = nextConnections[Math.floor(Math.random() * nextConnections.length)];
        nextConnection.active = true;
        nextConnection.lastActive = Date.now();
        
        // Determinar dirección
        const startNodeIndex = (nextConnection.from === connection.to) ? 
          nextConnection.from : nextConnection.to;
        const endNodeIndex = (nextConnection.from === connection.to) ? 
          nextConnection.to : nextConnection.from;
        
        // Crear nueva partícula
        particles.push({
          x: nodes[startNodeIndex].x,
          y: nodes[startNodeIndex].y,
          connectionIndex: connections.indexOf(nextConnection),
          progress: (startNodeIndex === nextConnection.to) ? 1 - 0.01 : 0.01,
          speed: (startNodeIndex === nextConnection.to) ? -p.speed : p.speed
        });
      }
      
      // Ocasionalmente crear partículas nuevas en puntos aleatorios
      if (Math.random() < 0.3 && particles.length < 20) {
        createCircuitParticle();
      }
    }
  }
  
  // Asegurar que siempre haya algunas partículas
  if (particles.length === 0 || Math.random() < 0.02) {
    createCircuitParticle();
  }
  
  // Continuar animación
  requestAnimationFrame(animateCircuit);
}