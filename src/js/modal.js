class Modal {
  #isOpen = false;
  #popupOverlay;
  #element;
  #focusElement;

  constructor(
    popupOverlay,
    modalElement,
    focusElement,
    modalOpenButtons,
    modalCloseButtons
  ) {
    this.#popupOverlay = popupOverlay;
    this.#element = modalElement;
    this.#focusElement = focusElement;

    popupOverlay.registerPopup(this);

    modalElement.addEventListener("transitionend", (event) => {
      if (event.propertyName === "opacity") {
        if (!this.#isOpen) {
          event.target.classList.remove("modal--displayed");
        }
      }
    });

    modalOpenButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        this.open();
      });
    });

    modalCloseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        this.close();
      });
    });
  }

  open() {
    if (this.#isOpen) return;
    this.#isOpen = true;

    this.#popupOverlay.pushLayer();

    this.#element.classList.add("modal--displayed");

    this.#focusElement.focus();

    setTimeout(() => {
      this.#element.classList.add("modal--open");
    }, 1);
  }

  close() {
    if (!this.#isOpen) return;
    this.#isOpen = false;

    this.#element.classList.remove("modal--open");

    this.#popupOverlay.popLayer();
  }
}

export default Modal;
