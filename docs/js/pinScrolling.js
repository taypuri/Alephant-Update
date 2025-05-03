// pinScrolling.js - GSAP + ScrollTrigger para efeito elegante de cards sobrepostos

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const wrapper = document.querySelector('.pin-wrapper');
  const cards = gsap.utils.toArray('.pin-card');
  if (!wrapper || cards.length !== 3) {
    console.error('Erro: .pin-wrapper ou número de .pin-card inválido (esperado 3)');
    return;
  }

  // Estados iniciais: todos centralizados, exceto o primeiro visível
  cards.forEach(card => gsap.set(card, {
    xPercent: -50,
    yPercent: -50,
    scale: 0.9,
    opacity: 0,
    transformOrigin: 'center center'
  }));
  gsap.set(cards[0], { scale: 1, opacity: 1 });

  // Timeline e ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      pin: true,
      pinSpacing: false,
      markers: true // Ativar para debug visual
    }
  });

  // Transição: card1 recua, card2 entra
  tl.to(cards[0], { scale: 0.9, opacity: 0.6, duration: 0.5 })
    .to(cards[1], { scale: 1, opacity: 1, duration: 0.5 }, '<0.25')
    // Transição: card2 recua, card3 entra
    .to(cards[1], { scale: 0.9, opacity: 0.6, duration: 0.5 }, '+=0.5')
    .to(cards[2], { scale: 1, opacity: 1, duration: 0.5 }, '<0.25');
});
