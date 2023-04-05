// Импорт вендоров и утилит, не удаляйте его
import "./vendor";
import { ImageSlider } from "./utils/image-slider";
import { iosVhFix } from "./utils/ios-vh-fix";
import { modals, initModals } from "./modals/init-modals";

// Ваши импорты...
import MainPresenter from './presenter/main-presenter.js';
import CardsApiService from './api-service.js/cards-api-service';
import {AUTHORIZATION, END_POINT} from './consts.js';
import CardsModel from './model/cards-model.js';

// Код для работы попапов, не удаляйте его
window.addEventListener("DOMContentLoaded", () => {
  iosVhFix();

  window.addEventListener("load", () => {
    // Инициализация слайдера
    const imageSlider = new ImageSlider(".image-slider");
    imageSlider.init();

    // Инициализация попапов
    initModals();
  });

  // Пример кода для открытия попапа
  document
    .querySelector(".element-which-is-open-popup")
    .addEventListener("click", () => modals.open("popup-data-attr"));

  // Код отработает, если разметка попапа уже отрисована в index.html

  // Если вы хотите рисовать разметку попапа под каждое "открытие",
  // то не забудьте перенесети в код addEventListener инициализацию слайдера

  // ------------

  // Ваш код...
  const mainElement = document.querySelector('main');
  const modalProdactElement = document.querySelector('.modal-product');

  const cardsModel = new CardsModel({
     cardsApiService: new CardsApiService(END_POINT, AUTHORIZATION),
  })

  const mainPresenter = new MainPresenter({
    mainContainer: mainElement,
    modalProdactElement: modalProdactElement,
    cardsModel,
  })


  cardsModel.init();
  console.log(cardsModel)
});
