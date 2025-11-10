import {getAnimeList} from "./endpoints.js";
import {toggleSearch} from "./header.js";
import {renderPagination} from "./Utils/pagination.js"

loadInitialAnime()
getAnimeList('top/anime');
toggleSearch();

export function renderHTML(animeList) {
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
      
  renderPagination();
}


function loadInitialAnime() {
  const selectEle = document.getElementById('category');
  selectEle.addEventListener('change', () => {
    const category = selectEle.value;
    getAnimeList(category)
  })
}