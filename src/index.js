import './index.css';
import {
  displayShows,
  updateLikes,
  postLikes,
  showDetails,
  createShowComment,
  displayShowComment,
} from '../modules/shows.js';
import Utilities from '../modules/utils.js';

const render = async () => {
  displayShows();
  updateLikes();
  postLikes();
};

render();

const modal = document.querySelector('#item-modal');

window.addEventListener('click', () => {
  const btns = [...document.querySelectorAll('.comment')];
  btns.forEach((modalBtn) => {
    modalBtn.addEventListener('click', async (event) => {
      if (event.target.id !== null) {
        // show modal
        modal.style.display = 'block';

        //= === show tv show details====
        const tvshowDetails = await showDetails(event.target.id);
        document.getElementById('tv-show-title').textContent = tvshowDetails.name;
        document
          .getElementById('tv-show-img')
          .setAttribute('src', tvshowDetails.image.medium);
        document.getElementById('show-id').setAttribute('data-id', event.target.id);
        document.getElementById(
          'summary',
        ).innerHTML = `${tvshowDetails.summary}`;

        // show genre
        const genres = document.getElementById('genres');
        genres.innerHTML = '';
        let pElement = '';
        tvshowDetails.genres.forEach((item) => {
          pElement += `<p>${item}</p>`;
        });
        genres.innerHTML = pElement;
        await displayShowComment(event.target.id);
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

// add comment
document.getElementById('add-comment').addEventListener('click', async () => {
  const id = document.getElementById('show-id').getAttribute('data-id');
  const username = document.getElementById('name').value;
  const comment = document.getElementById('insights').value;
  const sms = document.getElementById('message');

  if (username !== '' && id !== '' && comment !== '') {
    sms.style.display = 'block';
    createShowComment(id, username, comment);
    Utilities.cleanFormInput();
    sms.style.color = 'green';
    sms.textContent = '-Done';
    await displayShowComment(id);
  } else {
    sms.style.display = 'block';
    sms.style.color = 'red';
    sms.textContent = '-Fields required';
  }
});