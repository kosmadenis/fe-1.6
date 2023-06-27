"use strict";

import "../scss/styles.scss";

import ScreenSizeObserver from "./screen-size";
import Expander from "./expand";
import SwiperHelper from "./swiper-helper";
import PopupOverlay from "./popup-overlay";
import Sidebar from "./sidebar";
import Modal from "./modal";

// Целевые размеры экрана
const screenSizes = {
  sm: 320,
  md: 768,
  lg: 1440,
};

// Обертка для window эвента resize
const screenSizeObserver = new ScreenSizeObserver(screenSizes);

/* Свайперы */

const brandsElement = document.getElementById("brands");
const kindsElement = document.getElementById("kinds");
const pricesElement = document.getElementById("prices");

new SwiperHelper(screenSizeObserver, brandsElement, true);
new SwiperHelper(screenSizeObserver, kindsElement, true);
new SwiperHelper(screenSizeObserver, pricesElement, false);

/* Разворачивающийся блок текста */

const contentElement = document.getElementById("content");
const contentExpanderElement = contentElement.querySelector(
  ".content__text-expander"
);
const contentExpandButton = contentElement.querySelector(".expand");

new Expander(
  contentExpanderElement,
  contentExpandButton,
  "content__text-expander--expanded",
  "content__text-expander--opaque"
);

/* Фоновые слои засветления/блюра когда открыты сайдбар/модалки */

const sidebarPopupOverlayElement = document.getElementById(
  "popup-overlay-for-sidebar"
);
const sidebarPopupOverlay = new PopupOverlay(sidebarPopupOverlayElement);

const modalsPopupOverlayElement = document.getElementById(
  "popup-overlay-for-modals"
);
const modalsPopupOverlay = new PopupOverlay(modalsPopupOverlayElement);

/* Сайдбар */

const sidebarElement = document.getElementById("sidebar");
const sidebarOpenButton = document.getElementById("sidebar-open");
const sidebarCloseButton = document.getElementById("sidebar-close");

new Sidebar(
  sidebarPopupOverlay,
  sidebarElement,
  sidebarOpenButton,
  sidebarCloseButton
);

/* Модалки */

const feedbackModalElement = document.getElementById("modal-feedback");
const feedbackModalOpenButtons = [
  document.getElementById("header-open-feedback"),
  document.getElementById("sidebar-open-feedback"),
];
const feedbackModalCloseButtons = [
  document.getElementById("modal-feedback-close"),
];

new Modal(
  modalsPopupOverlay,
  feedbackModalElement,
  feedbackModalOpenButtons,
  feedbackModalCloseButtons
);

const callModalElement = document.getElementById("modal-call");
const callModalOpenButtons = [
  document.getElementById("header-open-call"),
  document.getElementById("sidebar-open-call"),
];
const callModalCloseButtons = [document.getElementById("modal-call-close")];

new Modal(
  modalsPopupOverlay,
  callModalElement,
  callModalOpenButtons,
  callModalCloseButtons
);
