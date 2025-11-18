const inputElem = document.querySelector('.js-search-input');
const searchButton = document.querySelector('.js-search-box');


export const name = JSON.parse(localStorage.getItem('anime-name')) || [];

localStorage.removeItem('anime-name');

if (searchButton && inputElem) {
  searchButton.addEventListener('click', () => {
    
    const animeName = inputElem.value;
    name.push(animeName);
    
    localStorage.setItem('anime-name', JSON.stringify(name));
    window.location.href = 'home.html'
  })
}

