const itemCounter = (shows) => {
  const counter = document.querySelector('.item-counter');
  counter.innerText = `TV Shows(${shows.length})`;
};

export default itemCounter;