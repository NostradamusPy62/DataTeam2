<?php
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DataTeam - Innovación en Robótica</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="datateam/css/style.css" rel="stylesheet">

    <style>
        #container3d {
            width: 100%;
            height: 500px;
            position: relative;
            background: #f8f9fa;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
        }

        .loading3d {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.2em;
            color: #666;
            background: rgba(255, 255, 255, 0.9);
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 2;
        }

        #container3d canvas {
            display: block;
            width: 100% !important;
            height: 100% !important;
        }
    </style>

    <!-- Three.js y módulos -->
    <script async src="https://unpkg.com/es-module-shims@1.8.0/dist/es-module-shims.js"></script>
    <script type="importmap">
    {
        "imports": {
            "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
            "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
        }
    }
    </script>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#">
            <i class="fab fa-raspberry-pi" title="Raspberry Pi"></i>
            Raspbot</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#home">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about">Sobre el Proyecto</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#steps">Pasos de Armado</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#docs">Documentación</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../index.php">Nosotros</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="mt-5">
        <!-- Home Section -->
        <section id="home" class="py-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <h1 class="display-4 fw-bold">Raspbot</h1>
                        <p class="lead">Un proyecto de robótica educativa basado en Raspberry Pi</p>
                        <a href="#assembly" class="btn btn-primary btn-lg">Comenzar Ahora</a>
                    </div>
                    <div class="col-lg-6">
                        <img src="images/hero-image.jpg" alt="Raspbot Hero" class="img-fluid rounded">
                    </div>
                </div>
            </div>
        </section>

            <!-- About Section -->
        <section id="about" class="py-5 bg-light">
            <div class="container">
                <h2 class="text-center mb-4">Sobre el Proyecto</h2>
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <p class="lead">Raspbot es un proyecto educativo que combina la programación, la electrónica y la robótica utilizando Raspberry Pi como plataforma central. Diseñado para estudiantes y entusiastas, Raspbot ofrece una experiencia práctica y divertida en el mundo de la robótica.</p>
                        <div class="row mt-4">
                            <div class="col-md-4">
                                <i class="fas fa-microchip fa-3x text-primary mb-3"></i>
                                <h3>Hardware Moderno</h3>
                                <p>Basado en Raspberry Pi y componentes de alta calidad.</p>
                            </div>
                            <div class="col-md-4">
                                <i class="fas fa-code fa-3x text-primary mb-3"></i>
                                <h3>Programación Fácil</h3>
                                <p>Código abierto y documentación detallada.</p>
                            </div>
                            <div class="col-md-4">
                                <i class="fas fa-robot fa-3x text-primary mb-3"></i>
                                <h3>Proyectos Prácticos</h3>
                                <p>Desde principiante hasta avanzado.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

            <!-- Assembly Section -->
        <section id="assembly" class="py-5">
            <div class="container">
                <h2 class="text-center mb-4">Pasos para Armarlo</h2>
                <div class="row">
                    <div class="col-lg-10 mx-auto">
                        <div class="row">
                            <div class="col-md-4 mb-4">
                                <div class="card h-100">
                                    <img src="images/step1.jpg" class="card-img-top" alt="Paso 1">
                                    <div class="card-body">
                                        <h5 class="card-title">Paso 1: Preparación</h5>
                                        <p class="card-text">Lista de componentes y herramientas necesarias.</p>
                                        <a href="#" class="btn btn-primary">Ver Detalles</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <div class="card h-100">
                                    <img src="images/step2.jpg" class="card-img-top" alt="Paso 2">
                                    <div class="card-body">
                                        <h5 class="card-title">Paso 2: Montaje</h5>
                                        <p class="card-text">Instrucciones paso a paso para el ensamblaje.</p>
                                        <a href="#" class="btn btn-primary">Ver Detalles</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <div class="card h-100">
                                    <img src="images/step3.jpg" class="card-img-top" alt="Paso 3">
                                    <div class="card-body">
                                        <h5 class="card-title">Paso 3: Programación</h5>
                                        <p class="card-text">Configuración del sistema y programación básica.</p>
                                        <a href="#" class="btn btn-primary">Ver Detalles</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            <div class="row">
                <!-- Features Section -->
        <section id="features" class="py-5">
            <div class="container">
                <h2 class="text-center mb-4">Características</h2>
                <!-- Modelo 3D -->
                <div class="row justify-content-center mb-5">
                    <div class="col-md-10">
                        <div class="feature-card">
                            <h3 class="text-center mb-3">Modelo 3D del Robot</h3>
                            <div id="container3d">
                                <div class="loading3d">Cargando modelo 3D...</div>
                            </div>
                            <p class="text-center mt-3">Explora el diseño 3D de nuestro robot. Puedes rotarlo, hacer zoom y ver todos sus detalles.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact py-5">
        <div class="container">
            <h2 class="text-center mb-5">Contacto</h2>
            <div class="row">
                <div class="col-lg-6 mx-auto">
                    <form id="contactForm">
                        <div class="mb-3">
                            <input type="text" class="form-control" placeholder="Nombre" required>
                        </div>
                        <div class="mb-3">
                            <input type="email" class="form-control" placeholder="Email" required>
                        </div>
                        <div class="mb-3">
                            <textarea class="form-control" rows="5" placeholder="Mensaje" required></textarea>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Documentation Section -->
    <section id="documentation" class="py-5 bg-light">
            <div class="container">
                <h2 class="text-center mb-4">Documentación</h2>
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div class="accordion" id="docsAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#hardware">
                                        Hardware y Esquemas Eléctricos
                                    </button>
                                </h2>
                                <div id="hardware" class="accordion-collapse collapse show">
                                    <div class="accordion-body">
                                        <h4>Componentes Principales</h4>
                                        <ul class="list-group mb-3">
                                            <li class="list-group-item">
                                                <h5>Raspberry Pi 4</h5>
                                                <p>Procesador quad-core de 1.5GHz, 4GB RAM</p>
                                            </li>
                                            <li class="list-group-item">
                                                <h5>Kit de Sensores</h5>
                                                <ul>
                                                    <li>Sensor de ultrasonido HC-SR04</li>
                                                    <li>Sensor de temperatura DHT11</li>
                                                    <li>Sensor de luz LDR</li>
                                                </ul>
                                            </li>
                                            <li class="list-group-item">
                                                <h5>Motores y Control</h5>
                                                <ul>
                                                    <li>Motores DC con encoder</li>
                                                    <li>Controlador L298N</li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <h4>Esquemas Eléctricos</h4>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <img src="images/wiring-diagram.png" class="img-fluid rounded" alt="Diagrama de Conexiones">
                                            </div>
                                            <div class="col-md-6">
                                                <p>Diagrama detallado de las conexiones entre los componentes del Raspbot.</p>
                                                <a href="docs/hardware.pdf" class="btn btn-outline-primary">Descargar PDF</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#software">
                                        Software y Código Fuente
                                    </button>
                                </h2>
                                <div id="software" class="accordion-collapse collapse">
                                    <div class="accordion-body">
                                        <h4>Estructura del Proyecto</h4>
                                        <pre class="mb-3">
