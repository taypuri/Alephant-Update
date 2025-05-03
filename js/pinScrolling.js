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
    
    // Selecionar a seção principal e elementos importantes
    const section = document.querySelector('.learning-section');
    if (!section) {
        console.error('Seção de aprendizado não encontrada');
        return;
    }
    
    // Selecionar elementos dentro da seção
    const pinWrapper = section.querySelector('.pin-wrapper');
    const pinTitle = section.querySelector('.pin-title-container');
    const pinContent = section.querySelector('.pin-content');
    const pinCards = section.querySelector('.pin-cards');
    
    // Selecionar os cards individuais
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3 = document.getElementById('card3');
    
    // Verificar se todos os elementos foram encontrados
    if (!pinWrapper || !pinTitle || !pinContent || !pinCards || !card1 || !card2 || !card3) {
        console.error('Elementos necessários não encontrados');
        return;
    }
    
    console.log('Todos os elementos necessários encontrados');
    
    // ===== STEP 2: CORREÇÃO INICIAL DA ESTRUTURA HTML/CSS =====
    
    // Ajustar o wrapper para garantir espaço entre título e conteúdo
    gsap.set(pinWrapper, {
        position: 'relative',
        width: '100%',
        zIndex: 1,
        paddingTop: '20px', // Espaço extra no topo
        minHeight: '150vh'
    });
    
    // Ajustar título para garantir que fique bem no topo
    gsap.set(pinTitle, {
        position: 'relative',
        zIndex: 50, // z-index MUITO alto para garantir que fique sobre tudo
        marginBottom: '100px', // Espaço grande abaixo do título
        width: '100%',
        textAlign: 'center'
    });
    
    // Garantir que o container de conteúdo não sobreponha o título
    gsap.set(pinContent, {
        position: 'relative',
        height: '600px',
        width: '100%',
        marginTop: '50px', // Espaço adicional após o título
        zIndex: 1
    });
    
    // Container dos cards bem posicionado
    gsap.set(pinCards, {
        position: 'relative',
        width: '100%',
        height: '100%'
    });
    
    // ===== STEP 3: CONFIGURAR POSIÇÃO INICIAL CORRETA DOS CARDS =====
    
    // Limpar qualquer configuração anterior dos cards
    gsap.set([card1, card2, card3], {
        clearProps: "all" // Limpar propriedades anteriores
    });
    
    // Configuração precisa de cada card com position absolute
    gsap.set(card1, {
        position: 'absolute',
        top: '0',
        left: '50%',
        y: 0,
        xPercent: -50,
        scale: 1,
        opacity: 1,
        zIndex: 5,
        transformOrigin: 'center'
    });
    
    gsap.set(card2, {
        position: 'absolute',
        top: '0',
        left: '50%',
        y: 350, // Distância maior para evitar sobreposição inicial
        xPercent: -50,
        scale: 0.9,
        opacity: 0.7,
        zIndex: 4,
        transformOrigin: 'center'
    });
    
    gsap.set(card3, {
        position: 'absolute',
        top: '0',
        left: '50%',
        y: 700, // Distância ainda maior para o terceiro card
        xPercent: -50,
        scale: 0.8,
        opacity: 0.5,
        zIndex: 3,
        transformOrigin: 'center'
    });
    
    // ===== STEP 4: CONFIGURAR PINOS SEPARADOS PARA TÍTULO E CONTEÚDO =====
    
    // Criar ScrollTrigger para fixar APENAS o título
    const titleTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 5%", // Bem no topo da tela
        end: "bottom top",
        pin: pinTitle,
        pinSpacing: false, // IMPORTANTE: não adicionar espaço
        anticipatePin: 1,
        id: "pin-title-only",
        markers: false // Sem marcadores para o título
    });
    
    // ScrollTrigger separado para fixar o conteúdo dos cards
    const cardsTrigger = ScrollTrigger.create({
        trigger: pinContent,
        start: "top 20%", // Começa quando o conteúdo atinge 20% do topo
        end: "+=400%", // Duração longa para a animação
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "pin-cards",
        markers: true
    });
    
    // ===== STEP 5: ANIMAÇÃO SUAVE DOS CARDS =====
    
    // Timeline para animação dos cards durante o scroll
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: pinContent,
            start: "top 20%", // Mesmo ponto de início que o pin dos cards
            end: "+=400%",
            scrub: 1, // Suavidade do scrub (menor = mais responsivo)
            id: "cards-animation"
        }
    });
    
    // Primeiro card permanece no lugar por um tempo
    tl.to({}, { duration: 1 }); // Pausa inicial
    
    // Card 2 sobe gradualmente
    tl.to(card2, {
        y: 180, // Sobe, mas ainda mantém distância
        scale: 0.92,
        opacity: 0.8,
        duration: 1.5,
        ease: "power1.inOut"
    });
    
    // Card 2 continua subindo mais um pouco
    tl.to(card2, {
        y: 80, // Se aproxima mais do card 1
        scale: 0.95,
        opacity: 0.9,
        duration: 1.5,
        ease: "power1.inOut"
    });
    
    // Pausa para visualizar
    tl.to({}, { duration: 0.5 });
    
    // Card 3 começa a subir
    tl.to(card3, {
        y: 400, // Sobe um pouco
        scale: 0.85,
        opacity: 0.7,
        duration: 1.5,
        ease: "power1.inOut"
    });
    
    // Card 1 começa a subir lentamente e card 2 continua se aproximando
    tl.to(card1, {
        y: -60, // Começa a sair para cima sutilmente
        scale: 0.98,
        duration: 1.5,
        ease: "power1.inOut"
    });
    
    tl.to(card2, {
        y: 40, // Ainda mais próximo
        duration: 1.5,
        ease: "power1.inOut"
    }, "<"); // Simultaneamente com o anterior
    
    // Pausa para visualizar
    tl.to({}, { duration: 0.5 });
    
    // Card 1 sai de vista, Card 2 assume posição central
    tl.to(card1, {
        y: -250,
        scale: 0.85,
        opacity: 0.6,
        zIndex: 3,
        duration: 2,
        ease: "power2.inOut"
    });
    
    tl.to(card2, {
        y: 0, // Posição central exata
        scale: 1,
        opacity: 1,
        zIndex: 5, // Z-index mais alto para estar visível
        duration: 2,
        ease: "power2.inOut"
    }, "<");
    
    // Pausa longa para visualizar bem o segundo card
    tl.to({}, { duration: 1.5 });
    
    // Card 3 continua subindo
    tl.to(card3, {
        y: 200,
        scale: 0.9,
        opacity: 0.8,
        duration: 2,
        ease: "power1.inOut"
    });
    
    // Card 3 se aproxima ainda mais
    tl.to(card3, {
        y: 80,
        scale: 0.95,
        opacity: 0.9,
        duration: 2,
        ease: "power1.inOut"
    });
    
    // Pausa para visualizar
    tl.to({}, { duration: 0.5 });
    
    // Card 2 sai, Card 3 assume posição central
    tl.to(card2, {
        y: -250,
        scale: 0.85,
        opacity: 0.6,
        zIndex: 3,
        duration: 2,
        ease: "power2.inOut"
    });
    
    tl.to(card3, {
        y: 0, // Posição central
        scale: 1,
        opacity: 1,
        zIndex: 5, // Z-index mais alto
        duration: 2,
        ease: "power2.inOut"
    }, "<");
    
    // Pausa final para apreciar o último card
    tl.to({}, { duration: 2 });
    
    // ===== STEP 6: MANUTENÇÃO E EVENTOS =====
    
    // Atualizar quando a janela for redimensionada
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh(true);
    });
    
    // Ocultar seções adicionais para focar apenas na primeira
    const additionalSections = document.querySelectorAll('.second-section, .third-section');
    additionalSections.forEach(section => {
        section.style.display = 'none';
    });
    
    console.log('Pin scrolling configurado com sucesso');
});
