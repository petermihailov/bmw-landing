(() => {
  const mainVideo = document.querySelector('#slide-main video');

  // ScrollOut
  ScrollOut({
    onShown: function (el, {intersectY}) {
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
    },

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
