(() => {
  // ScrollOut
  ScrollOut({
    onShown: function (el) {
      if (el.tagName === 'VIDEO') {
        el.play();
        el.style.opacity = '1';
      }

      if (el.classList.contains('fade')) {
        el.classList.add('fadeIn');
      }
    },

    onHidden: function (el) {
      if (el.tagName === 'VIDEO') {
        el.pause();
        el.style.opacity = '0';
      }

      if (el.classList.contains('fade')) {
        el.classList.remove('fadeIn');
      }
    },
  });
})();
