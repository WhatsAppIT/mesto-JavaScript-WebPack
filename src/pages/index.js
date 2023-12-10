import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import { config } from '../utils/constants.js';
import {
    buttonAddCard,
    buttonEditProfile,
    formProfile,
    formCards,
    formAvatarChange,
    nameInput,
    jobInput,
    buttonEditAvatar
} from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'dc5ffe71-d4a2-4ae4-8d8f-113b04708a8c',
    'Content-Type': 'application/json'
  }
});
const userId = null;
api.getAppInfo() 
  .then(([userInformation, cardList]) => {
    userInfo.setUserInfo(userInformation);
    cardSection.renderer(cardList);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  });

const userInfo = new UserInfo(
  {
    name: '.profile__title',
    job: '.profile__subtitle',
    avatar: '.profile__avatar'
  });

const cardSection = new Section({
  renderer: (item) => {
    cardSection.appendItem(createCardElement(item));
  },
}, '.places');



const profileValidator = new FormValidator(config, formProfile);
profileValidator.enableValidation();
const cardValidator = new FormValidator(config, formCards);
cardValidator.enableValidation();
const avatarChangeValidator = new FormValidator(config, formAvatarChange)
avatarChangeValidator.enableValidation();
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const popupWithCard = new PopupWithForm('.popup_type_cards', handleCardFormSubmit, { defaultTextValue: 'Создать' });
popupWithCard.setEventListeners();

const popupWithProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit, { defaultTextValue: 'Сохранить' });
popupWithProfile.setEventListeners();

const popupWithCardDelete = new PopupWithConfirmation('.popup_type_delete-card', handleCardDeleteSubmit, { defaultTextValue: 'Да' });
popupWithCardDelete.setEventListeners();

const popupWithAvatarChange = new PopupWithForm('.popup_type_update-avatar', handleAvatarCgangeFormSubmit, { defaultTextValue: 'Сохранить' })
popupWithAvatarChange.setEventListeners();


function handleAvatarCgangeFormSubmit (data) {
  popupWithAvatarChange.loadButtonText('Сохранение...');
  api.changeAvatar(data.AvatarLink)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupWithAvatarChange.close();
    })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    popupWithAvatarChange.returnDefaultButtonText();
  });
}

function handleProfileFormSubmit (data) {
  popupWithProfile.loadButtonText('Сохранение...');
  api.editProfile({ name: data.profileName, about: data.profileJob })
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupWithProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      popupWithProfile.returnDefaultButtonText();
    });
}; 
console.log(popupWithCard);
 function handleCardFormSubmit(data) {
  popupWithCard.loadButtonText('Сохранение...');
  api.editCard({ name: data.profileTitle, link: data.profileLink })
    .then((card) => {
      cardSection.prependItem(createCardElement(card))
      popupWithCard.close()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      popupWithCard.returnDefaultButtonText();
    });
};


buttonAddCard.addEventListener('click', openCardPopup); 
buttonEditProfile.addEventListener('click', openProfilePopup);
buttonEditAvatar.addEventListener('click', openEditAvatarPopup);

function openEditAvatarPopup() {
  avatarChangeValidator.disableButton(); 
  popupWithAvatarChange.open();
}

function openCardPopup() {
  cardValidator.disableButton(); 
  popupWithCard.open();
};

function openProfilePopup() {
  profileValidator.enableButton();
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name; 
  jobInput.value = job; 
  popupWithProfile.open();
};

function createCardElement(card) {
  const templateSelector = document.getElementById('template__elements').content;
  const cardElement = new Card(
    card, 
    templateSelector, 
    handleCardClick, 
    handleCardDeleteSubmit, 
    userInfo.userId, 
    api,
    handleOpenPopup
    );
  const newCard = cardElement.generateCard();
  return newCard;
};

function handleCardClick(name, link) {
  popupWithImage.open(name, link); 
};

function handleCardDeleteSubmit(card) {
  api.deleteCard(card.getIdCard())
    .then((res) => {
      card.deleteCard();
      console.log(res);
      popupWithCardDelete.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
};

function handleOpenPopup(card) {
  popupWithCardDelete.open(card);
}