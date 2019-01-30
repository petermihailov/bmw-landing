import Glider from 'glider-js';

export const initGlider = (gliderSelector, options, autoplay) => {
  window.addEventListener('DOMContentLoaded', () => {
      const delay = 3000;
      const elements = document.querySelectorAll(gliderSelector);

      elements.forEach((el) => {
        const idx = el.dataset.index;
        const prev = `[data-index="${idx}"] ~ .glider-prev`;
        const next = `[data-index="${idx}"] ~ .glider-next`;

        const glider = new Glider(el, {
          ...options,
          arrows: {
            prev,
            next,
          },
        });

        if (autoplay) {
          let interval = null;
          const startSlideShow = (glider) => interval = setInterval(() => glider.scrollItem('next'), delay);
          startSlideShow(glider);

          const isTouchInteraction = 'ontouchstart' in window || navigator.msMaxTouchPoints;
          const event = isTouchInteraction ? 'touchstart' : 'click';

          window.addEventListener(event, ({target}) => {
            const isClickInside = el.parentElement.contains(target);

            if (isClickInside) {
              clearInterval(interval);
              interval = null;
            } else {
              if (!interval) {
                startSlideShow(glider);
              }
            }
          }, {passive: true});
        }
      });
    },
  );
};
