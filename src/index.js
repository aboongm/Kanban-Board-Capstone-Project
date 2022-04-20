import './index.css';
import { displayShows, updateLikes, postLikes } from '../modules/shows.js';

const render = async () => {
  displayShows();
  updateLikes();
  postLikes();
};

render();

const modal = document.querySelector('#item-modal');

window.addEventListener('load', () => {
  const btns = [...document.querySelectorAll('.comment')];
  btns.forEach((modalBtn) => {
    modalBtn.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  });
});

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

document.getElementsByClassName('close')[0].onclick = () => {
  modal.style.display = 'none';
};
