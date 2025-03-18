<?php
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raspbot - Proyecto de Robótica</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/style.css" rel="stylesheet">
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

    </main>

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
                <!-- En esta seccion estaria el boton saltarin del comenta qui que nos debria de mandar a un google form -->
<!--                 <div class="col-md-4">
                    <h5>Deja tu opinion</h5>
                        <span>Nos gustaria saber tu opinion y saber que te gustaron de nuestros proyectos</span>
                        <button id='coment' href="https://youtu.be/2p3-zkUFJJU?si=2t2o2rm_ZOWMEXZ-"">Comenta aqui</button>
                    </div>
                </div> -->

                <!-- Agregar nuestras redes y mi linkedin 😊 -->
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
    <!-- QR Scanner JS -->
    <script src="https://unpkg.com/html5-qrcode"></script>
    <!-- Custom JS -->
    <script src="js/main.js"></script>
</body>
</html>
