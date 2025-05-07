import createProject from "./project";


export default function loadHomeView(projects) {
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const projectList = createProjectList(projects);
    homeContainer.appendChild(projectList);

    const newProjectButton = document.createElement('button');
    newProjectButton.type = 'button';
    newProjectButton.className = 'new-project';
    newProjectButton.textContent = 'New project';
    const dialog = createProjectDialog(projects, projectList);
    newProjectButton.addEventListener('click', () => {
        dialog.showModal();
    });
    homeContainer.append(newProjectButton, dialog);

    return homeContainer;
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
    form.appendChild(closeDialogButton);

    const label = document.createElement('label');
    label.setAttribute('for', 'project-name');
    label.textContent = 'Project name';
    form.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'project-name';
    input.name = 'project-name';
    input.maxLength = 30;
    input.required = true;
    input.autofocus = true;
    form.appendChild(input);

    const submitButton = document.createElement('button');
    submitButton.className = 'submit-project';
    submitButton.type = 'submit';
    submitButton.textContent = 'Create';
    form.appendChild(submitButton);

    form.addEventListener('submit', () => {
        const projectName = input.value;
        projects.push(createProject(projectName));

        const newProjectList = createProjectList(projects);
        projectList.replaceWith(newProjectList);
        projectList = newProjectList;

        input.value = null;
    });

    return dialog;
}


function createProjectList(projects) {
    const projectList = document.createElement('ul');
    projectList.className = 'project-list';

    projects.forEach((project) => {
        const listItem = document.createElement('li');

        const listButton = document.createElement('button');
        listButton.type = 'button';
        listButton.className = 'project-list-item';

        const projectName = document.createElement('span');
        projectName.textContent = project.name;
        projectName.className = 'project-list-item-name';
        listButton.appendChild(projectName);

        const listCount = document.createElement('span');
        listCount.className = 'project-list-todo-count';
        listCount.textContent = project.getTodoCount();
        listButton.appendChild(listCount);

        listItem.appendChild(listButton);
        projectList.appendChild(listItem);
    })

    return projectList;
}
