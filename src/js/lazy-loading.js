(() => {
  // image lazy load
  document.addEventListener('DOMContentLoaded', function () {
    if ('IntersectionObserver' in window) {
      const lazyloadImages = document.querySelectorAll('.lazy');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyloadImages.forEach((image) => imageObserver.observe(image));
    }
  });
})();
