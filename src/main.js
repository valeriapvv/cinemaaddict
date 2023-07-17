import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainScreenPresenter from './presenter/main-screen-presenter.js';
import FilmsCountPresenter from './presenter/films-count-presenter.js';
import PopupPresesnter from './presenter/popup-presenter.js';
import {ContainerSelector} from './data/constants.js';

const rootElement = document.body;

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const headerPresenter = new HeaderPresenter({
  parentElement: document.querySelector(ContainerSelector.Header)
});
headerPresenter.init();

const onShowPopup = () => {
  rootElement.classList.add('hide-overflow');
};

const popupPresenter = new PopupPresesnter({
  parentElement: rootElement,
  filmsModel,
  commentsModel,
  onShowPopup,
});

const mainScreenPresenter = new MainScreenPresenter({
  parentElement: document.querySelector(ContainerSelector.MainScreen),
  filmsModel,
  popupPresenter,
});
mainScreenPresenter.init();

const filmsCountPresenter = new FilmsCountPresenter({
  parentElement: document.querySelector(ContainerSelector.FooterInfo),
  filmsModel,
});
filmsCountPresenter.init();
