export default function createProject(name) {
    if (name.length > 30) {
        throw new Error('Project name must not be longer than 30 characters.')
    }

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

    return { name, addToDo, getTodoCount, removeToDo };
}
