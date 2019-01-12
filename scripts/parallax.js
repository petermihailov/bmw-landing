(() => {
  const parallaxElements = document.querySelectorAll('.parallax');
  const parallaxQuantity = parallaxElements.length;

  window.addEventListener('scroll', function () {
    window.requestAnimationFrame(function () {
      for (let i = 0; i < parallaxQuantity; i++) {
        const currentElement =  parallaxElements[i];
        const k = currentElement.dataset.velocity || 0.3;
        const orientation = currentElement.dataset.orientation;
        const isHorizontal = ['left', 'right'].includes(orientation);
        const rect = currentElement.getBoundingClientRect();
        const wh = window.innerHeight;
        const scrolled = rect.top - wh;

        if (scrolled < 0) {
          if (isHorizontal) {
            const val = scrolled * k;
            const x = orientation === 'right' ? val * -1 : val;
            currentElement.style.transform = 'translate3d(' + x + 'px, 0, 0)';
          } else {
            currentElement.style.transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,${scrolled * k},0,1)`; //'translate3d(0,' + scrolled * k + 'px, 0)';
          }
        }
      }
    });
  });
})();
