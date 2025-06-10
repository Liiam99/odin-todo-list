export default function loadTodoView(todo) {
    const todoContainer = document.createElement('div');
    todoContainer.id = 'todo';

    const todoForm = createTodoForm(todo);

    todoContainer.append(todoForm);

    return todoContainer;
}


function createTodoForm(todo) {
    const todoFields = todo.getFields();

    const form = document.createElement('form');
    form.className = 'todo-form';

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'todo-title');
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.value = todoFields.title;
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
    descTextArea.value = todoFields.description;
    descTextArea.id = 'todo-desc';
    descTextArea.name = 'todo-desc';
    descTextArea.maxLength = 500;

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'todo-due-date');
    dueDateLabel.textContent = 'Date due';
    const dueDateInput = document.createElement('input');
    dueDateInput.value = todoFields.dueDate;
    dueDateInput.type = 'date';
    dueDateInput.id = 'todo-due-date';
    dueDateInput.name = 'todo-due-date';
    dueDateInput.min = new Date().toISOString().split('T')[0];

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'todo-priority');
    priorityLabel.textContent = 'Priority';
    const priorityInput = document.createElement('input');
    priorityInput.value = todoFields.priority;
    priorityInput.type = 'number';
    priorityInput.id = 'todo-priority';
    priorityInput.name = 'todo-priority';
    priorityInput.min = 1;
    priorityInput.max = 3;
    priorityInput.required = true;

    const completionLabel = document.createElement('label');
    completionLabel.setAttribute('for', 'todo-completion');
    completionLabel.textContent = 'Completed?';
    const completionInput = document.createElement('input');
    completionInput.checked = todoFields.isComplete;
    completionInput.type = 'checkbox';
    completionInput.name = 'todo-completion';
    completionInput.id = 'todo-completion';

    const saveButton = document.createElement('button');
    saveButton.className = 'save-todo';
    saveButton.type = 'submit';
    saveButton.textContent = 'Save';

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        todo.setTitle(titleInput.value);
        todo.setDescription(descTextArea.value);
        todo.setDueDate(dueDateInput.value);
        todo.setPriority(priorityInput.value);
        todo.setCompletion(completionInput.checked);
    });

    form.append(
        titleLabel, titleInput,
        descLabel, descTextArea,
        dueDateLabel, dueDateInput,
        priorityLabel, priorityInput,
        completionLabel, completionInput,
        saveButton,
    );

    return form;
}
