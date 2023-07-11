export const getFilmsBlockTemplate = ({
  blockClassName = '',
  title,
  isVisibleTitle = false,
} = {}) => `
  <section class="films-list ${blockClassName}">
    <h2
      class="films-list__title ${!isVisibleTitle ? 'visually-hidden' : ''}"
    >
      ${title}
    </h2>
  </section>
`;
