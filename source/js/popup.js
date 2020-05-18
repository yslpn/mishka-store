// modal
const openModalBtn = document.querySelectorAll('.js-open-popup');
const closeModalBtn = document.querySelector('.popup');
const modal = document.querySelector('.popup');
const body = document.querySelector('body');

function openModal(event) {
  event.preventDefault();
  modal.style.display = 'flex';
  body.style.overflow = 'hidden';
}

function closeModal(event) {
  if (event.target.className === 'popup') {
    modal.style.display = 'none';
    body.style.overflow = 'auto';
  }
}

openModalBtn.forEach(element => {
  element.addEventListener('click', openModal);
});

closeModalBtn.addEventListener('click', closeModal);
