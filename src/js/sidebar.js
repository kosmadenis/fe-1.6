class Sidebar {
  #isOpen = false;
  #popupOverlay;
  #element;

  constructor(popupOverlay, element, openButton, closeButton) {
    this.#popupOverlay = popupOverlay;
    this.#element = element;

    popupOverlay.registerPopup(this);

    openButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.open();
    });

    closeButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.close();
    });
  }

  open() {
    if (!this.#isOpen) {
      this.#element.classList.add("sidebar--open");
      this.#popupOverlay.pushLayer();
      this.#isOpen = true;
    }
  }

  close() {
    if (this.#isOpen) {
      this.#element.classList.remove("sidebar--open");
      this.#popupOverlay.popLayer();
      this.#isOpen = false;
    }
  }
}

export default Sidebar;
