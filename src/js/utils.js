export const calcScrollPercent = (startScrollPosition, step) => {
  const val = (window.scrollY - startScrollPosition) / step;
  if (val > 100) return 100;
  if (val < 0) return 0;
  return val;
};

export const setScrollAnimation = (animation, offsetY, elementHeight) => {
  const wh = window.innerHeight;
  const startScrollPosition = offsetY - wh;
  const step = (elementHeight + wh) / 100;

  if (!animation.listen) {
    document.addEventListener('scroll', () => {
      const value = calcScrollPercent(startScrollPosition, step);
      animation.seek(value);
    }, {passive: true});
    animation.listen = true;
  }
};
