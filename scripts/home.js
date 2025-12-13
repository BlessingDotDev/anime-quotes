import {animeList, loadAnimeListFetch, loadSeachAnimeFetch} from "./endpoints.js";
import {toggleSearch, toggleMenu} from "./header.js";

loadByCategory();
loadByName();

export function renderHTML() {
  let animeHTML = '';

  animeList.forEach((anime) => {
    animeHTML += `
      <a href="characters.html?query=${anime.title}" class="anime-container">
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
toggleMenu();
loadInitialAnime();

const inputElemHome = document.querySelector('.js-search-input-home');
const searchButtonHome = document.querySelector('.js-search-box-home');

if (searchButtonHome) {
  searchButtonHome.addEventListener('click', () => {
    saveSearchValueHome();
  })

  inputElemHome.addEventListener('keydown', (event) => {
    event.key === 'Enter' && saveSearchValueHome();
  })
}

function saveSearchValueHome() {
  const animeName = inputElemHome.value;
  const encoded = encodeURIComponent(animeName);
  window.location.href = `home.html?search=${encoded}`
}

async function loadAnime(category) {
  await loadAnimeListFetch(category);
  renderHTML();
}
async function LoadSearchAnime(animeName) {
  await loadSeachAnimeFetch(animeName);
  renderHTML();
}

function loadInitialAnime() {
  const selectEle = document.getElementById('category');
  
  selectEle.addEventListener('change', () => {
    const category = selectEle.value;
    loadAnime(category);
  })
}


function loadByCategory() {
  const url = new URL(window.location.href);
  const categoryQuery = url.searchParams.get('query');
  
  if (categoryQuery) {
   loadAnime(categoryQuery)
  }
}

function loadByName() {
  const url = new URL(window.location.href);
  const searchAnime = url.searchParams.get('search');
  
  if (searchAnime) {
    LoadSearchAnime(searchAnime)
  }
}


export const paginationContainer = document.querySelector('.js-pagination-container');
export const selectEle = document.getElementById('category');
