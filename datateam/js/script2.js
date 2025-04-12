// Crear el canvas para el trail de íconos
const trailCanvas = document.createElement('canvas');
trailCanvas.id = 'cursor-trail';
trailCanvas.style.position = 'absolute';
trailCanvas.style.top = '0';
trailCanvas.style.left = '0';
trailCanvas.style.pointerEvents = 'none';
trailCanvas.style.zIndex = '1000';

// Seleccionar la sección donde aplicaremos el efecto del cursor
const targetSection = document.getElementById('home');
targetSection.style.position = 'relative';
targetSection.appendChild(trailCanvas);

// Configuración del efecto
const trailConfig = {
    maxParticles: 15,         // Máximo número de íconos en pantalla
    spawnRate: 150,           // Ms entre nuevos íconos
    iconSize: 20,             // Tamaño base de los íconos
    lifespan: 2000,           // Duración de vida del ícono (ms)
    velocityFactor: 0.5,      // Factor de velocidad de movimiento
    fadeSpeed: 0.015,         // Velocidad de desvanecimiento
    floatSpeed: 1,            // Velocidad de flotación hacia arriba
    icons: [
        { name: 'raspberry-pi', color: '#CD2355' },
        { name: 'python', color: '#3776AB' },
        { name: 'robot', color: '#00979D' }, 
        { name: 'computer', color: '#6C63FF' }      
    ]
};

// Clase para manejar las partículas (íconos)
class IconParticle {
    constructor(x, y, iconInfo) {
        this.x = x;
        this.y = y;
        this.initialX = x;
        this.initialY = y;
        this.size = trailConfig.iconSize * (0.8 + Math.random() * 0.4); // Tamaño variable
        this.alpha = 1;
        this.velocityX = (Math.random() - 0.5) * trailConfig.velocityFactor;
        this.velocityY = -Math.random() * trailConfig.floatSpeed - 0.5; // Siempre hacia arriba
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.iconInfo = iconInfo;
        this.createdAt = Date.now();
    }

    update() {
        const age = Date.now() - this.createdAt;
        const lifePercentage = Math.min(age / trailConfig.lifespan, 1);
        
        // Movimiento
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Rotación
        this.rotation += this.rotationSpeed;
        
        // Desvanecimiento gradual
        this.alpha = Math.max(0, 1 - lifePercentage);
        
        // Devolver true si la partícula todavía está viva
        return age < trailConfig.lifespan;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Dibujar el ícono usando Font Awesome
        ctx.font = `${this.size}px "Font Awesome 6 Free", "Font Awesome 6 Brands"`;
        ctx.fillStyle = this.iconInfo.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Determinar qué ícono usar basado en el nombre
        let iconCode;
        switch (this.iconInfo.name) {
            case 'raspberry-pi':
                iconCode = '\uf7bb'; // Font Awesome raspberry-pi
                break;
            case 'python':
                iconCode = '\uf3e2'; // Font Awesome python
                break;
            case 'robot':
                iconCode = '\uf4fb'; // Font Awesome robot (para Arduino)
                break;
            case 'computer':
                iconCode = '\uf109'; // Font Awesome computer (para IA)
                break;
            default:
                iconCode = '\uf111'; // Círculo por defecto
        }
        
        ctx.fillText(iconCode, 0, 0);
        ctx.restore();
    }
}

// Sistema de partículas
class ParticleSystem {
    constructor(canvas, targetElement) {
        this.canvas = canvas;
        this.targetElement = targetElement;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.isMouseInTarget = false;
        this.lastSpawnTime = 0;
        
        this.resizeCanvas();
        this.setupEventListeners();
        this.animate();
    }
    
    resizeCanvas() {
        const rect = this.targetElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.targetElement.addEventListener('mousemove', (e) => {
            const rect = this.targetElement.getBoundingClientRect();
            this.mousePosition.x = e.clientX - rect.left;
            this.mousePosition.y = e.clientY - rect.top;
            this.isMouseInTarget = true;
            
            // Crear una nueva partícula si ha pasado suficiente tiempo
            const currentTime = Date.now();
            if (currentTime - this.lastSpawnTime > trailConfig.spawnRate && 
                this.particles.length < trailConfig.maxParticles) {
                
                const randomIcon = trailConfig.icons[Math.floor(Math.random() * trailConfig.icons.length)];
                this.particles.push(new IconParticle(
                    this.mousePosition.x,
                    this.mousePosition.y,
                    randomIcon
                ));
                this.lastSpawnTime = currentTime;
            }
        });
        
        this.targetElement.addEventListener('mouseleave', () => {
            this.isMouseInTarget = false;
        });
    }
    
    animate() {
        // Limpiar el canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Actualizar y dibujar las partículas
        this.particles = this.particles.filter(particle => {
            const isAlive = particle.update();
            if (isAlive) {
                particle.draw(this.ctx);
            }
            return isAlive;
        });
        
        // Continuar la animación
        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarnos que font awesome esté cargado antes de iniciar el sistema de partículas
    const checkFontAwesome = setInterval(() => {
        const testElement = document.createElement('i');
        testElement.className = 'fas fa-circle';
        testElement.style.visibility = 'hidden';
        document.body.appendChild(testElement);
        
        const isFontAwesomeLoaded = window.getComputedStyle(testElement).fontFamily.includes('Font Awesome');
        document.body.removeChild(testElement);
        
        if (isFontAwesomeLoaded) {
            clearInterval(checkFontAwesome);
            // Inicializar el sistema de partículas
            const particleSystem = new ParticleSystem(
                document.getElementById('cursor-trail'),
                document.getElementById('home')
            );
        }
    }, 100);
});