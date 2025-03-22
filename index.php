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
                <button type="button" class="close-navbar d-lg-none" aria-label="Close" id="closeNavbar">
                    <i class="fas fa-times"></i>
                </button>
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
    
    <!-- Fondo oscuro cuando se abre el navbar en móviles -->
    <div class="navbar-overlay" id="navbarOverlay"></div>

    <!-- Hero Section with animated elements -->
    <section id="home" class="hero">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 slide-in-left">
                    <h1 class="mb-4">Innovación en Robótica</h1>
                    <p class="lead mb-4">Desarrollamos soluciones robóticas educativas para inspirar la próxima generación de innovadores.</p>
                    <a href="#projects" class="btn btn-primary btn-lg">Ver Proyectos</a>
                </div>
        </div>
    </section>

    <!-- About Section with card and carousel -->
    <section id="about" class="about">
        <div class="container">
            <h2 class="text-center mb-5 fade-in">Sobre Nosotros</h2>
            <div class="row mb-5">
                <div class="col-lg-6 fade-in delay-100">
                    <div class="about-card">
                        <h3 class="mb-4">Quiénes Somos</h3>
                        <p>
                            En <strong>DataTeam</strong>, somos un grupo de jóvenes paraguayos apasionados por la tecnología y la innovación, nacidos en <strong>Ciudad del Este</strong> con una visión clara: <strong>convertir ideas en soluciones reales</strong>.
                        </p>
                        <p>
                            Nos impulsa el deseo de crear proyectos que no solo sean funcionales, sino que también <strong>generen un impacto positivo</strong> en la educación y en la sociedad.
                        </p>
                        <p>
                            Creemos que el conocimiento y la creatividad son las herramientas más poderosas para transformar el mundo. Por eso, combinamos <strong>ingeniería, programación y robótica</strong> para desarrollar soluciones tecnológicas que faciliten el aprendizaje, la innovación y el progreso.
                        </p>
                    </div>
                </div>
                <br>
                <div class="col-lg-6 fade-in delay-200">
                    <div id="aboutCarousel" class="carousel slide about-carousel" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="img/about1.jpg" class="d-block w-100" alt="Nuestro equipo trabajando">
                            </div>
                            <div class="carousel-item">
                                <img src="img/about2.jpg" class="d-block w-100" alt="Proyecto en desarrollo">
                            </div>
                            <div class="carousel-item">
                                <img src="img/about3.jpg" class="d-block w-100" alt="Evento tecnológico">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#aboutCarousel" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Anterior</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#aboutCarousel" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Siguiente</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="section-header text-center my-5 fade-in">
                <h2 class="section-title">Nuestro Equipo</h2>
                <div class="section-divider"></div>
                <p class="section-subtitle">Conoce a los miembros que hacen posible cada proyecto</p>
            </div>
            <div class="team-row">
                <div class="team-member zoom-in delay-200">
                    <div class="team-card">
                        <img src="img/team1.jpeg" alt="Lucas Portillo">
                        <h4>Lucas Portillo</h4>
                        <div class="team-social">
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div class="team-member zoom-in delay-300">
                    <div class="team-card">
                        <img src="img/team2.jpeg" alt="Ayelen Vera">
                        <h4>Ayelen Vera</h4>
                        <div class="team-social">
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div class="team-member zoom-in delay-400">
                    <div class="team-card">
                        <img src="img/team3.jpeg" alt="Alejandro Chamorro">
                        <h4>Alejandro Chamorro</h4>
                        <div class="team-social">
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div class="team-member zoom-in delay-200">
                    <div class="team-card">
                        <img src="img/team4.jpeg" alt="Mauricio Galeano">
                        <h4>Mauricio Galeano</h4>
                        <div class="team-social">
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div class="team-member zoom-in delay-300">
                    <div class="team-card">
                        <img src="img/team5.jpeg" alt="Julio Gomez">
                        <h4>Julio Gomez</h4>
                        <div class="team-social">
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div class="team-member zoom-in delay-400">
                    <div class="team-card">
                        <img src="img/team6.jpg" alt="Lucas Britez">
                        <h4>Lucas Britez</h4>
                        <div class="team-social">
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section with improved cards -->
    <section id="projects" class="projects">
        <div class="container">
            <h2 class="text-center mb-5 fade-in">Proyectos Destacados</h2>
            <div class="row projects-row">
                <div class="col-lg-6 mb-4 fade-in delay-200">
                    <div class="project-card">
                        <div class="card-img-wrapper">
                            <img src="img/raspbot.jpg" class="card-img-top" alt="RaspBot">
                            <div class="img-overlay"></div>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">RaspBot</h3>
                            <p class="card-text">Robot educativo basado en Raspberry Pi con capacidades de exploración y control remoto.</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="raspbot/raspbot.php" class="btn btn-primary">Ver Proyecto</a>
                                <div class="project-tech">
                                    <i class="fab fa-raspberry-pi" title="Raspberry Pi"></i>
                                    <i class="fab fa-python" title="Python"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 mb-4 fade-in delay-300">
                    <div class="project-card">
                        <div class="card-img-wrapper">
                            <img src="img/drawbot.jpg" class="card-img-top" alt="DrawBot">
                            <div class="img-overlay"></div>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">DrawBot</h3>
                            <p class="card-text">Robot artístico capaz de reproducir dibujos y crear arte de manera autónoma.</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="drawbot/drawbot.php" class="btn btn-primary">Ver Proyecto</a>
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

    <!-- Footer ultra compacto para móviles -->
    <footer class="footer">
        <div class="container">
            <div class="footer-wrapper">
                <div class="footer-column">
                    <h5 class="titulo-footer">DataTeam</h5>
                    <p>Innovación en robótica educativa</p>
                </div>
                <div class="footer-column">
                    <h5 class="titulo-footer">Proyectos</h5>
                    <ul class="list-unstyled">
                        <li><a href="raspbot/raspbot.php"><i class="fas fa-chevron-right"></i> RaspBot</a></li>
                        <li><a href="drawbot/drawbot.php"><i class="fas fa-chevron-right"></i> DrawBot</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h5 class="titulo-footer">Síguenos</h5>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-github"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div class="footer-column">
                    <h5 class="titulo-footer">Contacto</h5>
                    <p><i class="fas fa-envelope"></i> info@datateam.com</p>
                    <p><i class="fas fa-map-marker-alt"></i> CDE, Paraguay</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="mb-0">&copy; <?php echo date('Y'); ?> DataTeam</p>
            </div>
        </div>
    </footer>

    <!-- Back to top button -->
    <a href="#" class="back-to-top" id="backToTop"><i class="fas fa-arrow-up"></i></a>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Custom JS -->
    <script>
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const backToTop = document.getElementById('backToTop');
            
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Back to top button visibility
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('show');
                backToTop.classList.remove('active');
            }
        });

        // Animation on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                    }
                });
            }, { threshold: 0.1 });
            
            animateElements.forEach(element => {
                observer.observe(element);
            });
            
            // Navbar sidebar en móviles
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const navbarOverlay = document.getElementById('navbarOverlay');
            const closeNavbar = document.getElementById('closeNavbar');
            
            navbarToggler.addEventListener('click', function() {
                navbarOverlay.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
            
            function closeNav() {
                navbarCollapse.classList.remove('show');
                navbarOverlay.classList.remove('show');
                document.body.style.overflow = '';
            }
            
            closeNavbar.addEventListener('click', closeNav);
            navbarOverlay.addEventListener('click', closeNav);
            
            // Cerrar navbar al hacer click en un enlace
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.addEventListener('click', closeNav);
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    </script>
</body>
</html>