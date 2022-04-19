import './index.css';

const searchShow = () => {
  const url = 'https://api.tvmaze.com/shows/1/episodes';
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      const result = jsonData.map((element) => element);
      console.log(result);
    });
};

searchShow();


