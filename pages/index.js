import { initialTodos, validationConfig, SELECTORS } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector(SELECTORS.addTodoForm);

const addFormValidator = new FormValidator(validationConfig, addTodoForm);
addFormValidator.enableValidation();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const handleDeleteTodo = (wasCompleted) => {
    todoCounter.updateTotal(false);
    if (wasCompleted) {
      todoCounter.updateCompleted(false);
    }
  };

  const handleCheckboxChange = (isChecked) => {
    todoCounter.updateCompleted(isChecked);
  };

  const todo = new Todo(data, SELECTORS.todoTemplate, handleDeleteTodo, handleCheckboxChange);
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: SELECTORS.todoList,
});

section.renderItems();

const addTodoPopup = new PopupWithForm(SELECTORS.addTodoPopup, (values) => {
  const name = values.name;
  const dateInput = values.date;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();

  const todoData = { id, name, date };
  const todoElement = generateTodo(todoData);
  section.addItem(todoElement);
  todoCounter.updateTotal(true);
  addFormValidator.resetValidation();
  addTodoPopup.close();
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
