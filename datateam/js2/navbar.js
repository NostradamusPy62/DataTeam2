// JavaScript para el funcionamiento del navbar
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-nav');
    const closeMenu = document.querySelector('.close-menu');
    const body = document.body;
    
    // Crear overlay para el menú móvil si no existe
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
      menuOverlay = document.createElement('div');
      menuOverlay.className = 'menu-overlay';
      document.body.appendChild(menuOverlay);
    }
    
    // Función para abrir el menú
    function openMenu() {
      navbarToggler.classList.add('active');
      navbarNav.classList.add('active');
      menuOverlay.classList.add('active');
      body.classList.add('has-menu-open');
    }
    
    // Función para cerrar el menú
    function closeMenuFunc() {
      navbarToggler.classList.remove('active');
      navbarNav.classList.remove('active');
      menuOverlay.classList.remove('active');
      body.classList.remove('has-menu-open');
    }
    
    // Event listeners
    if (navbarToggler) {
      navbarToggler.addEventListener('click', function() {
        if (navbarNav.classList.contains('active')) {
          closeMenuFunc();
        } else {
          openMenu();
        }
      });
    }
    
    if (closeMenu) {
      closeMenu.addEventListener('click', closeMenuFunc);
    }
    
    // Cerrar menú al hacer clic en overlay
    menuOverlay.addEventListener('click', closeMenuFunc);
    
    // Cerrar menú cuando se hace clic en un enlace del menú
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        closeMenuFunc();
      });
    });
    
    // Manejar evento de cambio de tamaño de ventana
    window.addEventListener('resize', function() {
      if (window.innerWidth > 991.98) {
        closeMenuFunc();
      }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navbarNav.classList.contains('active')) {
        closeMenuFunc();
      }
    });
  });