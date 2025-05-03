// Versão Simplificada para Human Academy - 2025
document.addEventListener('DOMContentLoaded', function() {
    if (!window.gsap || !window.ScrollTrigger) {
        console.error('GSAP ou ScrollTrigger não encontrados');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Remover ScrollTriggers anteriores
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    // Seleção dos elementos
    const cards = document.querySelectorAll('.pin-card');
    const title = document.querySelector('.pin-title-container');
    const content = document.querySelector('.pin-content');
    
    if (cards.length !== 3 || !title || !content) {
        console.error('Elementos necessários não encontrados');
        return;
    }
    
    // Evitar duplicação - desativar outras seções
    document.querySelectorAll('.second-section, .third-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Estilo fixo direto - sem depender de CSS externo
    document.head.insertAdjacentHTML('beforeend', `
    <style>
        .pin-title-container {
            position: relative;
            z-index: 999 !important;
            margin-bottom: 250px !important;
            padding-bottom: 30px !important;
        }
        
        .pin-content {
            height: 600px !important;
            overflow: visible !important;
        }
        
        .pin-card {
            transition: all 0s !important;
        }
        
        #card1 { z-index: 1 !important; }
        #card2 { z-index: 2 !important; }
        #card3 { z-index: 3 !important; }
        
        .learning-section, .pin-wrapper {
            overflow: visible !important;
        }
    </style>
    `);
    
    // Posicionamento inicial
    gsap.set('.pin-card', {
        position: 'absolute',
        left: '50%',
        xPercent: -50,
    });
    
    // Card 1 - Visível no início
    gsap.set('#card1', {
        y: 0,
        scale: 1,
        opacity: 1
    });
    
    // Card 2 - Fora de visão
    gsap.set('#card2', {
        y: 800,
        scale: 0.8,
        opacity: 0
    });
    
    // Card 3 - Ainda mais fora
    gsap.set('#card3', {
        y: 1600,
        scale: 0.7,
        opacity: 0
    });
    
    // ScrollTrigger para o título
    ScrollTrigger.create({
        trigger: title,
        start: "top 15%",
        endTrigger: ".learning-section",
        end: "bottom top",
        pin: true,
        pinSpacing: false
    });
    
    // ScrollTrigger para o conteúdo
    ScrollTrigger.create({
        trigger: content,
        start: "top 30%",
        end: "+=300%",
        pin: true
    });
    
    // Animação principal
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: content,
            start: "top 30%",
            end: "+=300%",
            scrub: 1
        }
    });
    
    // Pausa no Card 1
    tl.to({}, {duration: 1});
    
    // Card 2 aparece
    tl.to('#card2', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2
    });
    
    // Card 1 recua
    tl.to('#card1', {
        y: 50,
        opacity: 0.7,
        scale: 0.9,
        duration: 1.5
    }, "-=1.5"); // Simultaneamente
    
    // Pausa no Card 2
    tl.to({}, {duration: 1.5});
    
    // Card 3 aparece
    tl.to('#card3', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2
    });
    
    // Card 2 recua
    tl.to('#card2', {
        y: 50,
        opacity: 0.7,
        scale: 0.9,
        duration: 1.5
    }, "-=1.5"); // Simultaneamente
    
    // Card 1 recua mais
    tl.to('#card1', {
        y: 100,
        opacity: 0.4,
        scale: 0.8,
        duration: 1.5
    }, "-=1.5"); // Simultaneamente
    
    // Pausa final
    tl.to({}, {duration: 2});
});
