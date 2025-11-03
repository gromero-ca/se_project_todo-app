export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        this.close();
      });
    }

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
