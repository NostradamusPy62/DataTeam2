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
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#"><i class="fas fa-microchip"></i> DataTeam</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#home">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about">Sobre Nosotros</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#projects">Proyectos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">Contacto</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1>Innovación en Robótica</h1>
                    <p class="lead">Desarrollamos soluciones robóticas educativas para inspirar la próxima generación de innovadores.</p>
                    <a href="#projects" class="btn btn-primary btn-lg">Ver Proyectos</a>
                </div>
                <div class="col-lg-6">
                    <img src="img/hero-image.jpg" alt="DataTeam Hero" class="img-fluid rounded shadow">
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2 class="text-center">Sobre Nosotros</h2>
            <div class="row mt-5">
                <div class="col-lg-8 mx-auto text-center mb-5">
                    <p class="lead">DataTeam es un equipo apasionado por la robótica y la educación. Nos dedicamos a crear proyectos innovadores que combinan tecnología y aprendizaje práctico.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="img/team1.jpg" alt="Team Member 1">
                        <h4>Ana García</h4>
                        <p>Directora de Desarrollo</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="img/team2.jpg" alt="Team Member 2">
                        <h4>Carlos Rodríguez</h4>
                        <p>Ingeniero de Robótica</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="img/team3.jpg" alt="Team Member 3">
                        <h4>María Torres</h4>
                        <p>Diseñadora de Proyectos</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
        <div class="container">
            <h2 class="text-center mb-5">Proyectos Destacados</h2>
            <div class="row">
                <div class="col-md-6">
                    <div class="card project-card">
                        <img src="img/raspbot.jpg" class="card-img-top" alt="RaspBot">
                        <div class="card-body">
                            <h3 class="card-title">RaspBot</h3>
                            <p class="card-text">Robot educativo basado en Raspberry Pi con capacidades de exploración y control remoto.</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="/raspbot_web/raspbot/index.php" class="btn btn-primary">Ver Proyecto</a>
                                <div class="project-tech">
                                    <i class="fab fa-raspberry-pi" title="Raspberry Pi"></i>
                                    <i class="fab fa-python" title="Python"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card project-card">
                        <img src="img/drawbot.jpg" class="card-img-top" alt="DrawBot">
                        <div class="card-body">
                            <h3 class="card-title">DrawBot</h3>
                            <p class="card-text">Robot artístico capaz de reproducir dibujos y crear arte de manera autónoma.</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="/raspbot_web/drawbot/index.php" class="btn btn-primary">Ver Proyecto</a>
                                <div class="project-tech">
                                    <i class="fab fa-arduino" title="Arduino"></i>
                                    <i class="fas fa-code" title="C++"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5>DataTeam</h5>
                    <p>Innovación en robótica educativa</p>
                </div>
                <div class="col-md-4">
                    <h5>Proyectos</h5>
                    <ul class="list-unstyled">
                        <li><a href="/raspbot_web/raspbot/index.php">RaspBot</a></li>
                        <li><a href="/raspbot_web/drawbot/index.php">DrawBot</a></li>
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
</body>
</html>
