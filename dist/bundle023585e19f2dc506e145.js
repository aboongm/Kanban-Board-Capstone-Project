/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

/******/ })()
;
//# sourceMappingURL=bundle023585e19f2dc506e145.js.map