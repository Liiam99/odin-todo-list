import createProject from "./project";
import { deleteProject, saveNewProject } from "./storage";


export default function loadHomeView(projects) {
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const projectList = document.createElement('ul');
    projectList.className = 'project-list';
    fillProjectList(projectList, projects);

    const newProjectButton = document.createElement('button');
    newProjectButton.type = 'button';
    newProjectButton.className = 'new-project';
    newProjectButton.textContent = 'New project';

    const dialog = createProjectDialog(projects, projectList);
    newProjectButton.addEventListener('click', () => {
        dialog.showModal();
    });

    homeContainer.append(projectList, newProjectButton, dialog);

    return homeContainer;
}


function fillProjectList(projectList, projects) {
    for (const projectId in projects) {
        const project = projects[projectId];
        const listItem = document.createElement('li');

        const listButton = document.createElement('button');
        listButton.type = 'button';
        listButton.className = 'project-list-item';
        listButton.dataset.projectId = projectId;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.type = 'button';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        const svgTitle = document.createElement('title');
        svgTitle.textContent = 'delete';
        svg.append(svgTitle);
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('d', 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z');
        svg.append(svgPath);
        deleteButton.append(svg);

        deleteButton.addEventListener('click', () => {
            listItem.remove();
            deleteProject(projectId);
        })

        const projectName = document.createElement('span');
        projectName.textContent = project.name;
        projectName.className = 'project-list-item-name';
        listButton.appendChild(projectName);

        const listCount = document.createElement('span');
        listCount.className = 'project-list-todo-count';
        listCount.textContent = project.getTodoCount();
        listButton.appendChild(listCount);

        listItem.append(listButton, deleteButton);
        projectList.appendChild(listItem);
    }
}


function createProjectDialog(projects, projectList) {
    const dialog = document.createElement('dialog');

    const form = document.createElement('form');
    form.method = 'dialog';
    form.className = 'project-form';
    dialog.appendChild(form);

    const closeDialogButton = document.createElement('button');
    closeDialogButton.type = 'button';
    closeDialogButton.className = 'close-dialog';
    closeDialogButton.innerHTML = 'X';
    closeDialogButton.addEventListener('click', () => dialog.close());

    const label = document.createElement('label');
    label.setAttribute('for', 'project-name');
    label.textContent = 'Project name';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'project-name';
    input.name = 'project-name';
    input.maxLength = 30;
    input.required = true;
    input.autofocus = true;

    const submitButton = document.createElement('button');
    submitButton.className = 'submit-project';
    submitButton.type = 'submit';
    submitButton.textContent = 'Create';

    form.addEventListener('submit', () => {
        const projectName = input.value;
        const project = createProject(projectName);
        const projectId = project.getId();
        projects[projectId] = project;
        fillProjectList(projectList, { [projectId]: project });

        saveNewProject(project);

        input.value = null;
    });

    form.append(closeDialogButton, label, input, submitButton);

    return dialog;
}
