import "./styles.css";
import createProject from "./project";
import loadHomeView from "./homeView";
import loadProjectView from "./projectView";
import loadTodoView from "./todoView";


(() => {
    const projects = {};
    const defaultProject = createProject('(untitled project)');
    projects[defaultProject.getId()] = defaultProject;

    switchView(loadHomeView(projects));

    const projectList = document.querySelector('.project-list');
    projectList.addEventListener('click', (e) => {
        if (e.target.className === 'project-list-item') {
            const projectId = e.target.dataset.projectId;
            const project = projects[projectId];
            switchView(loadProjectView(project));

            const todoList = document.querySelector('.todo-list');
            todoList.addEventListener('click', (e) => {
                if (e.target.className === 'todo-list-item') {
                    const todoId = e.target.dataset.todoId;
                    const todos = project.getTodos();
                    const todo = todos[todoId];

                    switchView(loadTodoView(todo));
                }
            })
        }
    });
})();


function switchView(view) {
    const contentContainer = document.querySelector('#content');
    contentContainer.innerHTML = '';
    contentContainer.appendChild(view);
}
