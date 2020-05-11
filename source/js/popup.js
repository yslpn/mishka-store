// modal
const openModalBtn = document.querySelector('.js-open-popup');
const closeModalBtn = document.querySelector('.popup');
const modal = document.querySelector('.popup');
const body = document.querySelector('body');

function openModal() {
  modal.style.display = 'flex';
  body.style.overflow = 'hidden';
}

function closeModal(event) {
  if (event.target.className === 'popup') {
    modal.style.display = 'none';
    body.style.overflow = 'auto';
  }
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
