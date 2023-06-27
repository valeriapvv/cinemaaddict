import FilmsSectionView from '../view/films-section-view.js';
import FilmsPresenter from './films-presenter.js';
import {render} from '../render.js';

export default class MainScreenPresenter {
  constructor({parentElement}) {
    this.parentElement = parentElement;
  }

  init() {
    this.filmsSectionComponent = new FilmsSectionView();

    this.filmsPresenter = new FilmsPresenter({
      parentElement: this.filmsSectionComponent.getElement()
    });
    this.filmsPresenter.init();

    render(this.filmsSectionComponent, this.parentElement);
  }
}
