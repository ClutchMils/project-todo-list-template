// import "./style.css";
import { getProjects } from "./modules/app";
import {
  renderProjects,
  renderTodos,
  setupTodoForm,
  setupProjectForm,
} from "./modules/ui";

console.log(getProjects());

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderTodos();
  setupTodoForm();
  setupProjectForm();
});

// renderProjects();
