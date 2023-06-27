// Запуск слайдера, с автоотключением на средних+ экранах.
// Свайпер задает позицию прокрутки с помощью инлайновых стилей
// на элементе (transform: translate), поэтому их надо убирать
// возвращать при смене размера экрана.

import Swiper, { Pagination } from "swiper";
import Expander from "./expand";

class SwiperHelper {
  #boxElement;
  #listElement;
  #paginationElement;

  #expander = null;

  #swiper;
  #lastTranslate = 0;
  #enabled = false;

  constructor(screenSizeObserver, container, expansible) {
    this.#boxElement = container.querySelector(".cards-box");
    this.#listElement = container.querySelector(".cards-list");
    this.#paginationElement = container.querySelector(".cards-pagination");

    this.#enabled = screenSizeObserver.currentSize === "sm";

    this.#swiper = new Swiper(this.#boxElement, {
      modules: [Pagination],

      enabled: this.#enabled,
      slidesPerView: "auto", // не растягивать карточки

      pagination: {
        el: this.#paginationElement,
        clickable: true,
      },
    });

    if (!this.#enabled) {
      this.#swiper.detachEvents();
    }

    screenSizeObserver.on((screenSize) => {
      if (this.#enabled && (screenSize === "md" || screenSize === "lg")) {
        this.disable();
      } else if (!this.#enabled && screenSize === "sm") {
        this.enable();
      }
    });

    if (expansible) {
      this.#expander = new Expander(
        this.#listElement,
        container.querySelector(".expand"),
        "cards-list--expanded",
        "cards-list--opaque"
      );
    }
  }

  enable() {
    this.#swiper.setTranslate(this.#lastTranslate);
    this.#swiper.attachEvents();
    this.#swiper.enable();

    this.#enabled = true;
  }

  disable() {
    this.#swiper.disable();
    this.#swiper.detachEvents();
    this.#lastTranslate = this.#swiper.getTranslate();
    this.#listElement.removeAttribute("style");

    this.#enabled = false;
  }
}

export default SwiperHelper;
