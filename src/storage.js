import createProject from "./project";
import createTodo from "./todo";


export function loadProjects() {
    if (!storageAvailable('localStorage') || !localStorage.getItem('projects')) {
        return null;
    }

    const savedProjects = JSON.parse(localStorage.getItem('projects'));
    const projects = {};

    for (const projectId in savedProjects) {
        const savedProject = savedProjects[projectId];
        const todos = {};

        for (const todoId in savedProject.todos) {
            const savedTodo = JSON.parse(savedProject.todos[todoId]);
            const todo = createTodo(savedTodo.title, savedTodo.description,
                                    savedTodo.dueDate, savedTodo.priority,
                                    savedTodo.id, savedTodo.isComplete);

            todos[todo.getFields().id] = todo;
        }

        const project = createProject(savedProject.name, savedProject.id, todos);
        projects[project.getId()] = project;
    }

    return projects;
}


export function saveNewProject(project) {
    if (!storageAvailable('localStorage')) {
        return false;
    }

    if (!localStorage.getItem('projects')) {
        localStorage.setItem('projects', JSON.stringify({}));
    }

    const projects = JSON.parse(localStorage.getItem('projects'));
    project['todos'] = project.getTodos();
    project['id'] = project.getId();
    projects[project.getId()] = project;
    localStorage.setItem('projects', JSON.stringify(projects));

    return true;
}


export function saveTodo(projectId, todo) {
    if (!storageAvailable('localStorage')) {
        return false;
    }

    const todoData = todo.getFields();
    const projects = JSON.parse(localStorage.getItem('projects'));
    projects[projectId]['todos'][todoData.id] = JSON.stringify(todoData);
    localStorage.setItem('projects', JSON.stringify(projects));

    return true;
}


export function deleteTodo(projectId, todoId) {
    if (!storageAvailable('localStorage')) {
        return false;
    }

    const projects = JSON.parse(localStorage.getItem('projects'));
    delete projects[projectId]['todos'][todoId];
    localStorage.setItem('projects', JSON.stringify(projects));

    return true;
}


export function deleteProject(projectId) {
    if (!storageAvailable('localStorage')) {
        return false;
    }

    const projects = JSON.parse(localStorage.getItem('projects'));
    delete projects[projectId];
    localStorage.setItem('projects', JSON.stringify(projects));

    return true;
}


function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage &&
      storage.length !== 0
    );
  }
}
