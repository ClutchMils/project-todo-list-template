import { createProject } from "./project";
import { createTodo } from "./todo";
import { saveProjects, loadProjects } from "./storage";

let projects = loadProjects();

// default project
if (projects.length === 0) {
  projects.push(createProject("Default"));
}

let selectedProjectId = projects[0].id;

export function updateTodo(projectId, todoId, updateData) {
  const project = projects.find((p) => p.id === projectId);
  const todo = project.todos.find((t) => t.id === todoId);

  Object.assign(todo, updateData);

  saveProjects(projects);
}

export function getSelectedProject() {
  return projects.find((p) => p.id === selectedProjectId);
}

export function setSelectedProject(id) {
  selectedProjectId = id;
}

export function getProjects() {
  return projects;
}

export function addProject(name) {
  const newProject = createProject(name);
  projects.push(newProject);
  selectedProjectId = newProject.id;
  saveProjects(projects);
}

export function addTodo(projectId, todoData) {
  const project = projects.find((p) => p.id === projectId);
  const todo = createTodo(...todoData);
  project.todos.push(todo);
  saveProjects(projects);
}

export function deleteTodo(projectId, todoId) {
  const project = projects.find((p) => p.id === projectId);
  project.todos = project.todos.filter((t) => t.id !== todoId);
  saveProjects(projects);
}
