import {animeList, loadAnimeListFetch} from "./endpoints.js";
import {toggleSearch} from "./header.js";
import { name } from "./index.js";

toggleSearch();
loadInitialAnime();

/*

if (name) {
  const animeName = name[0];
  
  new Promise((resolve) => {
    loadSeachAnime(animeName, () => {
      resolve()
    })
  }).then(() => {
    renderHTML();
   // window.alert(`Site still in progress.`);
  })

} 

*/

function renderHTML() {
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

async function loadAnime(category) {
  await loadAnimeListFetch(category);
  renderHTML();
}

function loadInitialAnime() {
  const selectEle = document.getElementById('category');
  
  selectEle.addEventListener('change', () => {
    const category = selectEle.value;
    loadAnime(category);
  })
}

const paginationContainer = document.querySelector('.js-pagination-container');

let currentPage = 1;

export function createPagination(pagination) {

  const totalPages = pagination.last_visible_page;
  paginationContainer.innerHTML = '';

  //Prev Button
  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Prev';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    const selectEle = document.getElementById('category');

    const category = selectEle.value;
    currentPage --,
    loadAnimeList(category, renderHTML, currentPage)
  };
  paginationContainer.appendChild(prevBtn);

  //Page Numbers
  for (let i = 1; i <= totalPages && i <= 10; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.onclick = () => {
       const selectEle = document.getElementById('category');
      const category = selectEle.value;
      currentPage = i;
      loadAnimeList(category, renderHTML, i);
    }

    paginationContainer.appendChild(btn);
  }

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = !pagination.has_next_page;
  nextBtn.onclick = () => {
    const selectEle = document.getElementById('category');

    const category = selectEle.value;
    currentPage++;
    loadAnimeList(category, renderHTML,currentPage)
  };
  paginationContainer.appendChild(nextBtn);
}
  