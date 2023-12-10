export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonEditAvatar = document.querySelector('.profile__avatar-button');
export const formProfile = document.querySelector('.form_type_profile');
export const formCards = document.querySelector('.form_type_cards');
export const formAvatarChange = document.querySelector('.form_type_update-avatar');
export const nameInput = formProfile.querySelector('.form__input_type_name');
export const jobInput = formProfile.querySelector('.form__input_type_job');


export const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disable',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__error_visible'
};