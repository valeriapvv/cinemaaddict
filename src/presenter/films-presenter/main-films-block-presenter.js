import FilmsBlockPresenter from './films-block-presenter.js';
import ShowMoreButtonView from '../../view/show-more-button-view/show-more-button-view.js';
import {remove, render} from '../../framework/render.js';

export default class MainFilmsBlockPresenter extends FilmsBlockPresenter {
  #showMoreButtonComponent = null;
  #renderedFilmsCount = null;

  #filtersModel = null;

  constructor({
    parentElement,
    filmsModel,
    filtersModel,
    popupPresenter,
    blockComponent,
    itemsCountToShow,
    getFilms,
  }) {
    super({
      parentElement,
      filmsModel,
      popupPresenter,
      blockComponent,
      itemsCountToShow,
      getFilms,
    });

    this.#filtersModel = filtersModel;
  }

  init() {
    super.init();

    this.#renderedFilmsCount = this._itemsCountToShow;
    this.#renderShowMoreButton();

    this.#filtersModel.addObserver(this.#handleFiltersModelEvent);
  }

  #handleFiltersModelEvent = () => {
    this._initFilmsBlock();

    this.#renderedFilmsCount = this._itemsCountToShow;
    this.#renderShowMoreButton();
  };

  // Show More Button

  #renderShowMoreButton() {
    remove(this.#showMoreButtonComponent);

    if (this.#isAllFilmsRendered()) {
      return;
    }

    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setClick(this.#onShowMoreButtonClick);
    render(this.#showMoreButtonComponent, this._blockComponent.element);
  }

  #onShowMoreButtonClick = () => {
    this._renderFilms(
      this.#renderedFilmsCount,
      this.#renderedFilmsCount + this._itemsCountToShow,
    );

    this.#renderedFilmsCount += this._itemsCountToShow;

    if (this.#isAllFilmsRendered()) {
      remove(this.#showMoreButtonComponent);
      this.#showMoreButtonComponent = null;
    }
  };

  // All Films Rendered

  #isAllFilmsRendered() {
    return this.#renderedFilmsCount >= this._getFilms().length;
  }
}
