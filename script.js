// ============================================
// PULSO GYM - JAVASCRIPT
// Funcionalidad sin dependencias
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MENÚ HAMBURGUESA MOBILE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Cerrar menú al hacer click en un link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
    
    // ============================================
    // SCROLL SUAVE PARA LINKS INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // HEADER - CAMBIO AL SCROLL
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // INTERSECTION OBSERVER - ANIMACIONES
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observar tarjetas de beneficios
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Observar secciones principales
    const sections = document.querySelectorAll('.section-header, .experience-content, .cta-content');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
    
    // ============================================
    // TRACKING DE WHATSAPP CLICKS
    // ============================================
    const whatsappButtons = document.querySelectorAll('a[href^="https://wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Click en WhatsApp:', this.textContent.trim());
            
            // Si tenés Google Analytics:
            // gtag('event', 'click', {
            //     'event_category': 'WhatsApp',
            //     'event_label': this.textContent.trim()
            // });
        });
    });
    
    // ============================================
    // ANIMACIÓN DEL HERO AL CARGAR
    // ============================================
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroElements = heroContent.children;
        
        Array.from(heroElements).forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300 + (index * 150));
        });
    }
    
    // ============================================
    // BOTÓN WHATSAPP FLOTANTE - ANIMACIÓN ENTRADA
    // ============================================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transform = 'scale(0) translateY(20px)';
        
        setTimeout(() => {
            whatsappFloat.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'scale(1) translateY(0)';
        }, 2000);
    }
    
    // ============================================
    // PARALLAX SUAVE EN HERO
    // ============================================
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // ============================================
    // CONTADOR ANIMADO PARA STATS (opcional)
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }
    
    // Activar contadores cuando entran en viewport
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                
                // Estos valores deben coincidir con el HTML
                const values = [500, 24, 15];
                stats.forEach((stat, index) => {
                    if (values[index] === 24) {
                        stat.textContent = '24/7';
                    } else {
                        animateCounter(stat, values[index]);
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (stats.length > 0) {
        statsObserver.observe(document.querySelector('.hero-stats'));
    }
    
});

// ============================================
// CSS ADICIONAL PARA MENÚ MOBILE
// ============================================
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 767px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(12px);
            flex-direction: column;
            padding: 2rem;
            gap: 2rem;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            border-top: 2px solid var(--color-primary);
            max-height: calc(100vh - 80px);
            overflow-y: auto;
        }
        
        .nav-links.active {
            transform: translateX(0);
            opacity: 1;
            pointer-events: all;
        }
        
        .nav-links a {
            font-size: 1.25rem;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .btn-nav {
            width: 100%;
            text-align: center;
            margin-top: 1rem;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
            background-color: var(--color-primary);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(8px, -8px);
            background-color: var(--color-primary);
        }
        
        body.menu-open {
            overflow: hidden;
        }
    }
`;
document.head.appendChild(mobileMenuStyles);

// ============================================
// EFECTO DE PULSO EN BOTÓN PRINCIPAL
// ============================================
const pulseStyles = document.createElement('style');
pulseStyles.textContent = `
    @keyframes pulse-glow {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(212, 255, 0, 0.7);
        }
        50% {
            box-shadow: 0 0 0 15px rgba(212, 255, 0, 0);
        }
    }
    
    .btn-primary:not(:hover) {
        animation: pulse-glow 2s infinite;
    }
`;
document.head.appendChild(pulseStyles);