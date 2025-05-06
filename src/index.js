import "./styles.css";
import createProject from "./project";
import loadHomeView from "./homeView";

(() => {
    const projects = []
    const project = createProject('(no project)');
    projects.push(project);

    const homeContainer = loadHomeView(projects);
    const contentContainer = document.querySelector('#content');
    contentContainer.appendChild(homeContainer);
})();;
