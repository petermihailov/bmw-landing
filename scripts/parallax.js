// (() => {
//   // parallax effect
//   const initPositions = {};
//   const callbacks = {};
//   const parallaxElements = [document.querySelector('.parallax')];
//   // init
//   parallaxElements.forEach((el, idx) => {
//     el.dataset.parallaxIdx = idx.toString();
//     initPositions[idx] = getCoords(el);
//   });
//
//   function getCoords(elem) {
//     const box = elem.getBoundingClientRect();
//
//     const body = document.body;
//     const docEl = document.documentElement;
//
//     const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
//     const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
//
//     const clientTop = docEl.clientTop || body.clientTop || 0;
//     const clientLeft = docEl.clientLeft || body.clientLeft || 0;
//
//     const top  = box.top +  scrollTop - clientTop;
//     const left = box.left + scrollLeft - clientLeft;
//
//     return { top: Math.round(top), left: Math.round(left) };
//   }
//
//   const scrollListener = (entry, targetStartPosition) => {
//     const {target} = entry;
//     const {height} = entry.rootBounds;
//     // const k = el.dataset.velocity || 0.3;
//     // const orientation = el.dataset.orientation;
//     // const action = el.dataset.action;
//     // const val = (window.scrollY - startScroll) * -1;
//
//     const diff = targetStartPosition.top - window.scrollY - height;
//
//     console.log(diff, height, targetStartPosition.top);
//
//     // if (diff > 0) {
//     //   // scroll down
//     //   console.log(diff);
//     target.style.transform = `translateY(${diff}px)`;
//     // } else {
//     //   //scroll up
//     //   console.log(diff);
//     //   target.style.transform = `translateY(${diff}px)`;
//     // }
//
//     // console.log(diff);
//
//     // window.scrollY()
//
//     // if (action === 'rotate') {
//     //   const scrolled = window.scrollY * k;
//     //   el.style.transform = `rotate(${scrolled % 360}deg)`;
//     // } else if (isHorizontal) {
//     //   const x = orientation === 'right' ? val * -1 : val;
//     //   el.style.transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},0,0,1)`;
//     // } else {
//
//     // }
//   };
//
//   const parallaxObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       const {target, isIntersecting} = entry;
//       const parallaxIdx = target.dataset.parallaxIdx;
//       const targetStartPosition = initPositions[parallaxIdx];
//
//       if (isIntersecting) {
//         console.log('enter');
//         callbacks[parallaxIdx] = () =>
//           window.requestAnimationFrame(() => scrollListener(entry, targetStartPosition));
//
//         window.addEventListener('scroll', callbacks[parallaxIdx]);
//         // window.scrollY;
//
//         // console.log(entry)
//         // const img = entry.target;
//         // img.src = img.dataset.src;
//         // img.classList.remove('lazy');
//         // parallaxObserver.unobserve(img);
//
//       } else {
//         console.log('leave');
//         // target.style.transform = '';
//         window.removeEventListener('scroll', callbacks[parallaxIdx]);
//       }
//     });
//   });
//
//   parallaxElements.forEach((el) => parallaxObserver.observe(el));
// })();
