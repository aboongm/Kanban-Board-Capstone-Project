const url = 'https://api.tvmaze.com/shows';
const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/st5awnig42N9i1c9g8rb/';
const appIDLikes = `${baseURL}likes/`;

const fetchShows = async (url) => {
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
                <button type="button"  class="mx-0 mt-0 mb-1 px-2 py-1 border text-center comment">Comments</button>
                </div>
            `;
      showList.insertAdjacentHTML('beforeend', showItem);
    });
  }
};

const updateLikes = async () => {
  fetchLikes(appIDLikes)
    .then((response) => response)
    .then((response) => {
      const keys = Object.keys(response);
      keys.forEach((key) => {
        const likes = document.querySelectorAll('.likes');
        [...likes].forEach((item) => {
          const showID = parseInt(item.previousElementSibling.lastElementChild.getAttribute('data-id'), 10);
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

const postLikes = () => {
  console.log('this is function for likes');
};

export { displayShows, updateLikes, postLikes };
