import {animeList, loadAnimeListFetch, loadSeachAnimeFetch} from "./endpoints.js";
import {toggleSearch} from "./header.js";
import { name } from "./index.js";


name && renderSearchAnime(name);

async function renderSearchAnime(name) {
  const animeName = name[0];
  await loadSeachAnimeFetch(animeName);
  renderHTML();
}

export function renderHTML() {
  let animeHTML = '';

  animeList.forEach((anime) => {
    animeHTML += `
      <a href="characters.html" class="anime-container">
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
        Click for Anime characters
        </div>
        </a>
        `;
      })

  document.querySelector('.js-anime-grid').
    innerHTML = animeHTML;
}

toggleSearch();
loadInitialAnime();

function loadInitialAnime() {
  const selectEle = document.getElementById('category');
  
  selectEle.addEventListener('change', () => {
    const category = selectEle.value;
    loadAnime(category);
  })

  async function loadAnime(category) {
    await loadAnimeListFetch(category);
    renderHTML();
  }
}

export const paginationContainer = document.querySelector('.js-pagination-container');
export const selectEle = document.getElementById('category');
