import {initLazyLoading} from './lazy-loading';
import {initScrolls} from './scrolls';
import {initSoundControl} from './sound-controll';
import {initStars} from './stars';
import {initSmoothScroll} from './smooth-scroll';
import {initPhotoswipe} from './photoswipe';
import {initGlider} from './glider';

initSoundControl();
initStars();
initScrolls();
initSmoothScroll();
initLazyLoading();
initPhotoswipe('.gallery');
initGlider('.gallery-glider', {rewind: true}, true);
initGlider('.inspires-glider', {
  slidesToShow: 5,
  slidesToScroll: 5,
  draggable: false,
});
