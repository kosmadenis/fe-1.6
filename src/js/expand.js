// Экспандер - плавный переход между свернутым и развернутым состояниями.
// Переход между `max-height: <number>` и `max-height: <none/fit-content>`
// не будет плавным, поэтому приходится вручную делать переход между
// конкретными числовыми значениями `max-height`.

class Expander {
  #isExpanded = false;
  #expanderElement;
  #expandButton;
  #styleExpanded;
  #styleTransitional;

  // Запустить экспандер.
  //  - expanderElement - разворачивающийся/сворачивающийся элемент
  //  - expandButton - элемент, по клику котрого экспандер переключится
  //  - styleExpanded - стиль для развернутого состояния - размер должен отличаться
  //  - styleTransitional - стиль для переходного состояния - размер должен оставаться таким же
  constructor(expanderElement, expandButton, styleExpanded, styleTransitional) {
    this.#expanderElement = expanderElement;
    this.#expandButton = expandButton;
    this.#styleExpanded = styleExpanded;
    this.#styleTransitional = styleTransitional;

    expanderElement.addEventListener("transitionend", (event) => {
      if (event.propertyName === "max-height") {
        // После перехода надо убрать `max-height`, чтобы при ресайзе текст не
        // обрезался (у экспандера должен быть `overflow: hidden/clip`).
        event.target.style["max-height"] = null;

        if (!this.#isExpanded) {
          // Плюс, если экспандер был свернут, убрать `--expanded`,
          // т.е. сделать всем сворачиваемым потомкам `display: none`:
          expanderElement.classList.remove(styleExpanded);
        }
      }
    });

    expandButton.addEventListener("click", (event) => {
      event.preventDefault();

      if (this.#isExpanded) {
        this.retract();
      } else {
        this.expand();
      }
    });
  }

  expand() {
    // Разворачивание текста, с плавным переходом.

    if (this.#isExpanded) {
      return;
    }

    // Рассчитать высоты
    const transitionStartHeight = this.#expanderElement.clientHeight;
    this.#expanderElement.classList.add(this.#styleExpanded);
    const transitionEndHeight = this.#expanderElement.clientHeight;
    this.#expanderElement.classList.remove(this.#styleExpanded);

    if (transitionStartHeight == transitionEndHeight) {
      // Start == end, перехода не будет.

      this.#expanderElement.classList.add(this.#styleExpanded);
      if (this.#styleTransitional) {
        this.#expanderElement.classList.add(this.#styleTransitional);
      }
    } else {
      // Запускаем переход

      this.#expanderElement.style["max-height"] = `${transitionStartHeight}px`;
      this.#expanderElement.classList.add(this.#styleExpanded);

      setTimeout(() => {
        this.#expanderElement.style["max-height"] = `${transitionEndHeight}px`;
        if (this.#styleTransitional) {
          this.#expanderElement.classList.add(this.#styleTransitional);
        }
      }, 1);
    }

    this.#expandButton.classList.add("expand--expanded");

    this.#isExpanded = true;
  }

  retract() {
    // Сворачивание текста, с плавным переходом.

    if (!this.#isExpanded) {
      return;
    }

    // Рассчитать высоты
    const transitionStartHeight = this.#expanderElement.clientHeight;
    this.#expanderElement.classList.remove(this.#styleExpanded);
    const transitionEndHeight = this.#expanderElement.clientHeight;
    this.#expanderElement.classList.add(this.#styleExpanded);

    if (transitionStartHeight == transitionEndHeight) {
      // Start == end, перехода не будет.

      this.#expanderElement.classList.remove(this.#styleExpanded);
      if (this.#styleTransitional) {
        this.#expanderElement.classList.remove(this.#styleTransitional);
      }
    } else {
      // Запускаем переход

      this.#expanderElement.style["max-height"] = `${transitionStartHeight}px`;

      // Почему работает только с setTimeout?
      // Возможно, смена свойств происходит на другом кадре?
      // Может, лучше requestAnimationFrame()?
      setTimeout(() => {
        this.#expanderElement.style["max-height"] = `${transitionEndHeight}px`;
        if (this.#styleTransitional) {
          this.#expanderElement.classList.remove(this.#styleTransitional);
        }
      }, 1);
    }

    this.#expandButton.classList.remove("expand--expanded");

    this.#isExpanded = false;
  }
}

export default Expander;
