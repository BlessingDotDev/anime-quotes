export function renderPagination() {
  const ulElement = document.querySelector('.pagination');

  ulElement.innerHTML = `
    <li>&lt;</li>
    <li class="current-page">1</li>
    <li>2</li>
    <li>3</li>
    <li>&gt;</li>
  `
}