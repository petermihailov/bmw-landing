import anime from 'animejs';

export const tubeParallax = anime({
  targets: '.tube-parallax',
  translateY: -2200,
  duration: 100,
  easing: 'linear',
  autoplay: false,
});

export const appsParallax = anime({
  targets: '#apps-line',
  translateX: 1200,
  duration: 100,
  easing: 'linear',
  autoplay: false,
});

export const appsValParallax = anime({
  targets: '#apps-val',
  translateX: 800,
  duration: 100,
  easing: 'linear',
  autoplay: false,
});

export const appsDiscountParallax = anime({
  targets: '#apps-discount',
  translateX: -600,
  duration: 100,
  easing: 'linear',
  autoplay: false,
});

export const clubWheelRotate = anime({
  targets: '#club-wheel',
  rotate: 540,
  duration: 100,
  easing: 'linear',
  autoplay: false,
});
