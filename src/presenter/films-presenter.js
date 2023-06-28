import FilmsBlockView from '../view/films-block-view/films-block-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import TopRatedFilmsBlockView from '../view/films-block-view/top-rated-films-block-view.js';
import CommentedFilmsBlockView from '../view/films-block-view/commented-films-block-view.js';
import {render} from '../render.js';

const MAIN_FILMS_COUNT = 5;
const SECONDARY_FILMS_COUNT = 2;

export default class FilmsPresenter {
  constructor({parentElement}) {
    this.parentElement = parentElement;
  }

  init() {
    this.renderBlock({
      blockComponent: new FilmsBlockView(),
      itemsCount: MAIN_FILMS_COUNT,
    });

    this.renderBlock({
      blockComponent: new TopRatedFilmsBlockView(),
      itemsCount: SECONDARY_FILMS_COUNT,
      hasShowMoreButton: false,
    });

    this.renderBlock({
      blockComponent: new CommentedFilmsBlockView(),
      itemsCount: SECONDARY_FILMS_COUNT,
      hasShowMoreButton: false,
    });
  }

  renderBlock({
    blockComponent,
    itemsCount,
    hasShowMoreButton = true,
  }) {
    const blockElement = blockComponent.getElement();
    const filmsListComponent = new FilmsListView();

    render(blockComponent, this.parentElement);
    render(filmsListComponent, blockElement);

    if (hasShowMoreButton) {
      render(new ShowMoreButtonView(), blockElement);
    }

    for (let i = 0; i < itemsCount; i++) {
      render(new FilmCardView(), filmsListComponent.getElement());
    }
  }
}
