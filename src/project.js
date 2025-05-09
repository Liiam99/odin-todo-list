export default function createProject(name) {
    if (name.length > 30) {
        throw new Error('Project name must not be longer than 30 characters.')
    }

    const id = crypto.randomUUID();
    const todos = [];

    function addToDo(todo) {
        todos.push(todo);
    }

    function removeToDo(todo) {
        todos.splice(todos.indexOf(todo), 1);
    }

    function getTodoCount() {
        return todos.length;
    }

    function getId() {
        return id;
    }

    return { name, addToDo, getId, getTodoCount, removeToDo };
}
