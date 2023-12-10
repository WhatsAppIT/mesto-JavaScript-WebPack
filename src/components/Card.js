export default class Card {

  constructor(data, templateSelector, handleCardClick, handleDeleteButtonCard, userId, api, handleOpenPopup) {
    this._name = data.name;
    this._title = data.link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonCard = handleDeleteButtonCard;
    this._api = api;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
    this._handleOpenPopup = handleOpenPopup;
  }

  getIdCard() {
    return this._cardId;
  }

  _getTemplate = () => {
    this._imageElement = this._template.cloneNode(true).children[0];
    return this._imageElement;
  }

  deleteCard = () => {
      this._imageElement.remove();
  }

  _deleteButtonTrush = () => {
    if(this._userId !== this._cardOwnerId){
      this._buttonDeleteTrash.remove();
    }
  }

  _cardIsliked = () => {
    const isLiked = this._likes.some((user) => {
      return this._userId === user._id;
    });

    if(isLiked) { this._buttonPlaceLike.classList.add('place__like_type_active') }

  }

  _like = () => {
    if(this._buttonPlaceLike.classList.contains('place__like_type_active')){
      this._api.removeLike(this._cardId)
        .then((res) => {
          this._buttonPlaceLike.classList.remove('place__like_type_active');
          this._numberOfLikes.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      this._api.like(this._cardId)
        .then((res) => {
          this._buttonPlaceLike.classList.add('place__like_type_active');
          this._numberOfLikes.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  _setEventListeners = () => {
    this._buttonDeleteTrash.addEventListener('click', () => this._handleOpenPopup(this));
    this._buttonPlaceLike.addEventListener('click', () => {
      this._like();
    });
    this._cardImage.addEventListener('click', () => { 
      this._handleCardClick(this._name, this._title);
    })
  };

  generateCard = () => {
    this._cardElement = this._getTemplate();
    this._buttonDeleteTrash = this._imageElement.querySelector('.place__trash'); 
    this._buttonPlaceLike = this._imageElement.querySelector('.place__like_type_button');
    this._numberOfLikes = this._imageElement.querySelector('.place__like_type_number');
    this._cardName = this._imageElement.querySelector('.place__title'); 
    this._cardImage = this._imageElement.querySelector('.place__img');
    this._deleteButtonTrush();
    this._cardIsliked();
    this._numberOfLikes.textContent = this._likes.length;
    this._cardName.textContent = this._name; 
    this._cardImage.src = this._title; 
    this._cardImage.alt = this._name; 
    this._setEventListeners();
    return this._cardElement;
  }
}