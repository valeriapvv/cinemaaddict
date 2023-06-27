import HeaderPresenter from './presenter/header-presenter.js';
import MainScreenPresenter from './presenter/main-screen-presenter.js';
import {ElementSelector} from './data/constants.js';

const headerPresenter = new HeaderPresenter({
  headerElement: document.querySelector(ElementSelector.Header)
});
headerPresenter.init();

const mainScreenPresenter = new MainScreenPresenter({
  parentElement: document.querySelector(ElementSelector.MainScreen)
});
mainScreenPresenter.init();
