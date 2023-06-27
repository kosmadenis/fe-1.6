class PopupOverlay {
  #index = 0;
  #popups = [];
  #element;

  constructor(element) {
    this.#element = element;

    element.addEventListener("pointerdown", (evt) => {
      evt.preventDefault();
      this.#popups.forEach((popup) => popup.close());
    });
  }

  pushLayer() {
    this.#index += 1;
    if (this.#index === 1) {
      this.#element.classList.add("popup-overlay--open");
    }
  }

  popLayer() {
    if (this.#index === 0) {
      return;
    }

    this.#index -= 1;
    if (this.#index === 0) {
      this.#element.classList.remove("popup-overlay--open");
    }
  }

  registerPopup(popup) {
    this.#popups.push(popup);
  }
}

export default PopupOverlay;
