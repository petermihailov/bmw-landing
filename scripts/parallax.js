(() => {
  // parallax effect
  const parallaxElements = document.querySelectorAll('.parallax');
  const parallaxQuantity = parallaxElements.length;

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      for (let i = 0; i < parallaxQuantity; i++) {
        const currentElement =  parallaxElements[i];
        const k = currentElement.dataset.velocity || 0.3;
        const orientation = currentElement.dataset.orientation;
        const action = currentElement.dataset.action;
        const isHorizontal = ['left', 'right'].includes(orientation);
        const rect = currentElement.getBoundingClientRect();
        const wh = window.innerHeight;
        const scrolled = rect.top - wh;

        if (scrolled < 0) {
          const val = scrolled * k;

          if (action === 'rotate') {
            const scrolled = window.scrollY * k;
            currentElement.style.transform = `rotate(${scrolled % 360}deg)`;
          } else if (isHorizontal) {
            const x = orientation === 'right' ? val * -1 : val;
            currentElement.style.transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},0,0,1)`;
          } else {
            currentElement.style.transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,${val},0,1)`;
          }
        }
      }
    });
  });
})();