raspbot/
├── src/
│   ├── main.py          # Archivo principal
│   ├── sensors/         # Módulos de sensores
│   ├── motors/          # Control de motores
│   └── utils/           # Utilidades
├── docs/               # Documentación
└── tests/              # Pruebas unitarias
                                        </pre>
                                        <h4>Requisitos de Software</h4>
                                        <ul class="list-group mb-3">
                                            <li class="list-group-item">
                                                <h5>Python 3.9+</h5>
                                                <p>Interprete de Python</p>
                                            </li>
                                            <li class="list-group-item">
                                                <h5>Bibliotecas</h5>
                                                <ul>
                                                    <li>RPi.GPIO</li>
                                                    <li>Adafruit_DHT</li>
                                                    <li>opencv-python</li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <h4>Ejemplo de Código</h4>
                                        <pre class="mb-3">
from raspbot.sensors import UltrasonicSensor
from raspbot.motors import MotorController

class Raspbot:
    def __init__(self):
        self.ultrasonic = UltrasonicSensor()
        self.motor = MotorController()
    
    def avoid_obstacles(self):
        distance = self.ultrasonic.get_distance()
        if distance < 30:
            self.motor.stop()
            self.motor.turn_left()
        else:
            self.motor.forward()
                                        </pre>
                                        <a href="https://github.com/raspbot/project" class="btn btn-outline-primary">Ver Repositorio</a>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#projects">
                                        Proyectos y Ejemplos
                                    </button>
                                </h2>
                                <div id="projects" class="accordion-collapse collapse">
                                    <div class="accordion-body">
                                        <!-- Contenido de proyectos y ejemplos -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5 class='titulo-footer'>
                        <a href="../index.php">
                        DataTeam
                        </a></h5>
                    <p>Innovación en robótica educativa</p>
                </div>
                <div class="col-md-4">
                    <h5>Proyectos</h5>
                    <ul class="list-unstyled">
                        <li><a href="../raspbot/raspbot.php">RaspBot</a></li>
                        <li><a href="../drawbot/drawbot.php">DrawBot</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5>Síguenos</h5>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-github"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12 text-center">
                    <p class="mb-0">&copy; <?php echo date('Y'); ?> DataTeam. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
   <!-- Modelo 3D -->
   <script type="module">
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

        // Configuración básica
        const container = document.getElementById('container3d');
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        // Configurar cámara
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Configurar renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;

        // Agregar canvas al contenedor
        container.appendChild(renderer.domElement);

        // Iluminación
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight2.position.set(-5, -5, -5);
        scene.add(directionalLight2);

        // Controles
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // Cargar modelo
        const loader = new GLTFLoader();
        const modelPath = '3D/scene.gltf'; // Cambiado para usar la nueva ruta desde la raíz
        console.log('Intentando cargar el modelo desde:', window.location.href, modelPath);

        loader.load(
            modelPath,
            function (gltf) {
                console.log('Modelo cargado exitosamente');
                const model = gltf.scene;

                // Ajustar materiales
                model.traverse((node) => {
                    if (node.isMesh && node.material) {
                        node.material.needsUpdate = true;
                        node.material.side = THREE.DoubleSide;
                    }
                });

                scene.add(model);

                // Centrar y ajustar tamaño
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
                camera.position.z = cameraZ * 1.5;
                
                controls.target.copy(center);
                controls.update();

                // Ocultar mensaje de carga
                const loadingElement = container.querySelector('.loading3d');
                if (loadingElement) {
                    loadingElement.style.display = 'none';
                }
            },
            function (xhr) {
                const percent = (xhr.loaded / xhr.total * 100).toFixed(2);
                console.log(percent + '% cargado');
            },
            function (error) {
                console.error('Error al cargar el modelo:', error);
                const loadingElement = container.querySelector('.loading3d');
                if (loadingElement) {
                    loadingElement.textContent = 'Error al cargar el modelo 3D';
                }
            }
        );

        // Animación
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        // Manejo de redimensionamiento
        function onWindowResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        window.addEventListener('resize', onWindowResize);
        animate();
        </script>
</body>
</html>
