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
document.querySelectorAll('.js-link')
  .forEach((link) => {
    link.addEventListener('click', (event) => {
      const category = event.target.dataset.category
      window.location.href = `home.html?query=${category}`
    })
  })