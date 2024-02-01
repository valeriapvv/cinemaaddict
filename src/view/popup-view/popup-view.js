import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {
  CLOSE_BUTTON_CLASS_NAME,
  ADD_TO_FAVORITES_CLASS_NAME,
  ADD_TO_WATCHLIST_CLASS_NAME,
  ALREADY_WATCHED_CLASS_NAME,
  DELETE_BUTTON_CLASS_NAME,
  COMMENT_INPUT_CLASS_NAME,
  EMOJI_LIST_CLASS_NAME,
  getPopupTemplate,
} from './template.js';

// TODO: Повторяется код FilmCardView по навешиванию обработчиков

export default class PopupView extends AbstractStatefulView {
  #textareaElement = null;

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

    this.setAddToWatchlistClick(this._callback.addToWatchlistClick);
    this.setAlreadyWatchedClick(this._callback.alreadyWatchedClick);
    this.setFavoriteClick(this._callback.favoriteClick);
    this.setClose(this._callback.close);
    this.setCommentSubmit(this._callback.commentSubmit);

    if (this._state.comments?.length) {
      this.setCommentDelete(this._callback.commentDelete);
    }
  };

  #setInnerHandlers() {
    this.#setEmotionChange();
    this.#setCommentInput();
  }

  setCommentSubmit(onSubmit) {
    this._callback.commentSubmit = onSubmit;

    document.addEventListener('keydown', this.#onCommentSubmit);
  }

  #onCommentSubmit = (evt) => {
    const toSubmit =
      evt.ctrlKey
      && evt.key === 'Enter'
      && evt.target === this.#textareaElement;

    if (!toSubmit) {
      return;
    }

    evt.preventDefault();

    this._callback.commentSubmit(this._state.newComment);
  };

  setCommentDelete(onDelete) {
    this._callback.commentDelete = onDelete;

    this.element.addEventListener('click', this.#onDeleteButtonClick);
  }

  #onDeleteButtonClick = (evt) => {
    const deleteButton = evt.target.closest(`.${DELETE_BUTTON_CLASS_NAME}`);

    if (!deleteButton) {
      return;
    }

    const commentItem = evt.target.closest('[data-comment-id]');
    const {commentId} = commentItem.dataset;

    this._callback.commentDelete(commentId);
  };

  #setCommentInput() {
    this.#textareaElement = this.element.querySelector(`.${COMMENT_INPUT_CLASS_NAME}`);

    // TODO: сделать обертку debounce(f, ms)
    this.#textareaElement.addEventListener('input', this.#onCommentInput);
  }

  #onCommentInput = ({target}) => {
    const {value} = target;
    const selectionStart = target.selectionStart;

    this.updateElement({
      newComment: {
        ...this._state.newComment,
        comment: value,
      },
    });

    // TODO: нет возможности "откатить" ввод с помощью Command/Ctrl + Z
    // TODO: при фокусе с помощью Tab курсор в установлен ПЕРЕД введенной строкой
    this.#textareaElement.focus();
    this.#textareaElement.setSelectionRange(selectionStart, selectionStart);
  };

  #setEmotionChange() {
    const emotionsListElement = this.element.querySelector(`.${EMOJI_LIST_CLASS_NAME}`);
    emotionsListElement.addEventListener('change', this.#onEmotionChange);
  }

  #onEmotionChange = (evt) => {
    this.updateElement({
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
    document.removeEventListener('keydown', this.#onCommentSubmit);
  };

  removeElement() {
    this.#removeHandlers();
    super.removeElement();
  }
}
