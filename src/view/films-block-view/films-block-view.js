import AbstractView from '../../framework/abstract-view.js';

const DEFAULT_TITLE = 'All movies. Upcoming';

const getFilmsBlockTemplate = ({
  blockClassName = '',
  title,
  isVisibleTitle = false,
} = {}) => `
  <section class="films-list ${blockClassName}">
    <h2
      class="films-list__title ${!isVisibleTitle ? 'visually-hidden' : ''}"
    >
      ${title ?? DEFAULT_TITLE}
    </h2>
  </section>
`;

export default class FilmsBlockView extends AbstractView {
  getTemplate() {
    if (!this._template) {
      this._setTemplate();
    }

    return this._template;
  }

  _setTemplate({
    blockClassName,
    title,
    isVisibleTitle,
  } = {}) {
    this._template = getFilmsBlockTemplate({
      blockClassName,
      title,
      isVisibleTitle,
    });
  }
}
