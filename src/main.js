import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainScreenPresenter from './presenter/main-screen-presenter.js';
import FilmsCountPresenter from './presenter/films-count-presenter.js';
import PopupPresesnter from './presenter/popup-presenter.js';
import {ElementSelector} from './data/constants.js';

const rootElement = document.body;

/* eslint-disable no-unused-vars */
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
/* eslint-enable no-unused-vars */

const headerPresenter = new HeaderPresenter({
  parentElement: document.querySelector(ElementSelector.Header)
});
headerPresenter.init();

const mainScreenPresenter = new MainScreenPresenter({
  parentElement: document.querySelector(ElementSelector.MainScreen),
  filmsModel,
});
mainScreenPresenter.init();

const filmsCountPresenter = new FilmsCountPresenter({
  parentElement: document.querySelector(ElementSelector.FooterInfo),
  filmsModel,
});
filmsCountPresenter.init();

const showPopup = () => {
  rootElement.classList.add('hide-overflow');
};

/* eslint-disable no-unused-vars */
const popupPresenter = new PopupPresesnter({
  parentElement: rootElement,
  showPopup,
});
/* eslint-enable no-unused-vars */
// popupPresenter.init();
