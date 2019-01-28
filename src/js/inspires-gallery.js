(() => {
  window.addEventListener('DOMContentLoaded', function () {
    const el = document.querySelector('.inspires-glider');

    const idx = el.dataset.index;
    const prev = `[data-index="${idx}"] ~ .glider-prev`;
    const next = `[data-index="${idx}"] ~ .glider-next`;

    const glider = new Glider(el, {
      slidesToShow: 5,
      slidesToScroll: 5,
      draggable: false,
      arrows: {
        prev,
        next,
      },
    });
  });
})();
