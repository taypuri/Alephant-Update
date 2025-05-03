// Pin Scrolling Effects para Human Academy
// Implementação do efeito clássico de pin scrolling com cards sobrepostos

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Carregado - Iniciando setup de pin scrolling');
    
    // Verificações iniciais de dependências
    if (typeof gsap === 'undefined') {
        console.error('GSAP não encontrado - O efeito de pin scrolling não funcionará');
        return;
    }
    
    if (typeof ScrollTrigger === 'undefined') {
        console.error('ScrollTrigger não encontrado - O efeito de pin scrolling não funcionará');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    console.log('ScrollTrigger registrado com sucesso');
    
    // Limpar ScrollTriggers anteriores para evitar conflitos
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    // ===== STEP 1: SETUP INICIAL =====
    
    // Selecionar APENAS a primeira seção (para evitar problema de duplicação)
    const section = document.querySelector('.learning-section:not(.second-section):not(.third-section)');
    if (!section) {
        console.error('Seção de aprendizado não encontrada');
        return;
    }
    
    // Ocultar TODAS as seções adicionais para focar apenas na primeira
    const additionalSections = document.querySelectorAll('.second-section, .third-section');
    additionalSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Selecionar elementos dentro da seção
    const pinWrapper = section.querySelector('.pin-wrapper');
    const pinTitle = section.querySelector('.pin-title-container');
    const pinContent = section.querySelector('.pin-content');
    const pinCards = section.querySelector('.pin-cards');
    
    // Selecionar os cards individuais
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3 = document.getElementById('card3');
    
    // Verificar se todos os elementos necessários existem
    if (!pinWrapper || !pinTitle || !pinContent || !pinCards || !card1 || !card2 || !card3) {
        console.error('Elementos necessários não encontrados');
        return;
    }
    
    console.log('Todos os elementos necessários encontrados');
    
    // ===== STEP 2: CONFIGURAÇÃO INICIAL DA ESTRUTURA =====
    
    // Ajustar o wrapper para garantir espaço correto
    gsap.set(pinWrapper, {
        position: 'relative',
        width: '100%',
        zIndex: 1,
        minHeight: '200vh', // Altura mínima para permitir scroll
        overflow: 'visible' // Importante para que os elementos não sejam cortados
    });
    
    // Configurar título com z-index muito alto e mais espaço
    gsap.set(pinTitle, {
        position: 'relative',
        zIndex: 200, // z-index extremamente alto (aumentado para 200)
        width: '100%',
        marginBottom: '250px', // MUITO mais espaço abaixo do título (250px)
        textAlign: 'center',
        background: 'linear-gradient(to bottom, var(--bg-color) 85%, transparent)', // Fundo com degradê
        paddingBottom: '30px' // Padding adicional
    });
    
    // Configurar container de conteúdo
    gsap.set(pinContent, {
        position: 'relative',
        height: '700px', // Aumentado para mais espaço
        width: '100%',
        zIndex: 1,
        overflow: 'visible' // Importante para que os cards possam sair do container
    });
    
    // Configurar container dos cards
    gsap.set(pinCards, {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'visible' // Importante para que os cards possam sair do container
    });
    
    // ===== STEP 3: POSICIONAMENTO INICIAL DOS CARDS =====
    
    // Resetar cards para evitar conflitos com estilos anteriores
    gsap.set([card1, card2, card3], {
        clearProps: "all"
    });
    
    // Posição inicial do primeiro card - mais distante do título
    gsap.set(card1, {
        position: 'absolute',
        top: '0',
        left: '50%',
        y: 0,
        xPercent: -50,
        scale: 1,
        opacity: 1,
        zIndex: 10,
        transformOrigin: 'center center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
    });
    
    // Posição inicial do segundo card (atrás do primeiro, mas mais baixo)
    gsap.set(card2, {
        position: 'absolute',
        top: '0',
        left: '50%',
        y: 600, // Ainda mais distante
        xPercent: -50,
        scale: 0.9,
        opacity: 0.6, // Mais transparente inicialmente
        zIndex: 9,
        transformOrigin: 'center center',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)'
    });
    
    // Posição inicial do terceiro card (ainda mais abaixo)
    gsap.set(card3, {
        position: 'absolute',
        top: '0',
        left: '50%',
        y: 1000, // Muito mais distante
        xPercent: -50,
        scale: 0.8,
        opacity: 0.3, // Ainda mais transparente
        zIndex: 8,
        transformOrigin: 'center center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    });
    
    // ===== STEP 4: CONFIGURAÇÃO ÚNICA DE PIN SCROLLING =====
    
    // Criar ScrollTrigger para o título fixo 
    ScrollTrigger.create({
        trigger: section,
        start: "top 10%", // Começa um pouco depois do topo
        endTrigger: section,
        end: "bottom top",
        pin: pinTitle,
        pinSpacing: false,
        id: "title-pin",
        markers: false,
    });
    
    // Criar ScrollTrigger principal para o conteúdo
    const mainScrollTrigger = ScrollTrigger.create({
        trigger: pinContent,
        start: "top 30%", // Começa mais abaixo (30% da janela)
        end: "+=300%", // Reduzindo duração
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "content-pin",
        markers: false,
    });
    
    // ===== STEP 5: ANIMAÇÃO GRADUADA DOS CARDS (COM ORDEM CORRETA) =====
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: pinContent,
            start: "top 30%", // Deve corresponder ao start do ScrollTrigger do conteúdo
            end: "+=300%",
            scrub: 1,
            id: "cards-animation",
        }
    });
    
    // Pausa inicial para o primeiro card ser visto adequadamente
    tl.to({}, { duration: 0.8 });
    
    // CARD 2 SOBE POR CIMA do Card 1 (ajustando z-index para ficar acima)
    tl.to(card2, {
        y: 200, // Começa a subir, mas ainda não completamente
        scale: 0.95,
        opacity: 0.8,
        duration: 1.2,
        ease: "power1.inOut"
    });
    
    // Pausa para visualizar
    tl.to({}, { duration: 0.3 });
    
    // CARD 3 começa a subir enquanto CARD 2 continua subindo
    tl.to(card3, {
        y: 600, // Começa a subir, mas ainda longe
        scale: 0.85,
        opacity: 0.7,
        duration: 1.2,
        ease: "power1.inOut"
    });
    
    // CARD 2 assume sua posição final POR CIMA do CARD 1
    tl.to(card2, {
        y: 0, // Alinha com a posição do card 1
        scale: 1, 
        zIndex: 11, // MAIOR que o z-index do card 1 (10) para ficar por cima
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut"
    });
    
    // Card 1 diminui e vai para trás/baixo ao mesmo tempo
    tl.to(card1, {
        y: 50, // Um pouco para baixo
        scale: 0.9,
        opacity: 0.7,
        zIndex: 9, // Reduzido para ficar atrás
        duration: 1.5,
        ease: "power2.inOut"
    }, "<"); // Simultaneamente
    
    // Pausa para visualizar o card 2 em destaque
    tl.to({}, { duration: 1 });
    
    // CARD 3 continua subindo
    tl.to(card3, {
        y: 200, // Mais próximo, mas ainda não completamente
        scale: 0.95,
        opacity: 0.8,
        duration: 1.5,
        ease: "power1.inOut"
    });
    
    // Pausa para visualizar
    tl.to({}, { duration: 0.5 });
    
    // CARD 3 assume posição de destaque POR CIMA dos outros
    tl.to(card3, {
        y: 0, // Posição central
        scale: 1,
        opacity: 1,
        zIndex: 12, // MAIOR que todos (10 e 11) para ficar por cima de todos
        duration: 1.5,
        ease: "power2.inOut"
    });
    
    // CARD 2 diminui e vai para trás/baixo
    tl.to(card2, {
        y: 30, // Menos para baixo que o card 1
        scale: 0.85,
        opacity: 0.5,
        zIndex: 8, // Atrás do card 1 
        duration: 1.5,
        ease: "power2.inOut"
    }, "<"); // Simultaneamente
    
    // CARD 1 diminui ainda mais
    tl.to(card1, {
        y: 60, // Mais para baixo que o card 2
        scale: 0.8,
        opacity: 0.3,
        zIndex: 7, // Atrás de todos
        duration: 1.5,
        ease: "power2.inOut"
    }, "<"); // Simultaneamente
    
    // Pausa final
    tl.to({}, { duration: 1 });
    
    // ===== STEP 6: MANUTENÇÃO E EVENTOS =====
    
    // Adiciona classe específica para evitar conflitos com outras seções
    section.classList.add('pin-scrolling-active');
    
    // Prevenir scrolljacking (comportamento que faz o scroll parecer duplicado)
    ScrollTrigger.config({ limitCallbacks: true });
    
    // Atualizar quando a janela for redimensionada
    window.addEventListener('resize', () => {
        setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 200);
    });
    
    // Melhorar a performance de imagens pré-carregando
    const cardBackgrounds = document.querySelectorAll('.pin-card-media');
    cardBackgrounds.forEach(bg => {
        const url = window.getComputedStyle(bg).backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
        if (url && url !== 'none') {
            const img = new Image();
            img.src = url;
        }
    });
    
    // Inicialização completa
    console.log('Pin scrolling configurado com sucesso');
});
