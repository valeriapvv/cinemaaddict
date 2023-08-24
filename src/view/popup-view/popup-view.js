import AbstractView from '../../framework/view/abstract-view.js';
import {CLOSE_BUTTON_CLASS_NAME, getPopupTemplate} from './template.js';

export default class PopupView extends AbstractView {
  #film = null;
  #comments = null;

  #onClose = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  _getTemplate() {
    return getPopupTemplate(this.#film, this.#comments);
  }

  setClose(onClose) {
    this.#onClose = onClose;

    const closeButton = this.element.querySelector(`.${CLOSE_BUTTON_CLASS_NAME}`);

    // TODO: закрытие по клику вне попапа

    closeButton.addEventListener('click', this.#onClose);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#onClose();
    }
  };

  #removeHandlers = () => {
    document.removeEventListener('keydown', this.#onEscKeydown);
  };

  removeElement() {
    this.#removeHandlers();
    super.removeElement();
  }
}
