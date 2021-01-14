'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

///////////////////////////////////////
//! Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  // Page doesn't go back to top. (href="#")
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Nodelist. Add events all the element.
btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//! Scroll animation - button

btnScrollTo.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//! Scroll animation - Navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Mathcing strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//! Tabbed component

const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  // We have to choose button anyway.
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//! Nav menu animation

const nav = document.querySelector('.nav');

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//! Sticky navigation

const header = document.querySelector('header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  // Viewport
  threshold: 0,
  // When header get out of viewport.
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//? Bad practice
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Better way ; intersection API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, // viewport
//   threshold: [0, 0.2], // 10%
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

//! Revealing animation

//? //////////////////////////////////////////////////////
///? ---------------- Lecture ------------------------
//? //////////////////////////////////////////////////////

//! Select elements in DOM

// console.log(document.documentElement);
// // Selecting entire document
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// // Grab the first element with "header" class
// document.querySelectorAll('.header');
// console.log(document.querySelectorAll('.header'));
// // NodeList [ header.header ]
// // Grab all the elements with 'header' class
// // This is a NODE LIST.

// //? ///?? HTML colletion vs Node list ??//

// document.getElementById('section--1');
// document.getElementsByTagName('button');
// // HTML Collection
// // If DOM changes, this collection is also updated automatically
// console.log(document.getElementsByTagName('button'));
// // HTML Collection {0: button.btn--text, ...}

// document.getElementsByClassName('btn');
// // HTML Collection {0:.., 1:..}
// // querySelectorAll => Nodelist
// // getElementsByClassName => HTML Collection

//! Create & Insert elements
// const header = document.querySelector('.header');

// // insertAdjacentHTML
// // containerMovements.insertAdjacentHTML('afterbegin', html);

// const message = document.createElement('div');
// // It's not yet in the DOM
// message.classList.add('cookie-message');
// // message.textContent =
// //   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"></button>';
// //or
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
// // attach parameter to first child of element

// // header.append(message);
// // // It's a life-element which can't be two place simultaneously
// // // So message elemnt which was at the first place moves to last child position.

// // // To attach both place, We have to copy it
// // // =>  header.append(message.cloneNode(true));

// // header.before(message);
// // // Before header element
// // header.after(message);
// // // After header element

// //! Delete element
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   message.remove();
// });

// //! styles, attributes and classes

// //! - Setting style

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// // Applied to inline styles

// // - Read style

// console.log(message.style.backgroundColor);
// // rgb(55, 56, 61)
// // Only can read inline style

// // console.log(getComputedStyle(message));
// // return a object which contains all the css style rules.

// console.log(getComputedStyle(message).height);
// // 49px
// // return exact computed style represented on screen.
// // So it can change dynamically.

// // How to set coumputed style
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// // Setting CSS Variable
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// //! Attributes

// const logo = document.querySelector('.nav__logo');

// // - standard properties

// console.log(logo.alt);
// // Bankist logo
// console.log(logo.src);
// // http://127.0.0.1:5500/img/logo.png
// // Absolute URL
// console.log(logo.getAttribute('src'));
// // img/logo.png ; relative URL

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// // http://127.0.0.1:5500/index.html#
// console.log(link.getAttribute('href'));
// // #

// logo.alt = 'Beautiful Logo';

// // - Non-standard

// console.log(logo.getAttribute('designer'));
// // Jonas

// logo.setAttribute('company', 'Bankist');

// // - Data attribute

// console.log(logo.dataset.versionNumber);
// // 3.0

// // - classes

// logo.classList.add('a', 'b', 'c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('nav__logo');
// // return boolean

// logo.className = 'dontuse';
// // This will override all the exist class

/////////////////////////////////////////////////////
//! Scroll Animation

// const btnScrollTo = document.querySelector('.btn--scroll-to');

// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', e => {
//   // const s1coords = section1.getBoundingClientRect();

//   // // Describes all the information about size & position of element at the current viewport
//   // console.log(s1coords);
//   // // DOMRect {x:"..", y:"..", ...}

//   // // Describes position of X,Y scroll position
//   // console.log(
//   //   'Current scroll (x.y)',
//   //   window.pageXOffset,
//   //   '/',
//   //   window.pageYOffset
//   // );

//   // //? Describes current viewport size
//   // console.log(
//   //   'height/width viewport',
//   //   document.documentElement.clientHeight,
//   //   '/',
//   //   document.documentElement.clientWidth
//   // );

//   // //? Scroll animation

//   // // 1.
//   // // Scrolling;
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );

//   // // 2.
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   //3.
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

//! Type of events and handlers

// Event is a basically signal generated by DOM node
// No matter if we listen or handle events or not
// That events happen anyway.

// const alertH1 = e => {
//   alert('Add event listener: Great!');

//   // Remove handler
//   // It happens only one time now.
//   h1.removeEventListener('mouseenter', alertH1);
// };

// const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', alertH1);

// Handler inside HTML

{
  /* <h1 onclick='alert("html alert")'> */
}

// Without addEventListener: Old way

// h1.onmouseenter = e => {
//   alert('Add event listener: Great!');
// };

//! Capturing & Bubbling

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   // e.currentTarget === this : where handler is attached
//   // e.target : Exact place where event happens

//   // Stop propagation; bubbling
//   // e.stopPropagation();
//   // Now event doesn't go up to parent level
//   console.log(e.eventPhase);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target);
//   console.log(e.eventPhase);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target);
//     console.log(e.eventPhase);
//   },
//   true
// );

// // 캡처링=1, 타깃=2, 버블링=3

//! DOM Traversing

// const h1 = document.querySelector('h1');

// // - Going downwards : child

// console.log(h1.querySelectorAll('.highlight'));
// // NodeList [ span.highlight, span.highlight ]
// // Includes every elements under 'h1' with highlight class

// console.log(h1.childNodes);
// // NodeList(9) [ text, comment, elements ..  ]
// // property of NODE
// // All kinds from direct child.

// console.log(h1.children);
// // HTMLCollection {span, br, span ..only elements}
// // property of Element
// // Only direct child

// h1.firstElementChild.style.color = 'red';
// h1.lastElementChild.style.color = 'blue';

// // - Going upwards : parent

// console.log(h1.parentNode);
// // <div class="header__title">

// console.log(h1.parentElement);
// // <div class="header__title">

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// // Closest element that matches the provided selector string

// h1.closest('h1').style.background = 'var(--gradient-primary)';
// // Select element itself

// // - Sideway : siblings

// console.log(h1.previousElementSibling);
// // null : h1 is a first child
// console.log(h1.nextElementSibling);
// // <h4>

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// // HTMLCollection {..}

// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
// // Get all the siblings of element and do something.
