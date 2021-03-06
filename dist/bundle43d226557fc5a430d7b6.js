/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/apiObject.js":
/*!******************************!*\
  !*** ./modules/apiObject.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LikeObj)
/* harmony export */ });
class LikeObj {
  constructor() {
    this.item_id = null;
    this.likes = 0;
  }

  static likes = [];
}


/***/ }),

/***/ "./modules/counter.js":
/*!****************************!*\
  !*** ./modules/counter.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayItemCounted": () => (/* binding */ displayItemCounted),
/* harmony export */   "itemCounter": () => (/* binding */ itemCounter)
/* harmony export */ });
const itemCounter = (item) => item.length;

const displayItemCounted = (shows) => {
  const counter = document.querySelector('.item-counter');
  counter.innerText = `TV Shows(${itemCounter(shows)})`;
};




/***/ }),

/***/ "./modules/shows.js":
/*!**************************!*\
  !*** ./modules/shows.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShowComment": () => (/* binding */ createShowComment),
/* harmony export */   "displayShowComment": () => (/* binding */ displayShowComment),
/* harmony export */   "displayShows": () => (/* binding */ displayShows),
/* harmony export */   "fetchShows": () => (/* binding */ fetchShows),
/* harmony export */   "postLikes": () => (/* binding */ postLikes),
/* harmony export */   "showDetails": () => (/* binding */ showDetails),
/* harmony export */   "updateLikes": () => (/* binding */ updateLikes)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./modules/utils.js");
/* harmony import */ var _apiObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiObject.js */ "./modules/apiObject.js");
/* harmony import */ var _counter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./counter.js */ "./modules/counter.js");




const url = 'https://api.tvmaze.com/shows';
const appIDLikes = `${_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].baseUrl}apps/st5awnig42N9i1c9g8rb/likes`;

const fetchShows = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) return await response.json();
    throw new Error(`HTTP error: ${response.status}`);
  } catch (e) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].exception(e);
  }
};

const fetchLikes = async (appIDLikes) => {
  try {
    const response = await fetch(appIDLikes);
    if (response.ok) return await response.json();
    throw new Error(`HTTP error: ${response.status}`);
  } catch (e) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].exception(e);
  }
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
  (0,_counter_js__WEBPACK_IMPORTED_MODULE_2__.displayItemCounted)(shows);
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
  const likeObj = new _apiObject_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

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
      `${_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].showBaseUrl}${id}`,
      requestOptions,
    );
    if (response.ok) return await response.json();
    throw new Error(`HTTP error: ${response.status}`);
  } catch (e) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].exception(e);
  }
};

const showComments = async (id) => {
  try {
    const url = `${_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].baseUrl}apps/st5awnig42N9i1c9g8rb/comments?item_id=${id}`;
    const requestOptions = { method: 'GET' };
    const response = await fetch(url, requestOptions);
    if (response.ok && response.status !== 400) {
      return await response.json();
    }

    return [];
  } catch (e) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].exception(e);
  }
};

const createShowComment = async (id, username, comment) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getHeader(),
      body: _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getParams(id, username, comment),
    };
    const response = await fetch(
      `${_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].baseUrl}apps/st5awnig42N9i1c9g8rb/comments`,
      requestOptions,
    );
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`HTTP error: ${response.status}`);
  } catch (e) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].exception(e);
  }
};

const displayShowComment = async (id) => {
  //= === show comment=====
  const res = await showComments(id);
  // console.log(res)
  document.getElementById(
    'no-of-comments',
  ).textContent = `(${_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].showCommentCounter(res)})`;
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




/***/ }),

/***/ "./modules/utils.js":
/*!**************************!*\
  !*** ./modules/utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Utilities)
/* harmony export */ });
class Utilities {
    static baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

    static showBaseUrl ='https://api.tvmaze.com/shows/'

    static exception = (message) => message

    static getHeader() {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return headers;
    }

     static getParams = (id, username, comment) => {
       const urlencoded = new URLSearchParams();
       urlencoded.append('item_id', `${id}`);
       urlencoded.append('username', `${username}`);
       urlencoded.append('comment', `${comment}`);
       return urlencoded;
     }

