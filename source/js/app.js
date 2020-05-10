const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');

  }
});

// no js
navMain.classList.remove('main-nav--opened');
navMain.classList.add('main-nav--closed');


// modal
const FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
const openModalBtn = document.querySelector('.open-popup');
const closeModalBtn = document.querySelector('.popup');
const modal = document.querySelector('.popup');
const main = document.querySelector('main');
const body = document.querySelector('body');

function openModal() {
  modal.style.display = 'flex';
  body.style.overflow = 'hidden';
  modal.querySelector(FOCUSABLE_SELECTORS).focus();
  const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
  focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
  modal.removeAttribute('aria-hidden');
  main.setAttribute('aria-hidden', 'true');
}

function closeModal(event) {
  if (event.target.className === 'popup') {
    modal.style.display = 'none';
    body.style.overflow = 'auto';
    const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach(el => el.removeAttribute('tabindex'));
    modal.setAttribute('aria-hidden', 'true');
    main.removeAttribute('aria-hidden');
    openModalBtn.focus();
  }
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
