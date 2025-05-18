export default function createProject(name) {
    if (name.length > 30) {
        throw new Error('Project name must not be longer than 30 characters.')
    }

    const id = crypto.randomUUID();
    const todos = [];

    function addToDo(todo) {
        todos.push(todo);
    }

    function getId() {
        return id;
    }

    function getTodoCount() {
        return todos.length;
    }

    function getTodos() {
        return [...todos];
    }

    function removeToDo(todo) {
        todos.splice(todos.indexOf(todo), 1);
    }


    return { name, addToDo, getId, getTodoCount, getTodos, removeToDo };
}
