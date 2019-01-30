import ScrollOut from 'scroll-out';
import {setScrollAnimation} from './utils';
import {tubeParallax, appsParallax, appsValParallax, appsDiscountParallax, clubWheelRotate} from './animations';

const MAIN_VIDEO_ELEMENT = document.querySelector('#slide-main video');

export const initScrolls = () => ScrollOut({
  // show
  onShown: function (el, ctx) {
    const {intersectY, offsetY, elementHeight} = ctx;

    if (el.tagName === 'VIDEO') {
      el.play();
      el.style.opacity = '1';
    }

    if (el.classList.contains('fade')) {
      el.classList.add('fadeIn');
    }

    if (el.id === 'slide-start' && intersectY === -1) {
      MAIN_VIDEO_ELEMENT.play();
      MAIN_VIDEO_ELEMENT.style.opacity = '1';
    }

    if (el.id === 'slide-tube') {
      setScrollAnimation(tubeParallax, offsetY, elementHeight);
    }

    if (el.id === 'slide-apps') {
      setScrollAnimation(appsParallax, offsetY, elementHeight);
      setScrollAnimation(appsValParallax, offsetY, elementHeight);
      setScrollAnimation(appsDiscountParallax, offsetY, elementHeight);
    }

    if (el.id === 'slide-club') {
      setScrollAnimation(clubWheelRotate, offsetY, elementHeight);
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
      MAIN_VIDEO_ELEMENT.pause();
      MAIN_VIDEO_ELEMENT.style.opacity = '0';
    }
  },
});
