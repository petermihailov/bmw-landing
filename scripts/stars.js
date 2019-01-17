(() => {
  const container = document.getElementById('main-stars');

  if (container) {
    const stars = container.querySelectorAll('.stars_star');

    stars.forEach((star) => {
      star.addEventListener('mouseenter', ({target}) => {
        target.click();
      })
    })
  }
})();
