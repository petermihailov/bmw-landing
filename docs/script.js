"use strict";

(function () {
  /*
  * PhotoSwipe
  * */
  var initPhotoSwipeFromDOM = function initPhotoSwipeFromDOM(gallerySelector) {
    var parseThumbnailElements = function parseThumbnailElements(el) {
      var thumbElements = el.childNodes;
      var numNodes = thumbElements.length;
      var items = [];

      for (var i = 0; i < numNodes; i++) {
        var figureEl = thumbElements[i];

        if (figureEl.nodeType !== 1) {
          continue;
        }

        var linkEl = figureEl.children[0];
        var size = linkEl.getAttribute('data-size').split('x');
        var item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };

        if (figureEl.children.length > 1) {
          item.title = figureEl.children[1].innerHTML;
        }

        if (linkEl.children.length > 0) {
          item.msrc = linkEl.children[0].getAttribute('src');
        }

        item.el = figureEl;
        items.push(item);
      }

      return items;
    };

    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    var onThumbnailsClick = function onThumbnailsClick(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      var eTarget = e.target || e.srcElement;
      var clickedListItem = closest(eTarget, function (el) {
        return el.tagName && el.tagName.toUpperCase() === 'FIGURE';
      });

      if (!clickedListItem) {
        return;
      }

      var clickedGallery = clickedListItem.parentNode;
      var childNodes = clickedListItem.parentNode.childNodes;
      var numChildNodes = childNodes.length;
      var nodeIndex = 0,
          index;

      for (var i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }

        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }

        nodeIndex++;
      }

      if (index >= 0) {
        openPhotoSwipe(index, clickedGallery);
      }

      return false;
    };

    var photoswipeParseHash = function photoswipeParseHash() {
      var hash = window.location.hash.substring(1);
      var params = {};

      if (hash.length < 5) {
        return params;
      }

      var vars = hash.split('&');

      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }

        var pair = vars[i].split('=');

        if (pair.length < 2) {
          continue;
        }

        params[pair[0]] = pair[1];
      }

      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }

      return params;
    };

    var openPhotoSwipe = function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0];
      var items = parseThumbnailElements(galleryElement);
      var options = {
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),
        getThumbBoundsFn: function getThumbBoundsFn(index) {
          var thumbnail = items[index].el.getElementsByTagName('img')[0]; // find thumbnail

          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          var rect = thumbnail.getBoundingClientRect();
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          };
        }
      };

      if (fromURL) {
        if (options.galleryPIDs) {
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }

      if (isNaN(options.index)) {
        return;
      }

      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }

      var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    };

    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }

    var hashData = photoswipeParseHash();

    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
  }; // init


  initPhotoSwipeFromDOM('.gallery');
  /*
  * GliderJS
  * */

  window.addEventListener('DOMContentLoaded', function () {
    var delay = 3000;
    var elements = document.querySelectorAll('.glider');
    elements.forEach(function (el) {
      var idx = el.dataset.index;
      var prev = "[data-index=\"".concat(idx, "\"] ~ .glider-prev");
      var next = "[data-index=\"".concat(idx, "\"] ~ .glider-next");

      var startSlideShow = function startSlideShow() {
        return interval = setInterval(function () {
          return glider.scrollItem('next');
        }, delay);
      };

      var interval = null;
      var glider = new Glider(el, {
        rewind: true,
        arrows: {
          prev: prev,
          next: next
        }
      });
      startSlideShow();
      var isTouchInteraction = 'ontouchstart' in window || navigator.msMaxTouchPoints;
      var event = isTouchInteraction ? 'touchstart' : 'click';
      window.addEventListener(event, function (e) {
        var isClickInside = el.parentElement.contains(e.target);

        if (isClickInside) {
          clearInterval(interval);
          interval = null;
        } else {
          if (!interval) {
            startSlideShow();
          }
        }
      });
    });
  });
})();

(function () {
  // image lazy load
  document.addEventListener('DOMContentLoaded', function () {
    if ('IntersectionObserver' in window) {
      var lazyloadImages = document.querySelectorAll('.lazy');
      var imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;

            if (img.dataset.src) {
              img.src = img.dataset.src;
            }

            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      lazyloadImages.forEach(function (image) {
        return imageObserver.observe(image);
      });
    }
  });
})();

(function () {
  // utils
  var calcScrollPercent = function calcScrollPercent(startScrollPosition, step) {
    var val = (window.scrollY - startScrollPosition) / step;
    if (val > 100) return 100;
    if (val < 0) return 0;
    return val;
  };

  var setScrollAnimation = function setScrollAnimation(animation, offsetY, elementHeight) {
    var wh = window.innerHeight;
    var startScrollPosition = offsetY - wh;
    var step = (elementHeight + wh) / 100;

    if (!animation.listen) {
      document.addEventListener('scroll', function () {
        var value = calcScrollPercent(startScrollPosition, step);
        animation.seek(value);
      });
      animation.listen = true;
    }
  }; // DOM


  var mainVideo = document.querySelector('#slide-main video'); // animations

  var tubeParallax = anime({
    targets: '.tube-parallax',
    translateY: -3000,
    duration: 100,
    easing: 'linear',
    autoplay: false
  });
  var appsParallax = anime({
    targets: '#apps-line',
    translateX: 1200,
    duration: 100,
    easing: 'linear',
    autoplay: false
  });
  var appsValParallax = anime({
    targets: '#apps-val',
    translateX: 800,
    duration: 100,
    easing: 'linear',
    autoplay: false
  });
  var appsDiscountParallax = anime({
    targets: '#apps-discount',
    translateX: -600,
    duration: 100,
    easing: 'linear',
    autoplay: false
  });
  var clubWheelRotate = anime({
    targets: '#club-wheel',
    rotate: 540,
    duration: 100,
    easing: 'linear',
    autoplay: false
  });
  ScrollOut({
    // show
    onShown: function onShown(el, ctx) {
      var intersectY = ctx.intersectY,
          offsetY = ctx.offsetY,
          elementHeight = ctx.elementHeight;

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
    // hide
    onHidden: function onHidden(el, _ref) {
      var intersectY = _ref.intersectY;

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
    }
  });
})();

(function () {
  // smooth scroll
  var scroll = new SmoothScroll('a[href*="#"]');
})();

(function () {
  // Sound control
  var mainSlide = document.getElementById('slide-main');

  if (mainSlide) {
    var video = mainSlide.querySelector('video');
    var soundBtn = mainSlide.querySelector('.sound-button');
    soundBtn.addEventListener('click', function () {
      var isMuted = !video.muted;
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