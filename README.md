# Simple Todo App

![Todo App Screenshot](https://practicum-content.s3.us-west-1.amazonaws.com/resources/Untitled_1716288792.png)

## Functionality

This is a small client-side ToDo application that demonstrates DOM manipulation,
form validation, modular JavaScript, and a simple component-based structure.

Key behaviors:

- Renders an initial list of todos on page load (from a local `initialTodos` array).
- Adds new todos via a modal form. The form is validated on input and the
  submit button is enabled only when validation passes.
- Each todo item supports marking as completed (checkbox) and deletion (delete
  button). Completed state is reflected visually on the item.
- New todos receive a unique UUID v4 id generated in the browser so that
  checkbox `id`/label `for` attributes remain unique.

## Technology

This project uses modern browser features and a small, explicit architecture:

- ES modules (module type scripts) to organize code (`pages/index.js`,
  `components/Todo.js`, `components/FormValidator.js`, `utils/constants.js`).
- Object-oriented JavaScript: `Todo` and `FormValidator` classes encapsulate
  todo rendering/behavior and form validation logic respectively.
- The `uuid` package is imported from a CDN (`https://jspm.dev/uuid`) to
  generate RFC-compliant v4 UUIDs in the browser for new todos.
- Form validation logic is implemented client-side and mirrors standard
  constraint validation (using input `validity`, `validationMessage`) with
  custom error message display and submit button enable/disable behavior.
- No build tools or bundlers are required; the app runs directly in modern
  browsers supporting ES modules.

## Deployment

This project is deployed on GitHub Pages:

- [GitHub Pages Link](https://gromero-ca.github.io/se_project_todo-app/)
