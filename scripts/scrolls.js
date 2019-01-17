(() => {

  // utils
  const calcScrollPercent = (startScrollPosition, step) => {
    const val = (window.scrollY - startScrollPosition) / step;
    if (val > 100) return 100;
    if (val < 0) return 0;
    return val;
  };

  const setScrollAnimation = (animation, offsetY, elementHeight) => {
    const wh = window.innerHeight;
    const startScrollPosition = offsetY - wh;
    const step = (elementHeight + wh) / 100;

    if (!animation.listen) {
      document.addEventListener('scroll', () => {
        const value = calcScrollPercent(startScrollPosition, step);
        animation.seek(value);
      });
      animation.listen = true;
    }
  };

  // DOM
  const mainVideo = document.querySelector('#slide-main video');

  // animations
  const tubeParallax = anime({
    targets: '.tube-parallax',
    translateY: -3000,
    duration: 100,
    easing: 'linear',
    autoplay: false
  });

  ScrollOut({
    // show
    onShown: function (el, ctx) {
      const {intersectY, offsetY, elementHeight} = ctx;

      if (el.tagName === 'VIDEO') {
        el.play();
        el.style.opacity = '1';
      }

      if (el.classList.contains('fade')) {
        el.classList.add('fadeIn');
      }

      if (el.id === 'slide-start' && intersectY === -1) {
        mainVideo.play();
        mainVideo.style.opacity = '1';
      }

      if (el.id === 'slide-tube') {
        setScrollAnimation(tubeParallax, offsetY, elementHeight);
      }
    },

    // hide
    onHidden: function (el, {intersectY}) {
      if (el.tagName === 'VIDEO') {
        el.pause();
        el.style.opacity = '0';
      }

      if (el.classList.contains('fade')) {
        el.classList.remove('fadeIn');
      }

      if (el.id === 'slide-start' && intersectY === -1) {
        mainVideo.pause();
        mainVideo.style.opacity = '0';
      }
    },
  });
})();
