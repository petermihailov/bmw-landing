(() => {
  // parallax tube
  const slowAnimation = anime({
    targets: '.tube-parallax',
    translateY: -1500,
    duration: 1000,
    easing: 'linear',
    autoplay: false
  });

  const seekInput = document.querySelector('.seek');

  seekInput.oninput = function() {
    console.log(slowAnimation.duration * (seekInput.value / 100));
    slowAnimation.seek(slowAnimation.duration * (seekInput.value / 100));
  };
})();
