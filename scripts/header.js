export function toggleSearch() {
  const searchIcon = document.querySelector('.js-search-icon');

  searchIcon.addEventListener('click', () => {
    const searchInput = document.querySelector('.js-clicked-search');
    searchInput.classList.toggle('clicked-search');
  })
}

export function toggleMenu() {
  const menuIcon = document.querySelector('.js-menu-icon');

  menuIcon.addEventListener('click', () => {
    const menuDropdown = document.querySelector('.js-menu-dropdown');
    menuDropdown.classList.toggle('menu-open');
  })
}