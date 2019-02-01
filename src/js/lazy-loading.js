export const initLazyLoading = () => document.addEventListener('DOMContentLoaded', () => {
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
    }, {
      rootMargin: '0px',
      threshold: 0.1,
    });

    lazyloadImages.forEach((image) => imageObserver.observe(image));
  }
});
