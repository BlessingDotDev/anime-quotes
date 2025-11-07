import { Anime } from "./endpoints.js";

const selectEle = document.getElementById('category');
selectEle.addEventListener('change', (e) => {
  const category = selectEle.value;
  getAnimeList(category)
})

getAnimeList('top/anime');

function getAnimeList(category) {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load',() => {
    const response = JSON.parse(xhr.response);
    handleResponse(response.data)
  })
  
  xhr.open('GET', `https://api.jikan.moe/v4/${category}`);
  xhr.send();
}

function handleResponse(response) {
  const animeList = response.map(animeDetails => new Anime(animeDetails));
  renderHTML(animeList);
}

function renderHTML(animeList) {
  let animeHTML = '';

  animeList.forEach((anime) => {
    animeHTML += `
      <a href="anime-quotes.html" class="anime-container">
        <img class="anime-cover-image" src="${anime.largeImage}" alt="" width="100%">

        <div class="overlay"></div>

        <div class="anime-info">
          <p class="anime-name">
            ${anime.title}
          </p>
          
          <div class="anime-stats">
            <p></p>
            <p class="ratings">${anime.score}</p>
            <p class="view">${anime.episodes}</p>
          </div>
        </div>
      
        <div class="tooltip">
          Click to View Anime quotes
        </div>
      </a>
    `;
  })

  document.querySelector('.js-anime-grid').
    innerHTML = animeHTML;
}