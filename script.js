'use strict';

///////////////////////////////////////
// Modal window

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

/////////////////////////////////////////////////////////
///! ---------------- Lecture ------------------------

//! Select elements in DOM

console.log(document.documentElement);
// Selecting entire document
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
// Grab the first element with "header" class
document.querySelectorAll('.header');
console.log(document.querySelectorAll('.header'));
// NodeList [ header.header ]
// Grab all the elements with 'header' class
// This is a NODE LIST.

//? ///?? HTML colletion vs Node list ??//

document.getElementById('section--1');
document.getElementsByTagName('button');
// HTML Collection
// If DOM changes, this collection is also updated automatically
console.log(document.getElementsByTagName('button'));
// HTML Collection {0: button.btn--text, ...}

document.getElementsByClassName('btn');
// HTML Collection {0:.., 1:..}
// querySelectorAll => Nodelist
// getElementsByClassName => HTML Collection

//! Create & Insert elements

// insertAdjacentHTML
// containerMovements.insertAdjacentHTML('afterbegin', html);

const message = document.createElement('div');
// It's not yet in the DOM
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"></button>';
//or
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message);
// attach parameter to first child of element

header.append(message);
// It's a life-element which can't be two place simultaneously
// So message elemnt which was at the first place moves to last child position.

// To attach both place, We have to copy it
// =>  header.append(message.cloneNode(true));

header.before(message);
// Before header element
header.after(message);
// After header element

//! Delete element

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});
