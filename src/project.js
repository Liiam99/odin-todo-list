export default function createProject(title) {
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

    return { title, addToDo, getTodoCount, removeToDo };
}
