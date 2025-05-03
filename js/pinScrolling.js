// pinScrolling.js - Implementação completa de scroll hijacking com GSAP e ScrollTrigger

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Obter referências a elementos
  const section = document.querySelector('#program');
  if (!section) return;

  const wrapper = section.querySelector('.pin-wrapper');
  const cards = Array.from(section.querySelectorAll('.pin-card'));
  
  if (!wrapper || cards.length !== 3) {
    console.error('Elementos para pin-scrolling ausentes');
    return;
  }

  // Limpar ScrollTriggers antigos
  ScrollTrigger.getAll().forEach(st => st.kill());
  
  // Reset de estilos iniciais
  gsap.set(cards, {
    xPercent: -50,
    yPercent: 0,
    autoAlpha: 0,
    clearProps: "z-index"
  });
  
  // Definir o primeiro card como visível inicialmente
  gsap.set(cards[0], { autoAlpha: 1 });

  // Criar uma única ScrollTrigger para controlar toda a seção
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${window.innerHeight * 2}`, // 2 alturas de tela
    pin: wrapper,
    pinSpacing: true,
    anticipatePin: 1,
    markers: false, // Ativar para debug
    onToggle: self => {
      if (self.isActive) {
        // Quando a seção for ativa, inicia a timeline
        tl.play(0);
      }
    }
  });

  // Criar timeline principal
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * 2}`,
      scrub: 0.5, // Suavidade do scrub (0.5 segundos)
      onUpdate: self => {
        // Atualizar classes CSS com base no progresso da animação
        const progress = self.progress;
        
        // Primeiro terço da animação
        if (progress < 0.33) {
          cards[0].classList.add('active');
          cards[1].classList.remove('active');
          cards[2].classList.remove('active');
        } 
        // Segundo terço da animação
        else if (progress < 0.66) {
          cards[0].classList.remove('active');
          cards[1].classList.add('active');
          cards[2].classList.remove('active');
        } 
        // Último terço da animação
        else {
          cards[0].classList.remove('active');
          cards[1].classList.remove('active');
          cards[2].classList.add('active');
        }
      }
    }
  });

  // Sequência de animação: card1->card2->card3
  tl
    // Transição 1: card1 sai, card2 entra
    .to(cards[0], { yPercent: -100, autoAlpha: 0, ease: "power2.inOut", duration: 0.4 }, 0)
    .to(cards[1], { yPercent: 0, autoAlpha: 1, ease: "power2.inOut", duration: 0.4 }, 0.1)
    
    // Transição 2: card2 sai, card3 entra
    .to(cards[1], { yPercent: -100, autoAlpha: 0, ease: "power2.inOut", duration: 0.4 }, 0.5)
    .to(cards[2], { yPercent: 0, autoAlpha: 1, ease: "power2.inOut", duration: 0.4 }, 0.6);
  
  // Ajustar em redimensionamento
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh(true);
  });
});
