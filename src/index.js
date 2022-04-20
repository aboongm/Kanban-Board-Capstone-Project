import './index.css';
import {
  displayShows,
  showComments,
  showDetails,
} from '../modules/shows.js';

displayShows();

const modal = document.querySelector('#item-modal');

window.addEventListener('load', () => {
  const btns = [...document.querySelectorAll('.comment')];
  btns.forEach((modalBtn) => {
    modalBtn.addEventListener('click', async (event) => {
      if (event.target.id !== null) {
        // show modal
        modal.style.display = 'block';

        // show tv shows
        const tvshowDetails = await showDetails(event.target.id);
        document.getElementById('tv-show-title').textContent = tvshowDetails.name;
        document.getElementById('tv-show-img').setAttribute('src', tvshowDetails.image.medium);
        document.getElementById('type').textContent = tvshowDetails.type;
        document.getElementById('lang').textContent = tvshowDetails.language;

        const res = await showComments(event.target.id);
        const commentList = document.querySelector('.comment-list');
        commentList.innerHTML = '';
        let liElement = '';
        res.forEach((result) => {
          if (result === null) {
            liElement += ' <li>No comments for now</li>';
          }
          liElement += ` <li>${result.creation_date} ${result.username} ${result.comment}</li>`;
        });
        commentList.innerHTML = liElement;
      }
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