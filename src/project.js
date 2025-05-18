export default function createProject(name) {
    if (name.length > 30) {
        throw new Error('Project name must not be longer than 30 characters.')
    }

    const id = crypto.randomUUID();
    const todos = {};

    function addToDo(todo) {
        todos[todo.getFields().id] = todo;
    }

    function getId() {
        return id;
    }

    function getTodoCount() {
        return todos.length;
    }

    function getTodos() {
        return { ...todos };
    }

    function removeToDo(todoId) {
        delete todos[todoId];
    }


    return { name, addToDo, getId, getTodoCount, getTodos, removeToDo };
}
