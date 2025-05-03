// Main JavaScript for Human Academy Clone

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });
    
    // Make cursor larger on hover over links and buttons
    const hoverTargets = document.querySelectorAll('a, button, .faq-question, .menu-toggle, .menu-close, .content-item, .feature-card, .process-step');
    
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            gsap.to(cursorFollower, {
                width: 60,
                height: 60,
                opacity: 0.5,
                duration: 0.3
            });
            cursor.classList.add('active');
        });
        
        target.addEventListener('mouseleave', () => {
            gsap.to(cursorFollower, {
                width: 40,
                height: 40,
                opacity: 1,
                duration: 0.3
            });
            cursor.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
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
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all faq items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // If item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Scroll animations
    // Text reveal animations
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.fromTo(text, 
            {
                opacity: 0,
                y: 60
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: text,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Fade in animations
    const fadeElements = document.querySelectorAll('.reveal-fade, .reveal-fade-delay');
    
    fadeElements.forEach((element, index) => {
        const delay = element.classList.contains('reveal-fade-delay') ? 0.2 * (index % 3) : 0;
        
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: delay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Card reveal animations
    const cardElements = document.querySelectorAll('.reveal-card');
    
    cardElements.forEach((element, index) => {
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 50,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: 0.1 * index,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Parallax Effects
    gsap.utils.toArray('.section-bg-pattern, .hero-bg-pattern').forEach(layer => {
        gsap.to(layer, {
            y: window.innerHeight * 0.15,
            ease: "none",
            scrollTrigger: {
                trigger: layer.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });
    });
    
    // Enhanced ticker animation
    const ticker = document.querySelector('.audience-ticker');
    if (ticker) {
        const tickerContent = ticker.querySelector('.ticker-content');
        const tickerWidth = tickerContent.scrollWidth;
        
        gsap.to(tickerContent, {
            x: -tickerWidth / 2,
            ease: "none",
            duration: 20,
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % (tickerWidth / 2))
            }
        });
    }
    
    // Enhanced staggered animations for grid items
    const grids = document.querySelectorAll('.cards-grid, .process-steps, .content-grid');
    
    grids.forEach(grid => {
        const items = Array.from(grid.children);
        
        gsap.fromTo(items, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: grid,
                    start: "top 80%"
                }
            }
        );
    });
    
    // Smooth section transitions
    gsap.utils.toArray('section').forEach(section => {
        gsap.fromTo(section,
            {
                opacity: 0.8
            },
            {
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    end: "center center",
                    scrub: true
                }
            }
        );
    });
    
    // Benefit items reveal
    const benefitItems = document.querySelectorAll('.benefit-item');
    gsap.fromTo(benefitItems, 
        {
            opacity: 0,
            x: -30
        },
        {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.benefits-list',
                start: "top 80%"
            }
        }
    );
    
    // Hero elements animation on load
    gsap.fromTo('.main-title', 
        { 
            opacity: 0, 
            y: 30 
        }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power3.out",
            delay: 0.2
        }
    );
    
    gsap.fromTo('.hero-text', 
        { 
            opacity: 0, 
            y: 40 
        }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out",
            delay: 0.6
        }
    );
    
    gsap.fromTo('.hero-buttons', 
        { 
            opacity: 0, 
            y: 30 
        }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            delay: 0.9
        }
    );
    
    gsap.fromTo('.audience-ticker', 
        { 
            opacity: 0
        }, 
        { 
            opacity: 1, 
            duration: 1, 
            delay: 1.2
        }
    );
    
    gsap.fromTo('.hero-details', 
        { 
            opacity: 0, 
            y: 20 
        }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            delay: 1.4
        }
    );
    
    gsap.fromTo('.hero-description', 
        { 
            opacity: 0, 
            y: 20 
        }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            delay: 1.6
        }
    );
    
    // Image parallax for instructor
    const instructorImage = document.querySelector('.instructor-image');
    
    if (instructorImage) {
        gsap.to(instructorImage, {
            y: "-10%",
            ease: "none",
            scrollTrigger: {
                trigger: instructorImage.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
    
    // Add some 3D rotation to cards on mouse move (desktop only)
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.feature-card, .process-step');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xPercent = x / rect.width - 0.5;
                const yPercent = y / rect.height - 0.5;
                
                gsap.to(card, {
                    rotationY: xPercent * 10,
                    rotationX: yPercent * -10,
                    transformPerspective: 1000,
                    duration: 0.3,
                    ease: "power1.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });
    }
    
    // Implementando efeitos avançados de paralaxe e animações
    
    // Efeito parallax avançado para a hero section
    if (document.querySelector('.hero-section')) {
        gsap.to(".hero-section", {
            backgroundPosition: `50% ${window.innerHeight / 2}px`,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }
    
    // Efeito de ticker para a faixa de público-alvo
    if (document.querySelector('.ticker-content')) {
        gsap.to(".ticker-content p", {
            xPercent: -50,
            ease: "none",
            duration: 30,
            repeat: -1
        });
    }
    
    // Animação para a barra de progresso de lotes
    if (document.querySelector('.lot-progress-bar')) {
        gsap.from(".lot-progress-bar", {
            width: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".hero-buttons",
                start: "top 80%"
            }
        });
    }
    
    // Animação para os elementos grid de tópicos visuais
    gsap.utils.toArray('.grid-item').forEach((item, i) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: '.grid-container',
                start: "top 80%"
            }
        });
    });
    
    // Melhorando o cursor personalizado com magnetismo para botões e links
    const magneticElements = document.querySelectorAll('a, button, .faq-question, .card-link, .topic-tag');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    if (cursor && cursorFollower) {
        // Atualização suavizada do cursor
        gsap.ticker.add(() => {
            const diffX = mouseX - followerX;
            const diffY = mouseY - followerY;
            
            followerX += diffX * 0.2;
            followerY += diffY * 0.2;
            
            gsap.set(cursorFollower, {
                x: followerX,
                y: followerY
            });
        });
        
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: "power2.out"
            });
        });
        
        // Efeito magnético para botões e links
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const bounds = el.getBoundingClientRect();
                const elementCenterX = bounds.left + bounds.width / 2;
                const elementCenterY = bounds.top + bounds.height / 2;
                
                gsap.to(cursorFollower, {
                    width: 60,
                    height: 60,
                    opacity: 0.6,
                    duration: 0.3,
                    borderColor: '#6b46e5'
                });
                
                el.addEventListener('mousemove', (e) => {
                    const magneticPull = 0.4;
                    const distanceX = e.clientX - elementCenterX;
                    const distanceY = e.clientY - elementCenterY;
                    
                    gsap.to(cursorFollower, {
                        x: mouseX - (distanceX * magneticPull),
                        y: mouseY - (distanceY * magneticPull),
                        duration: 0.3
                    });
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(cursorFollower, {
                    width: 40,
                    height: 40,
                    opacity: 1,
                    borderColor: 'var(--accent)',
                    duration: 0.3
                });
            });
        });
    }
    
    // Animação para as camadas 3D nos cards de projeto
    gsap.utils.toArray('.project-step').forEach(step => {
        const layers = step.querySelectorAll('.layer');
        
        step.addEventListener('mouseenter', () => {
            gsap.to(layers[0], {
                z: 10,
                rotateX: 2,
                rotateY: -2,
                duration: 0.5
            });
            
            gsap.to(layers[1], {
                z: 30,
                rotateX: 4,
                rotateY: -4,
                duration: 0.5,
                delay: 0.05
            });
            
            gsap.to(layers[2], {
                z: 50,
                rotateX: 6,
                rotateY: -6,
                duration: 0.5,
                delay: 0.1
            });
        });
        
        step.addEventListener('mousemove', (e) => {
            const bounds = step.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left - bounds.width / 2;
            const mouseY = e.clientY - bounds.top - bounds.height / 2;
            const rotateXIntensity = 5;
            const rotateYIntensity = 5;
            
            gsap.to(layers, {
                rotateX: -mouseY / bounds.height * rotateXIntensity,
                rotateY: mouseX / bounds.width * rotateYIntensity,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        step.addEventListener('mouseleave', () => {
            gsap.to(layers, {
                z: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.5
            });
        });
    });
});
