const inputElem = document.querySelector('.js-search-input');
const searchButton = document.querySelector('.js-search-box');

if (searchButton) {
  searchButton.addEventListener('click', () => {
    saveSearchValue();
  })

  inputElem.addEventListener('keydown', (event) => {
    event.key === 'Enter' && saveSearchValue();
  })
}

function saveSearchValue() {

  const animeName = inputElem.value;
  const encoded = encodeURIComponent(animeName);
   window.location.href = `home.html?search=${encoded}`
}

// links

const trandingLink = document.querySelector('.js-tranding-link');
const recentLink = document.querySelector('.js-recent-link');
const homeLink = document.querySelector('.js-home-link');
const newLink = document.querySelector('.js-new-link');

if (homeLink) {
  homeLink.addEventListener('click', (event) => {
    const category = event.target.dataset.category
    window.location.href = `home.html?query=${category}`
  })
}

if (trandingLink) {
  trandingLink.addEventListener('click', (event) => {
    const category = event.target.dataset.category
    window.location.href = `home.html?query=${category}`
  })
}

if (newLink) {
  newLink.addEventListener('click', (event) => {
    const category = event.target.dataset.category
    window.location.href = `home.html?query=${category}`
  })
}

if (recentLink) {
  recentLink.addEventListener('click', (event) => {
    const category = event.target.dataset.category
    window.location.href = `home.html?query=${category}`
  })
}