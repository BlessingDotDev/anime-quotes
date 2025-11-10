export function toggleSearch() {
  const searchIcon = document.querySelector('.js-search-icon');

  searchIcon.addEventListener('click', () => {
    const searchInput = document.querySelector('.js-clicked-search');
    searchInput.classList.toggle('clicked-search');
  })
}