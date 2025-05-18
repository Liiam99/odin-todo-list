import "./styles.css";
import createProject from "./project";
import loadHomeView from "./homeView";
import loadProjectView from "./projectView";


(() => {
    const projects = {};
    const defaultProject = createProject('(no project)');
    projects[defaultProject.getId()] = defaultProject;

    switchView(loadHomeView(projects));

    const projectList = document.querySelector('.project-list');
    projectList.addEventListener('click', (e) => {
        if (e.target.className === 'project-list-item') {
            const projectId = e.target.dataset.projectId;
            console.log(projectId);
            const project = projects[projectId];

            switchView(loadProjectView(project));

            // If project is clicked, get ID of todo and load todo when todo is clicked.
        }
    });
})();


function switchView(view) {
    const contentContainer = document.querySelector('#content');
    contentContainer.innerHTML = '';
    contentContainer.appendChild(view);
}
