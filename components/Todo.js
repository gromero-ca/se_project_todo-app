export default class Todo {
  constructor(data = {}, selector = "#todo-template") {
    this._data = Object.assign(
      { id: Date.now().toString(), name: "", date: null, completed: false },
      data
    );
    this._selector = selector;
    this._element = null;
  }

  _setEventListeners() {
    if (!this._element) return;

    const deleteBtn = this._element.querySelector(".todo__delete-btn");
    const checkbox = this._element.querySelector(".todo__completed");

    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        this._element.remove();
      });
    }

    if (checkbox) {
      checkbox.addEventListener("change", (evt) => {
        this._data.completed = evt.target.checked;
        this._element.classList.toggle("todo_completed", this._data.completed);
      });
    }
  }

  getView() {
    const template = document.querySelector(this._selector);
    if (!template)
      throw new Error(`Template not found for selector: ${this._selector}`);

    const todoElement = template.content.querySelector(".todo").cloneNode(true);

    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDate = todoElement.querySelector(".todo__date");

    const id = this._data.id || Date.now().toString();
    todoCheckboxEl.id = `todo-${id}`;
    if (todoLabel) todoLabel.setAttribute("for", `todo-${id}`);

    if (todoNameEl) todoNameEl.textContent = this._data.name;
    if (todoCheckboxEl) todoCheckboxEl.checked = !!this._data.completed;

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else if (todoDate) {
      todoDate.textContent = "";
    }

    this._element = todoElement;

    this._setEventListeners();

    return this._element;
  }
}