      static cleanFormInput = () => {
        document.getElementById('name').value = '';
        document.getElementById('insights').value = '';
      }

    static showCommentCounter = (commentList) => {
      if (commentList.length === 0) {
        return 0;
      }
      return commentList.length;
    }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.css":
/*!****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.css ***!
  \****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../asset/logo.png */ "./asset/logo.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nh3 {\n  font-size: 24px;\n  text-align: center;\n  margin: 2px 0 2px;\n}\n\nhtml {\n  font-family: \"Roboto\", serif;\n}\n\nbody {\n  background: white;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 15px;\n  font-weight: normal;\n  line-height: 18px;\n  background-image: linear-gradient(to left, #2f4858, #33658a);\n}\n\n.logo {\n  padding: 14px 0;\n  text-align: center;\n  height: 70px;\n  width: 70px;\n  cursor: pointer;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 80px 80px;\n}\n\nheader {\n  padding: 10px;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\nnav {\n  width: 100%;\n}\n\nnav ul {\n  padding-top: 19px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n  height: inherit;\n}\n\nul li.active {\n  border-bottom: 2px solid grey;\n}\n\nul li {\n  list-style: none;\n  margin-right: 12px;\n  cursor: pointer;\n}\n\nfooter {\n  position: fixed !important;\n  color: white;\n  background: #2f4858;\n  font-size: 16px;\n  font-weight: 300;\n  left: 0 !important;\n  bottom: 0 !important;\n  width: 100%;\n  text-align: left;\n}\n\n.footer-text {\n  font-size: 12px !important;\n  font-family: roboto, serif;\n  color: white;\n  font-weight: 200 !important;\n  margin: 0;\n}\n\n.menu-item {\n  font-family: roboto, serif;\n  color: white;\n}\n\nimg {\n  width: 136px;\n  height: auto;\n}\n\n.icon {\n  font-size: 16px;\n  color: white;\n}\n\n.heart:hover {\n  cursor: pointer;\n  color: rgb(180, 179, 179);\n}\n\n.red {\n  color: crimson;\n}\n\n.showItem {\n  background-color: #2f4858;\n}\n\n.name,\n.comment {\n  font-size: 12px;\n  font-weight: normal;\n  color: white;\n  inline-size: 110px;\n  overflow-wrap: break-word;\n}\n\n.comment {\n  cursor: pointer;\n  background-color: transparent;\n}\n\n.likes {\n  font-size: 12px;\n  font-weight: normal;\n  color: white;\n  text-align: right;\n}\n\n/* modal */\n.modal {\n  display: none;\n  position: fixed;\n  z-index: 1;\n  padding-top: 20px;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgba(58, 69, 124, 0.4);\n  padding-bottom: 100px;\n}\n\n.card-container {\n  background-color: #fff;\n  width: 60%;\n  height: 100vh;\n  margin: auto;\n  /* padding: 16px; */\n  border: none;\n}\n\n.header-container {\n  margin: auto;\n  border: none;\n}\n\n.close {\n  color: #aaa;\n  font-size: 28px;\n  font-weight: bold;\n  /* margin-top: 12px; */\n  margin-right: 10px;\n}\n\n.close:hover,\n.close:focus {\n  color: #000;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.modal-header {\n  display: flex;\n  top: 0;\n  justify-content: flex-end;\n  position: relative;\n  margin-top: 0;\n  padding: 3px;\n}\n\n.modal-body {\n  width: 100%;\n  background-color: #fff;\n  margin: auto;\n}\n\n.image-container {\n  margin: 0 auto;\n  padding: 0;\n  width: 400px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.content {\n  display: flex;\n  flex-direction: column;\n}\n\n.modal-body img {\n  text-align: center;\n  width: 60%;\n  height: 10%;\n}\n\nul.comment-list {\n  width: 100%;\n}\n\nul.comment-list li {\n  border: 1px solid rgb(249, 246, 246);\n  margin-top: 12px;\n  padding: 12px;\n}\n\nul.menu li:hover {\n  border-bottom: 2px solid grey;\n}\n\nul.comment-list li:hover {\n  text-decoration: none;\n}\n\n.form-container {\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n}\n\nform button,\ntextarea,\ninput[type=text] {\n  margin-bottom: 24px;\n  padding: 10px;\n}\n\n.genres {\n  display: flex;\n  justify-content: space-around;\n  height: 20px;\n  font-weight: bold;\n}\n\n#message {\n  color: green;\n  height: 10px;\n  /* font-weight: bold; */\n  display: none;\n}\n\n@media screen and (min-width: 1024px) and (max-height: 600px) {\n  .card-container {\n    background-color: #fff;\n    width: 60%;\n    height: 100vh;\n    margin: auto;\n    /* padding: 16px; */\n    border: none;\n  }\n\n  h3 {\n    font-size: 16px;\n    margin: 10px 0 10px;\n  }\n\n  .modal-body img {\n    width: 50%;\n    padding-top: 0;\n    height: 5%;\n  }\n\n  ul.comment-list li {\n    border: 1px solid rgb(249, 246, 246);\n    margin-top: 4px;\n    padding: 7px;\n  }\n\n  .content {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n\n  .form-container {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n  }\n}", "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAAA;EACE,SAAA;EACA,UAAA;EACA,sBAAA;AACF;;AAEA;EACE,eAAA;EACA,kBAAA;EACA,iBAAA;AACF;;AAEA;EACE,4BAAA;AACF;;AAEA;EACE,iBAAA;EACA,yCAAA;EACA,eAAA;EACA,mBAAA;EACA,iBAAA;EACA,4DAAA;AACF;;AAEA;EACE,eAAA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;EACA,eAAA;EACA,yDAAA;EACA,4BAAA;EACA,2BAAA;EACA,0BAAA;AACF;;AAEA;EACE,aAAA;EACA,WAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;AACF;;AAEA;EACE,WAAA;AACF;;AAEA;EACE,iBAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,6BAAA;EACA,eAAA;AACF;;AAEA;EACE,6BAAA;AACF;;AAEA;EACE,gBAAA;EACA,kBAAA;EACA,eAAA;AACF;;AAEA;EACE,0BAAA;EACA,YAAA;EACA,mBAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,oBAAA;EACA,WAAA;EACA,gBAAA;AACF;;AAEA;EACE,0BAAA;EACA,0BAAA;EACA,YAAA;EACA,2BAAA;EACA,SAAA;AACF;;AAEA;EACE,0BAAA;EACA,YAAA;AACF;;AAEA;EACE,YAAA;EACA,YAAA;AACF;;AAEA;EACE,eAAA;EACA,YAAA;AACF;;AAEA;EACE,eAAA;EACA,yBAAA;AACF;;AAEA;EACE,cAAA;AACF;;AAEA;EACE,yBAAA;AACF;;AAEA;;EAEE,eAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;EACA,yBAAA;AACF;;AAEA;EACE,eAAA;EACA,6BAAA;AACF;;AAEA;EACE,eAAA;EACA,mBAAA;EACA,YAAA;EACA,iBAAA;AACF;;AAEA,UAAA;AACA;EACE,aAAA;EACA,eAAA;EACA,UAAA;EACA,iBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;EACA,wCAAA;EACA,qBAAA;AACF;;AAEA;EACE,sBAAA;EACA,UAAA;EACA,aAAA;EACA,YAAA;EAEA,mBAAA;EACA,YAAA;AAAF;;AAGA;EACE,YAAA;EACA,YAAA;AAAF;;AAGA;EACE,WAAA;EACA,eAAA;EACA,iBAAA;EAEA,sBAAA;EACA,kBAAA;AADF;;AAIA;;EAEE,WAAA;EACA,qBAAA;EACA,eAAA;AADF;;AAIA;EACE,aAAA;EACA,MAAA;EACA,yBAAA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;AADF;;AAIA;EACE,WAAA;EACA,sBAAA;EACA,YAAA;AADF;;AAIA;EACE,cAAA;EACA,UAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AADF;;AAIA;EACE,aAAA;EACA,sBAAA;AADF;;AAIA;EACE,kBAAA;EACA,UAAA;EACA,WAAA;AADF;;AAIA;EACE,WAAA;AADF;;AAIA;EACE,oCAAA;EACA,gBAAA;EACA,aAAA;AADF;;AAIA;EACE,6BAAA;AADF;;AAIA;EACE,qBAAA;AADF;;AAIA;EACE,UAAA;EACA,aAAA;EACA,sBAAA;EACA,8BAAA;AADF;;AAIA;EACE,aAAA;EACA,sBAAA;AADF;;AAIA;;;EAGE,mBAAA;EACA,aAAA;AADF;;AAIA;EACE,aAAA;EACA,6BAAA;EACA,YAAA;EACA,iBAAA;AADF;;AAIA;EACE,YAAA;EACA,YAAA;EAEA,uBAAA;EACA,aAAA;AAFF;;AAKA;EACE;IACE,sBAAA;IACA,UAAA;IACA,aAAA;IACA,YAAA;IAEA,mBAAA;IACA,YAAA;EAHF;;EAMA;IACE,eAAA;IACA,mBAAA;EAHF;;EAMA;IACE,UAAA;IACA,cAAA;IACA,UAAA;EAHF;;EAMA;IACE,oCAAA;IACA,eAAA;IACA,YAAA;EAHF;;EAMA;IACE,aAAA;IACA,8BAAA;EAHF;;EAMA;IACE,aAAA;IACA,sBAAA;IACA,8BAAA;EAHF;AACF","sourcesContent":["* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nh3 {\n  font-size: 24px;\n  text-align: center;\n  margin: 2px 0 2px;\n}\n\nhtml {\n  font-family: \"Roboto\", serif;\n}\n\nbody {\n  background: white;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 15px;\n  font-weight: normal;\n  line-height: 18px;\n  background-image: linear-gradient(to left, #2f4858, #33658a);\n}\n\n.logo {\n  padding: 14px 0;\n  text-align: center;\n  height: 70px;\n  width: 70px;\n  cursor: pointer;\n  background-image: url(\"../asset/logo.png\");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 80px 80px;\n}\n\nheader {\n  padding: 10px;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\nnav {\n  width: 100%;\n}\n\nnav ul {\n  padding-top: 19px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n  height: inherit;\n}\n\nul li.active {\n  border-bottom: 2px solid grey;\n}\n\nul li {\n  list-style: none;\n  margin-right: 12px;\n  cursor: pointer;\n}\n\nfooter {\n  position: fixed !important;\n  color: white;\n  background: #2f4858;\n  font-size: 16px;\n  font-weight: 300;\n  left: 0 !important;\n  bottom: 0 !important;\n  width: 100%;\n  text-align: left;\n}\n\n.footer-text {\n  font-size: 12px !important;\n  font-family: roboto, serif;\n  color: white;\n  font-weight: 200 !important;\n  margin: 0;\n}\n\n.menu-item {\n  font-family: roboto, serif;\n  color: white;\n}\n\nimg {\n  width: 136px;\n  height: auto;\n}\n\n.icon {\n  font-size: 16px;\n  color: white;\n}\n\n.heart:hover {\n  cursor: pointer;\n  color: rgb(180, 179, 179);\n}\n\n.red {\n  color: crimson;\n}\n\n.showItem {\n  background-color: #2f4858;\n}\n\n.name,\n.comment {\n  font-size: 12px;\n  font-weight: normal;\n  color: white;\n  inline-size: 110px;\n  overflow-wrap: break-word;\n}\n\n.comment {\n  cursor: pointer;\n  background-color: transparent;\n}\n\n.likes {\n  font-size: 12px;\n  font-weight: normal;\n  color: white;\n  text-align: right;\n}\n\n/* modal */\n.modal {\n  display: none;\n  position: fixed;\n  z-index: 1;\n  padding-top: 20px;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgb(58 69 124 / 40%);\n  padding-bottom: 100px;\n}\n\n.card-container {\n  background-color: #fff;\n  width: 60%;\n  height: 100vh;\n  margin: auto;\n\n  /* padding: 16px; */\n  border: none;\n}\n\n.header-container {\n  margin: auto;\n  border: none;\n}\n\n.close {\n  color: #aaa;\n  font-size: 28px;\n  font-weight: bold;\n\n  /* margin-top: 12px; */\n  margin-right: 10px;\n}\n\n.close:hover,\n.close:focus {\n  color: #000;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.modal-header {\n  display: flex;\n  top: 0;\n  justify-content: flex-end;\n  position: relative;\n  margin-top: 0;\n  padding: 3px;\n}\n\n.modal-body {\n  width: 100%;\n  background-color: #fff;\n  margin: auto;\n}\n\n.image-container {\n  margin: 0 auto;\n  padding: 0;\n  width: 400px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.content {\n  display: flex;\n  flex-direction: column;\n}\n\n.modal-body img {\n  text-align: center;\n  width: 60%;\n  height: 10%;\n}\n\nul.comment-list {\n  width: 100%;\n}\n\nul.comment-list li {\n  border: 1px solid rgb(249, 246, 246);\n  margin-top: 12px;\n  padding: 12px;\n}\n\nul.menu li:hover {\n  border-bottom: 2px solid grey;\n}\n\nul.comment-list li:hover {\n  text-decoration: none;\n}\n\n.form-container {\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n}\n\nform button,\ntextarea,\ninput[type=\"text\"] {\n  margin-bottom: 24px;\n  padding: 10px;\n}\n\n.genres {\n  display: flex;\n  justify-content: space-around;\n  height: 20px;\n  font-weight: bold;\n}\n\n#message {\n  color: green;\n  height: 10px;\n\n  /* font-weight: bold; */\n  display: none;\n}\n\n@media screen and (min-width: 1024px) and (max-height: 600px) {\n  .card-container {\n    background-color: #fff;\n    width: 60%;\n    height: 100vh;\n    margin: auto;\n\n    /* padding: 16px; */\n    border: none;\n  }\n\n  h3 {\n    font-size: 16px;\n    margin: 10px 0 10px;\n  }\n\n  .modal-body img {\n    width: 50%;\n    padding-top: 0;\n    height: 5%;\n  }\n\n  ul.comment-list li {\n    border: 1px solid rgb(249, 246, 246);\n    margin-top: 4px;\n    padding: 7px;\n  }\n\n  .content {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n\n  .form-container {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./asset/logo.png":
/*!************************!*\
  !*** ./asset/logo.png ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6371e5e047faf2365071.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bundle": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _modules_shows_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/shows.js */ "./modules/shows.js");
/* harmony import */ var _modules_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/utils.js */ "./modules/utils.js");




const render = async () => {
  (0,_modules_shows_js__WEBPACK_IMPORTED_MODULE_1__.displayShows)();
  (0,_modules_shows_js__WEBPACK_IMPORTED_MODULE_1__.updateLikes)();
  (0,_modules_shows_js__WEBPACK_IMPORTED_MODULE_1__.postLikes)();
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
        const tvshowDetails = await (0,_modules_shows_js__WEBPACK_IMPORTED_MODULE_1__.showDetails)(event.target.id);
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
        await (0,_modules_shows_js__WEBPACK_IMPORTED_MODULE_1__.displayShowComment)(event.target.id);
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
    (0,_modules_shows_js__WEBPACK_IMPORTED_MODULE_1__.createShowComment)(id, username, comment);
    _modules_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].cleanFormInput();
    sms.style.color = 'green';
    sms.textContent = '-Done';
    await (0,_modules_shows_js__WEBPACK_IMPORTED_MODULE_1__.displayShowComment)(id);
  } else {
    sms.style.display = 'block';
    sms.style.color = 'red';
    sms.textContent = '-Fields required';
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle43d226557fc5a430d7b6.js.map