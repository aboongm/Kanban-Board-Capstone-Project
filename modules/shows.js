import Utilities from './utils.js';
import LikeObj from './apiObject.js';
import displayItemCounted from './counter.js';

const url = 'https://api.tvmaze.com/shows';
const appIDLikes = `${Utilities.baseUrl}apps/st5awnig42N9i1c9g8rb/likes`;

const fetchShows = async () => {
  const response = await fetch(url);
  const result = response.json();
  return result;
};

const fetchLikes = async (appIDLikes) => {
  const response = await fetch(appIDLikes);
  const result = response.json();
  return result;
};

const displayShows = async () => {
  const showList = document.querySelector('.tvshow-list');
  const shows = await fetchShows(url).then((result) => result);

  if (shows.length !== 0) {
    showList.innerHTML = '';
    shows.forEach((element, index) => {
      const showItem = `
            <div class="showItem mx-5 my-2 d-flex flex-column align-items-center justify-content-center">
                <img src="${element.image.medium}" alt="show">
                <div class="d-flex align-items-center justify-content-between w-100">
                    <h6 class="m-0 px-1 py-2 name">${element.name}</h6>
                    <i data-id=${index} class="heart fa-solid fa-heart icon px-1"></i>
                </div>
                <p class="m-0 px-1 pt-0 pb-1 likes w-100">Likes</p>
                <button type="button" id="${element.id}"  class="mx-0 mt-0 mb-1 px-2 py-1 border text-center comment">Comments</button>
                </div>
            `;
      showList.insertAdjacentHTML('beforeend', showItem);
    });
  }
  displayItemCounted(shows);
};

const updateLikes = async () => {
  fetchLikes(appIDLikes)
    .then((response) => response)
    .then((response) => {
      const keys = Object.keys(response);
      keys.forEach((key) => {
        const likes = document.querySelectorAll('.likes');
        [...likes].forEach((item) => {
          const showID = parseInt(
            item.previousElementSibling.lastElementChild.getAttribute(
              'data-id',
            ),
            10,
          );
          if (response[key].item_id === showID) {
            item.innerText = `${response[key].likes} Likes`;
            if (response[key].likes > 0) {
              item.previousElementSibling.lastElementChild.classList.add('red');
            }
          }
        });
      });
    });
};

const postLikes = async () => {
  const shows = await fetchShows(url).then((result) => result);
  const clickLikes = document.querySelectorAll('.heart');
  const likeObj = new LikeObj();

  if (shows.length !== 0) {
    [...clickLikes].forEach((element) => {
      element.addEventListener('click', (e) => {
        likeObj.item_id = parseInt(e.target.getAttribute('data-id'), 10);
        fetch(appIDLikes, {
          method: 'POST',
          body: JSON.stringify(likeObj),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });

        const totalLikes = e.target.parentElement.nextElementSibling;
        fetchLikes(appIDLikes)
          .then((response) => response)
          .then((response) => {
            const keys = Object.keys(response);
            keys.forEach((key) => {
              if (response[key].item_id === likeObj.item_id) {
                totalLikes.innerText = `${response[key].likes} Likes`;
              }
            });
          });
      });
    });
  }
};

const showDetails = async (id) => {
  try {
    const requestOptions = { method: 'GET' };
    const response = await fetch(
      `${Utilities.showBaseUrl}${id}`,
      requestOptions,
    );
    if (response.ok) return await response.json();
    throw new Error(`HTTP error: ${response.status}`);
  } catch (e) {
    return Utilities.exception(e);
  }
};

const showComments = async (id) => {
  try {
    const url = `${Utilities.baseUrl}apps/st5awnig42N9i1c9g8rb/comments?item_id=${id}`;
    const requestOptions = { method: 'GET' };
    const response = await fetch(url, requestOptions);
    if (response.ok && response.status !== 400) {
      return await response.json();
    }

    return [];
  } catch (e) {
    return Utilities.exception(e);
  }
};

const createShowComment = async (id, username, comment) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: Utilities.getHeader(),
      body: Utilities.getParams(id, username, comment),
    };
    const response = await fetch(`${Utilities.baseUrl}apps/st5awnig42N9i1c9g8rb/comments`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`HTTP error: ${response.status}`);
  } catch (e) {
    return Utilities.exception(e);
  }
};

const displayShowComment = async (id) => {
  //= === show comment=====
  const res = await showComments(id);
  // console.log(res)
  document.getElementById('no-of-comments').textContent = `(${Utilities.showCommentCounter(res)})`;
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
};

export {
  fetchShows,
  displayShows,
  updateLikes,
  postLikes,
  showDetails,
  createShowComment,
  displayShowComment,
};
