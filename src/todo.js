export default function createTodo(title, description, dueDate, priority) {
    const id = crypto.randomUUID();
    let isComplete = false;

    function setTitle(newTitle) {
        title = newTitle;
    }

    function setDescription(newDescription) {
        description = newDescription;
    }

    function setDueDate(newDueDate) {
        dueDate = newDueDate;
    }

    function setPriority(newPriority) {
        priority = newPriority;
    }

    function setCompletion(completion) {
        isComplete = completion;
    }

    function getFields() {
        return {
            id,
            title,
            description,
            dueDate,
            priority,
            isComplete,
        };
    }

    return { setTitle, setDescription, setDueDate, setPriority,
        setCompletion, getFields };
}
