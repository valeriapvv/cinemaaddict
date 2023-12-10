export const getSortTemplate = (sortType, currentSortType) => `
  <ul class="sort">
    ${Object.values(sortType).map((type) => `
      <li>
        <a href="#"
          class="sort__button ${type === currentSortType ? 'sort__button--active' : ''}"
          data-sort-type="${type}"
        >
          Sort by ${type.toLowerCase()}
        </a>
      </li>
    `).join('')}
  </ul>
`;
