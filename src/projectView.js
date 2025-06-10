import createTodo from "./todo";


export default function loadProjectView(project) {
    const projectContainer = document.createElement('div');
    projectContainer.id = 'project';

    const todoList = document.createElement('ul');
    todoList.className = 'todo-list';
    const todos = project.getTodos();
    fillTodoList(todoList, todos);

    const newTodoButton = document.createElement('button');
    newTodoButton.type = 'button';
    newTodoButton.className = 'new-todo';
    newTodoButton.textContent = 'New todo';

    const dialog = createTodoDialog(project, todoList);
    newTodoButton.addEventListener('click', () => {
        dialog.showModal();
    });
    projectContainer.append(todoList, newTodoButton, dialog);

    return projectContainer;
}


function fillTodoList(todoList, todos) {
    for (const todoId in todos) {
        const todo = todos[todoId];
        const todoFields = todo.getFields();
        const listItem = document.createElement('li');

        const listButton = document.createElement('button');
        listButton.type = 'button';
        listButton.className = 'todo-list-item';
        listButton.dataset.todoId = todoFields.id;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-todo';
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
            delete todos[todoId];
            listItem.remove();
        })

        const todoTitle = document.createElement('span');
        todoTitle.textContent = todoFields.title;
        todoTitle.className = 'todo-list-item-title';
        listButton.appendChild(todoTitle);

        const todoDueDate = document.createElement('span');
        todoDueDate.textContent = todoFields.dueDate;
        todoDueDate.className = 'todo-list-due-date';
        listButton.appendChild(todoDueDate);

        listItem.append(listButton, deleteButton);
        todoList.appendChild(listItem);
    };
}


function createTodoDialog(project, todoList) {
    const dialog = document.createElement('dialog');

    const form = document.createElement('form');
    form.method = 'dialog';
    form.className = 'todo-form';
    dialog.appendChild(form);

    const closeDialogButton = document.createElement('button');
    closeDialogButton.type = 'button';
    closeDialogButton.className = 'close-dialog';
    closeDialogButton.innerHTML = 'X';
    closeDialogButton.addEventListener('click', () => dialog.close());

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'todo-title');
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'todo-title';
    titleInput.name = 'todo-title';
    titleInput.maxLength = 30;
    titleInput.required = true;
    titleInput.autofocus = true;

    const descLabel = document.createElement('label');
    descLabel.setAttribute('for', 'todo-desc');
    descLabel.textContent = 'Description';
    const descTextArea = document.createElement('textarea');
    descTextArea.id = 'todo-desc';
    descTextArea.name = 'todo-desc';
    descTextArea.maxLength = 500;

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'todo-due-date');
    dueDateLabel.textContent = 'Date due';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'todo-due-date';
    dueDateInput.name = 'todo-due-date';
    dueDateInput.min = new Date().toISOString().split('T')[0];
    dueDateInput.value = dueDateInput.min;

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'todo-priority');
    priorityLabel.textContent = 'Priority';
    const priorityInput = document.createElement('input');
    priorityInput.type = 'number';
    priorityInput.id = 'todo-priority';
    priorityInput.name = 'todo-priority';
    priorityInput.min = 1;
    priorityInput.value = priorityInput.min;
    priorityInput.max = 3;
    priorityInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.className = 'submit-todo';
    submitButton.type = 'submit';
    submitButton.textContent = 'Create';

    form.addEventListener('submit', () => {
        const title = titleInput.value;
        const desc = descTextArea.value;
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

        const todo = createTodo(title, desc, dueDate, priority);
        const todoId = todo.getFields().id;
        project.addToDo(todo);
        fillTodoList(todoList, { [todoId]: todo });

        titleInput.value = null;
        descTextArea.value = null;
        dueDateInput.value = dueDateInput.min;
        priorityInput.value = priorityInput.min;
    });

    form.append(
        closeDialogButton,
        titleLabel, titleInput,
        descLabel, descTextArea,
        dueDateLabel, dueDateInput,
        priorityLabel, priorityInput,
        submitButton
    );

    return dialog;
}
