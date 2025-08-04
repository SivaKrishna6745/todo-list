import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../../types';

type todoState = {
    todos: Todo[];
};

const initialState: todoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state: todoState, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },
        editTodo: (state: todoState, action: PayloadAction<{ id: string; changes: Partial<Todo> }>) => {
            const todoIndex = state.todos.findIndex((todo: Todo) => todo.id === action.payload.id);
            if (todoIndex !== -1) Object.assign(state.todos[todoIndex], action.payload);
        },
        deleteTodo: (state: todoState, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo: Todo) => todo.id !== action.payload);
        },
    },
});

export const { addTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
