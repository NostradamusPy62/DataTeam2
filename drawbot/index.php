<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DrawBot - Robot Dibujante</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/styles.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#"><i class="fas fa-robot"></i> DrawBot</a>
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
                        <a class="nav-link" href="#contact">Contacto</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../index.php">RaspBot</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
     <h1>Hola bro </h1> 
    <section id="home" class="hero">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1>DrawBot</h1>
                    <p class="lead">Un robot dibujante innovador que combina arte y tecnología</p>
                    <a href="#about" class="btn btn-primary">Descubre más</a>
                </div>
                <div class="col-lg-6">
                    <img src="img/drawbot-hero.jpg" alt="DrawBot" class="img-fluid rounded shadow">
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2>Sobre el Proyecto</h2>
            <div class="row">
                <div class="col-lg-6">
                    <p>DrawBot es un proyecto educativo que combina robótica, programación y arte. Este robot es capaz de reproducir dibujos y crear arte de manera autónoma, siendo una herramienta perfecta para aprender sobre mecánica, electrónica y programación.</p>
                </div>
                <div class="col-lg-6">
                    <div class="features">
                        <div class="feature-item">
                            <i class="fas fa-microchip"></i>
                            <h4>Control Preciso</h4>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-code"></i>
                            <h4>Código Abierto</h4>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-paint-brush"></i>
                            <h4>Artístico</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Steps Section -->
    <section id="steps" class="steps">
        <div class="container">
            <h2>Pasos para Armarlo</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <h4>1. Componentes</h4>
                    <p>Lista de materiales necesarios y herramientas requeridas.</p>
                </div>
                <div class="timeline-item">
                    <h4>2. Ensamblaje</h4>
                    <p>Guía paso a paso del montaje mecánico.</p>
                </div>
                <div class="timeline-item">
                    <h4>3. Electrónica</h4>
                    <p>Conexiones y configuración de componentes electrónicos.</p>
                </div>
                <div class="timeline-item">
                    <h4>4. Programación</h4>
                    <p>Instalación del software y configuración inicial.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Documentation Section -->
    <section id="docs" class="docs">
        <div class="container">
            <h2>Documentación</h2>
            <div class="row">
                <div class="col-md-4">
                    <div class="doc-card">
                        <i class="fas fa-file-code"></i>
                        <h4>Código Fuente</h4>
                        <a href="#" class="btn btn-outline-primary">Descargar</a>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="doc-card">
                        <i class="fas fa-book"></i>
                        <h4>Manual</h4>
                        <a href="#" class="btn btn-outline-primary">Ver PDF</a>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="doc-card">
                        <i class="fas fa-tools"></i>
                        <h4>Guía de Montaje</h4>
                        <a href="#" class="btn btn-outline-primary">Ver Guía</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2>Contacto</h2>
            <div class="row">
                <div class="col-lg-6">
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
                        <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
                    </form>
                </div>
                <div class="col-lg-6">
                    <div class="contact-info">
                        <h4>Información de Contacto</h4>
                        <p><i class="fas fa-envelope"></i> info@drawbot.com</p>
                        <p><i class="fab fa-github"></i> github.com/drawbot</p>
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
                    <h5>DrawBot</h5>
                    <p>Un proyecto de robótica educativa</p>
                </div>
                <div class="col-md-4">
                    <h5>Enlaces</h5>
                    <ul class="list-unstyled">
                        <li><a href="../index.php">RaspBot</a></li>
                        <li><a href="#docs">Documentación</a></li>
                        <li><a href="#about">Sobre Nosotros</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5>Síguenos</h5>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-github"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="js/main.js"></script>
</body>
</html>
