// ========================================
// PARTICLE ANIMATION
// ========================================
class ParticleNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? '#6366f1' : '#06b6d4',
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    drawParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Mouse interaction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    particle.x -= dx * force * 0.02;
                    particle.y -= dy * force * 0.02;
                }
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();

            // Draw connections
            this.particles.slice(index + 1).forEach((otherParticle) => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.globalAlpha = (120 - distance) / 120 * 0.2;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });

        this.ctx.globalAlpha = 1;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// CUSTOM CURSOR
// ========================================
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.speed = 0.15;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Instant cursor movement
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
        });

        // Smooth follower animation
        this.animate();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .highlight, .social-link, .nav-link');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.follower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.follower.classList.remove('hover');
            });
        });
    }

    animate() {
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

        this.follower.style.left = `${this.pos.x}px`;
        this.follower.style.top = `${this.pos.y}px`;

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// TYPEWRITER EFFECT
// ========================================
class Typewriter {
    constructor(element, words, wait = 2000) {
        this.element = element;
        this.words = words;
        this.wait = wait;
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.textContent = this.txt;

        let typeSpeed = 80;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
class ScrollAnimations {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.sections = document.querySelectorAll('section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.revealElements = document.querySelectorAll('.reveal, .reveal-children');
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.statNumbers = document.querySelectorAll('.stat-number');
        
        this.init();
    }

    init() {
        this.setupNavbar();
        this.setupReveal();
        this.setupSkillBars();
        this.setupCounters();
        this.setupActiveNav();
    }

    setupNavbar() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    setupReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        this.revealElements.forEach(el => observer.observe(el));
    }

    setupSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    bar.style.width = `${width}%`;
                }
            });
        }, { threshold: 0.5 });

        this.skillBars.forEach(bar => observer.observe(bar));
    }

    setupCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.statNumbers.forEach(num => observer.observe(num));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    setupActiveNav() {
        window.addEventListener('scroll', () => {
            let current = '';

            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;

                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ========================================
// MOBILE MENU
// ========================================
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.mobileLinks = document.querySelectorAll('.mobile-link');
        
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => this.toggle());
        
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    toggle() {
        this.hamburger.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    close() {
        this.hamburger.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const position = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: position,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ========================================
// CONTACT FORM
// ========================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const button = this.form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;

        // Simulate API call
        setTimeout(() => {
            button.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
                this.form.reset();
            }, 3000);
        }, 2000);
    }
}

// ========================================
// MAGNETIC BUTTONS
// ========================================
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-primary, .btn-outline');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }
}

// ========================================
// TILT EFFECT
// ========================================
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('.project-card, .skill-category');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

// ========================================
// ADD REVEAL CLASSES
// ========================================
function addRevealClasses() {
    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('reveal');
    });

    // About section
    document.querySelector('.about-image')?.classList.add('reveal');
    document.querySelector('.about-text')?.classList.add('reveal');

    // Skills grid
    document.querySelector('.skills-grid')?.classList.add('reveal-children');

    // Timeline items
    document.querySelectorAll('.timeline-item').forEach(el => {
        el.classList.add('reveal');
    });

    // Projects grid
    document.querySelector('.projects-grid')?.classList.add('reveal-children');

    // Contact sections
    document.querySelector('.contact-info')?.classList.add('reveal');
    document.querySelector('.contact-form-wrapper')?.classList.add('reveal');
}

// ========================================
// INITIALIZE EVERYTHING
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal classes
    addRevealClasses();

    // Initialize particles
    const canvas = document.getElementById('particles');
    if (canvas) {
        new ParticleNetwork(canvas);
    }

    // Initialize custom cursor (only on non-touch devices)
    if (window.matchMedia('(pointer: fine)').matches) {
        new CustomCursor();
    }

    // Initialize typewriter
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        new Typewriter(typewriterElement, [
            'scalable backend systems',
            'cloud infrastructure',
            'DevOps pipelines',
            'React applications',
            'APIs & microservices',
            'solutions that matter'
        ], 2000);
    }

    // Initialize other components
    new ScrollAnimations();
    new MobileMenu();
    new SmoothScroll();
    new ContactForm();
    new MagneticButtons();
    new TiltEffect();

    // Console easter egg
    console.log(
        '%c👋 Hey there, fellow developer!',
        'color: #6366f1; font-size: 20px; font-weight: bold;'
    );
    console.log(
        '%cInterested in working together? Let\'s connect!',
        'color: #06b6d4; font-size: 14px;'
    );
});

// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
