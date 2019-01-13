(() => {
  const mainSlide = document.getElementById('slide-main');

  if (mainSlide) {
    const video = mainSlide.querySelector('video');
    const soundBtn = mainSlide.querySelector('.sound-button');

    soundBtn.addEventListener('click', () => {
      const isMuted = !video.muted;
      video.muted = isMuted;

      if (isMuted) {
        soundBtn.classList.remove('sound-on');
        soundBtn.classList.add('sound-off');
      } else {
        soundBtn.classList.remove('sound-off');
        soundBtn.classList.add('sound-on');
      }
    });
  }
})();
