class ScreenSizeObserver {
  #screenSizes = [];
  #currentSize = null;
  #listeners = [];

  constructor(screenSizes) {
    // Трансформируем в массив
    for (const prop in screenSizes) {
      this.#screenSizes.push({
        name: prop,
        size: screenSizes[prop],
      });
    }

    console.assert(this.#screenSizes.length > 0);

    // Сортируем в обратном порядке
    this.#screenSizes.sort((a, b) => b.size - a.size);

    this.#currentSize = this.#getScreenSize();

    window.addEventListener("resize", () => {
      const newSize = this.#getScreenSize();
      if (newSize !== this.#currentSize) {
        this.#currentSize = newSize;
        this.#listeners.forEach((cb) => cb(newSize));
      }
    });
  }

  get currentSize() {
    return this.#currentSize;
  }

  #getScreenSize() {
    const screenWidth = window.innerWidth;
    for (const entry of this.#screenSizes) {
      if (screenWidth >= entry.size) {
        return entry.name;
      }
    }

    return this.#screenSizes[this.#screenSizes.length - 1];
  }

  on(callback) {
    this.#listeners.push(callback);
  }
}

export default ScreenSizeObserver;
