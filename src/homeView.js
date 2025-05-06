export default function loadHomeView(projects) {
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const projectList = document.createElement('ul');
    projectList.className = 'project-list';
    homeContainer.appendChild(projectList);

    projects.forEach((project) => {
        const listItem = document.createElement('li');

        const listButton = document.createElement('button');
        listButton.type = 'button';
        listButton.className = 'project-list-item';
        listButton.textContent = project.title;

        const listCount = document.createElement('span');
        listCount.className = 'project-list-todo-count';
        listCount.textContent = project.getTodoCount();
        listButton.appendChild(listCount);

        listItem.appendChild(listButton);
        projectList.appendChild(listItem);
    })

    const newProjectButton = document.createElement('button');
    newProjectButton.type = 'button';
    newProjectButton.className = 'new-project';
    newProjectButton.textContent = 'New project';
    homeContainer.appendChild(newProjectButton);

    return homeContainer;
}