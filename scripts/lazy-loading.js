(() => {
  // image lazy load
  document.addEventListener('DOMContentLoaded', function () {
    if ('IntersectionObserver' in window) {
      const lazyloadImages = document.querySelectorAll('.lazy');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyloadImages.forEach((image) => imageObserver.observe(image));
    } else {
      let lazyloadThrottleTimeout;
      const lazyloadImages = document.querySelectorAll('.lazy');

      function lazyload() {
        if (lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(() => {
          const scrollTop = window.pageYOffset;

          lazyloadImages.forEach((img) => {
            if (img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
          });

          if (lazyloadImages.length === 0) {
            document.removeEventListener('scroll', lazyload);
            window.removeEventListener('resize', lazyload);
          }
        }, 20);
      }

      document.addEventListener('scroll', lazyload);
      window.addEventListener('resize', lazyload);
    }
  });
})();
