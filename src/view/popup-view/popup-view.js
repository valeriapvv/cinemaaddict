import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {
  CLOSE_BUTTON_CLASS_NAME,
  ADD_TO_FAVORITES_CLASS_NAME,
  ADD_TO_WATCHLIST_CLASS_NAME,
  ALREADY_WATCHED_CLASS_NAME,
  COMMENT_INPUT_CLASS_NAME,
  EMOJI_LIST_CLASS_NAME,
  getPopupTemplate,
} from './template.js';

// TODO: Повторяется код FilmCardView по навешиванию обработчиков

export default class PopupView extends AbstractStatefulView {
  constructor(film, comments) {
    super();

    // TODO: Убрать лишнее из состояния?
    this._setState({
      film,
      comments,
      newComment: {
        comment: null,
        emotion: null,
      },
    });

    this.#setInnerHandlers();
  }

  get template() {
    return getPopupTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  #setInnerHandlers() {
    this.#setEmotionChange();
    this.#setCommentChange();
  }

  #setCommentChange() {
    const textareaElement = this.element.querySelector(`.${COMMENT_INPUT_CLASS_NAME}`);
    textareaElement.addEventListener('change', this.#onCommentChange);
  }

  #onCommentChange = (evt) => {
    // TODO: Должна быть перерисовка
    this._setState({
      newComment: {
        ...this._state.newComment,
        comment: evt.target.value,
      },
    });
  };

  #setEmotionChange() {
    const emotionsListElement = this.element.querySelector(`.${EMOJI_LIST_CLASS_NAME}`);
    emotionsListElement.addEventListener('change', this.#onEmotionChange);
  }

  #onEmotionChange = (evt) => {
    // TODO: Должна быть перерисовка
    this._setState({
      newComment: {
        ...this._state.newComment,
        emotion: evt.target.value,
      },
    });
  };

  // onClose

  setClose(onClose) {
    this._callback.close = onClose;

    const closeButton = this.element.querySelector(`.${CLOSE_BUTTON_CLASS_NAME}`);

    // TODO: закрытие по клику вне попапа

    closeButton.addEventListener('click', this.#onCloseClick);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  #onCloseClick = () => {
    this._callback.close();
  };

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this._callback.close();
    }
  };

  // Add to watchlist click

  setAddToWatchlistClick(onClick) {
    this._callback.addToWatchlistClick = onClick;
    const addToWatchlistButton = this.element.querySelector(`.${ADD_TO_WATCHLIST_CLASS_NAME}`);

    addToWatchlistButton.addEventListener('click', this.#onAddToWatchlistClick);
  }

  #onAddToWatchlistClick = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchlistClick(this._state.film);
  };

  // Already watched click

  setAlreadyWatchedClick(onClick) {
    this._callback.alreadyWatchedClick = onClick;
    const alreadyWatchedButton = this.element.querySelector(`.${ALREADY_WATCHED_CLASS_NAME}`);

    alreadyWatchedButton.addEventListener('click', this.#onAlreadyWatchedClick);
  }

  #onAlreadyWatchedClick = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick(this._state.film);
  };

  // Favorite click

  setFavoriteClick(onClick) {
    this._callback.favoriteClick = onClick;
    const favoriteButton = this.element.querySelector(`.${ADD_TO_FAVORITES_CLASS_NAME}`);

    favoriteButton.addEventListener('click', this.#onFavoriteClick);
  }

  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick(this._state.film);
  };

  #removeHandlers = () => {
    document.removeEventListener('keydown', this.#onEscKeydown);
  };

  removeElement() {
    this.#removeHandlers();
    super.removeElement();
  }
}
