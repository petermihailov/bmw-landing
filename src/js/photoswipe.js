import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

export const initPhotoswipe = (gallerySelector) => {
  const parseThumbnailElements = (el) => {
    const thumbElements = el.childNodes;
    const numNodes = thumbElements.length;
    const items = [];

    for (let i = 0; i < numNodes; i++) {
      const figureEl = thumbElements[i];

      if (figureEl.nodeType !== 1) {
        continue;
      }

      const linkEl = figureEl.children[0];
      const size = linkEl.getAttribute('data-size').split('x');

      const item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
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

  const closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };

  const onThumbnailsClick = (e) => {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    const eTarget = e.target || e.srcElement;

    const clickedListItem = closest(eTarget, function (el) {
      return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    });

    if (!clickedListItem) {
      return;
    }

    const clickedGallery = clickedListItem.parentNode;
    const childNodes = clickedListItem.parentNode.childNodes;
    const numChildNodes = childNodes.length;
    let nodeIndex = 0, index;

    for (let i = 0; i < numChildNodes; i++) {
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

  const photoswipeParseHash = () => {
    const hash = window.location.hash.substring(1);
    const params = {};

    if (hash.length < 5) {
      return params;
    }

    const vars = hash.split('&');

    for (let i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }

      const pair = vars[i].split('=');

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

  const openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const items = parseThumbnailElements(galleryElement);
    const options = {
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),
      getThumbBoundsFn: (index) => {
        const thumbnail = items[index].el.getElementsByTagName('img')[0]; // find thumbnail
        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
        const rect = thumbnail.getBoundingClientRect();

        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
      },
    };

    if (fromURL) {
      if (options.galleryPIDs) {
        for (let j = 0; j < items.length; j++) {
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

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  const galleryElements = document.querySelectorAll(gallerySelector);

  for (let i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  const hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};
