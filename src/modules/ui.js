import {
  getProjects,
  addProject,
  addTodo,
  setSelectedProject,
  getSelectedProject,
  deleteTodo,
  updateTodo,
} from "./app";

export function setupProjectForm() {
  const btn = document.getElementById("add-project-btn");
  const input = document.getElementById("project-input");

  btn.addEventListener("click", () => {
    const name = input.value.trim();

    if (!name) return;

    addProject(name);
    renderProjects();
    renderTodos();

    input.value = "";
  });
}

export function setupTodoForm() {
  const form = document.getElementById("todo-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    const project = getSelectedProject();

    addTodo(project.id, [title, "", dueDate, priority]);

    renderTodos();
    form.reset();
  });
}

// import { getSelectedProject, deleteTodo } from "./app";

let expandedTodoId = null;

export function renderTodos() {
  const container = document.getElementById("todos");
  container.innerHTML = "";

  const project = getSelectedProject();

  project.todos.forEach((todo) => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.margin = "8px 0";
    div.style.padding = "8px";

    // TITLE (click to expand)
    const title = document.createElement("div");
    title.textContent = todo.title;
    title.style.cursor = "pointer";

    title.addEventListener("click", () => {
      expandedTodoId = expandedTodoId === todo.id ? null : todo.id;

      renderTodos();
    });

    div.appendChild(title);

    // EXPANDED VIEW
    // if (expandedTodoId === todo.id) {
    //   const desc = document.createElement("p");
    //   desc.textContent = `Description: ${todo.description}`;

    //   const date = document.createElement("p");
    //   date.textContent = `Due: ${todo.dueDate}`;

    //   const priority = document.createElement("p");
    //   priority.textContent = `Priority: ${todo.priority}`;

    //   const delBtn = document.createElement("button");
    //   delBtn.textContent = "Delete";

    //   delBtn.addEventListener("click", () => {
    //     deleteTodo(project.id, todo.id);
    //     renderTodos();
    //   });

    //   div.appendChild(desc);
    //   div.appendChild(date);
    //   div.appendChild(priority);
    //   div.appendChild(delBtn);
    // }

    if (expandedTodoId === todo.id) {
      const titleInput = document.createElement("input");
      titleInput.value = todo.title;

      const descInput = document.createElement("input");
      descInput.value = todo.description;

      const dateInput = document.createElement("input");
      dateInput.type = "date";
      dateInput.value = todo.dueDate;

      const priorityInput = document.createElement("select");
      ["low", "high"].forEach((p) => {
        const option = document.createElement("option");
        option.value = p;
        option.text = p;
        if (p === todo.priority) option.selected = true;
        priorityInput.appendChild(option);
      });

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";

      delBtn.addEventListener("click", () => {
        deleteTodo(project.id, todo.id);
        renderTodos();
      });

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";

      saveBtn.addEventListener("click", () => {
        updateTodo(project.id, todo.id, {
          title: titleInput.value,
          description: descInput.value,
          dueDate: dateInput.value,
          priority: priorityInput.value,
        });

        expandedTodoId = null;
        renderTodos();
      });

      div.appendChild(titleInput);
      div.appendChild(descInput);
      div.appendChild(dateInput);
      div.appendChild(priorityInput);
      div.appendChild(delBtn);
      div.appendChild(saveBtn);
    }
    if (todo.priority === "high") {
      div.style.borderLeft = "5px solid red";
    } else {
      div.style.borderLeft = "5px solid green";
    }
    container.appendChild(div);
  });
}

export function renderProjects() {
  const container = document.getElementById("projects");
  container.innerHTML = "";

  getProjects().forEach((project) => {
    const div = document.createElement("div");
    div.textContent = project.name;

    div.addEventListener("click", () => {
      console.log("clicked project:", project.name);

      setSelectedProject(project.id);

      console.log("selected project:", project);
      renderTodos();
    });
    container.appendChild(div);
  });
}
