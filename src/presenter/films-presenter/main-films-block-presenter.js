import FilmsBlockPresenter from './films-block-presenter.js';
import ShowMoreButtonView from '../../view/show-more-button-view/show-more-button-view.js';
import {RenderPosition, remove, render} from '../../framework/render.js';

export default class MainFilmsBlockPresenter extends FilmsBlockPresenter {
  #showMoreButtonComponent = null;
  #renderedFilmsCount = null;

  #filtersModel = null;
  #onFilterModelEvent = null;

  constructor({
    parentElement,
    filmsModel,
    filtersModel,
    popupPresenter,
    blockComponent,
    itemsCountToShow,
    getFilms,
    onFilterModelEvent,
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
    this.#onFilterModelEvent = onFilterModelEvent;
  }

  init() {
    this._filmsModel.addObserver(this.#handleFilmsModelEvent);
    this.#filtersModel.addObserver(this.#handleFiltersModelEvent);

    super.init();

    this.#renderedFilmsCount = this._itemsCountToShow;
    this.#renderShowMoreButton();
  }

  #handleFilmsModelEvent = (event) => {
    // TODO: Сравнение разных сущностей типа обновления и типа фильтра - так себе решение?
    if (event === this.#filtersModel.activeFilter) {
      this.init();

    }
  };

  #handleFiltersModelEvent = () => {
    this.#onFilterModelEvent?.();

    this.init();
  };

  // Show More Button

  #renderShowMoreButton() {
    remove(this.#showMoreButtonComponent);

    if (this.#isAllFilmsRendered()) {
      return;
    }

    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setClick(this.#onShowMoreButtonClick);
    render(this.#showMoreButtonComponent, this._blockComponent.element, RenderPosition.BEFOREEND);
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
