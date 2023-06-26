import HeaderPresenter from './presenter/header-presenter.js';
import FilmsPresenter from './presenter/films-presenter.js';
import {ElementSelector} from './data/constants.js';

const headerPresenter = new HeaderPresenter({
  headerElement: document.querySelector(ElementSelector.Header)
});
headerPresenter.init();

const filmsPresenter = new FilmsPresenter({
  parentElement: document.querySelector(ElementSelector.ContentPlace)
});
filmsPresenter.init();
