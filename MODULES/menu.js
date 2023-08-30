const list = document.querySelector('#list');
const add = document.querySelector('#new');
const contact = document.querySelector('#contact');
const addSection = document.querySelector('.contact-form');
const listSection = document.querySelector('.list-parts');
const contactSection = document.querySelector('.contact');

add.addEventListener('click', () => {
  addSection.style.display = 'flex';
  listSection.style.display = 'none';
  contactSection.style.display = 'none';
});

list.addEventListener('click', () => {
  addSection.style.display = 'none';
  listSection.style.display = 'flex';
  contactSection.style.display = 'none';
});

contact.addEventListener('click', () => {
  contactSection.style.display = 'flex';
  listSection.style.display = 'none';
  addSection.style.display = 'none';
});

export {
  list, add, contact, addSection, listSection, contactSection,
};