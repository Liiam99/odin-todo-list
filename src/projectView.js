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
    todos.forEach((todo) => {
        const todoFields = todo.getFields();
        const listItem = document.createElement('li');

        const listButton = document.createElement('button');
        listButton.type = 'button';
        listButton.className = 'todo-list-item';
        listButton.dataset.todoId = todoFields.id;

        const todoTitle = document.createElement('span');
        todoTitle.textContent = todoFields.title;
        todoTitle.className = 'todo-list-item-title';
        listButton.appendChild(todoTitle);

        listItem.appendChild(listButton);
        todoList.appendChild(listItem);
    });
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

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'todo-priority');
    priorityLabel.textContent = 'Priority';
    const priorityInput = document.createElement('input');
    priorityInput.type = 'number';
    priorityInput.id = 'todo-priority';
    priorityInput.name = 'todo-priority';
    priorityInput.min = 1;
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
        project.addToDo(todo);
        fillTodoList(todoList, [todo]);

        titleInput.value = null;
        descTextArea.value = null;
        dueDateInput.value = null;
        priorityInput.value = null;
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
