import FilmsBlockPresenter from './films-block-presenter.js';
import ShowMoreButtonView from '../../view/show-more-button-view/show-more-button-view.js';
import {remove, render} from '../../framework/render.js';

export default class MainFilmsBlockPresenter extends FilmsBlockPresenter {
  #showMoreButtonComponent = null;
  #renderedFilmsCount = null;

  init() {
    this.#renderedFilmsCount = this._itemsCountToShow;

    super.init();

    if (!this.#isAllFilmsRendered()) {
      this.#renderShowMoreButton();
    }
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setClick(this.#onShowMoreButtonClick);

    render(this.#showMoreButtonComponent, this._blockComponent.element);
  }

  #onShowMoreButtonClick = () => {
    const firstIndex = this.#renderedFilmsCount;
    const lastIndex = Math.min(
      this.#renderedFilmsCount + this._itemsCountToShow - 1,
      this._filmsCount - 1,
    );

    for (let i = firstIndex; i <= lastIndex; i++) {
      this._renderFilm(this._films[i], this._filmsListComponent);
    }

    this.#renderedFilmsCount += this._itemsCountToShow;

    if (this.#isAllFilmsRendered()) {
      remove(this.#showMoreButtonComponent);
      this.#showMoreButtonComponent = null;
    }
  };

  #isAllFilmsRendered() {
    return this.#renderedFilmsCount >= this._filmsCount;
  }
}
