interface BaseTodo{
    name: string;
}

interface Todo extends BaseTodo {
    _id?: number;
    done: boolean,
    todolistId?: number
}

interface TodoList extends BaseTodo{
    name: string;
    _id: number;
}

export type { Todo, TodoList, BaseTodo };