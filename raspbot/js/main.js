// QR Scanner functionality
let html5QrcodeScanner = null;

function onScanSuccess(decodedText, decodedResult) {
    // Handle the scanned QR code
    console.log(`Code matched = ${decodedText}`, decodedResult);
    // You can add additional logic here to handle the scanned QR code
}

function onScanFailure(error) {
    // Handle scan failure, usually better to ignore and keep scanning.
    console.warn(`Code scan error = ${error}`);
}

function startQRScanner() {
    html5QrcodeScanner = new Html5Qrcode("scanner");
    
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1
    };
    
    html5QrcodeScanner.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanFailure
    ).catch(err => {
        console.error("QR Scanner failed to start:", err);
        alert("No se pudo iniciar el escáner de QR. Por favor, asegúrate de que tu cámara esté disponible.");
    });
}

// Initialize the QR scanner when the page loads
document.addEventListener("DOMContentLoaded", function() {
    startQRScanner();
});

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Por favor, complete todos los campos del formulario.');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('¡Mensaje enviado exitosamente! Nos pondremos en contacto con usted pronto.');
        contactForm.reset();
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
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
