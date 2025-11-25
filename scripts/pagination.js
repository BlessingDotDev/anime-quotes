import { loadAnimeListFetch, loadSeachAnimeFetch } from "./endpoints.js";
import { renderHTML, paginationContainer, selectEle } from "./home.js";

let currentPage = 1;

export function createPagination(pagination) {
  const totalPages = pagination.last_visible_page;
  paginationContainer.innerHTML = '';

  //Prev Button
  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Prev';
  prevBtn.disabled = currentPage === 1;

  prevBtn.onclick = () => {
    const category = selectEle.value;
    currentPage --;

    if (name) {
      loadNameAnime(name, currentPage);
    } else {
      loadCategoryAnime(category, currentPage)
    }
  };
  paginationContainer.appendChild(prevBtn);

  //Page Numbers
  for (let i = 1; i <= totalPages && i <= 10; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    
    btn.onclick = () => {
      const category = selectEle.value;
      currentPage = i;

      if (name) {
        loadNameAnime(name, currentPage);
      } else {
        loadCategoryAnime(category, currentPage);
      }
    }
    paginationContainer.appendChild(btn);
  }

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = !pagination.has_next_page;

  nextBtn.onclick = () => {
    const category = selectEle.value;
    currentPage++;

    if (name) {
      loadNameAnime(name, currentPage);
    } else {
      loadCategoryAnime(category, currentPage);
    }
  };
  paginationContainer.appendChild(nextBtn);
}

async function loadCategoryAnime(category,currentPage) {
 await loadAnimeListFetch(category, currentPage);
  renderHTML();
}

async function loadNameAnime(name, currentPage) {
  await loadSeachAnimeFetch(name, currentPage);
  renderHTML();
}