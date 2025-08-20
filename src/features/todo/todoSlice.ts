import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../../types';

export type todoState = {
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
        updateTodo: (state: todoState, action: PayloadAction<{ id: string; changes: Partial<Todo> }>) => {
            const todoIndex = state.todos.findIndex((todo: Todo) => todo.id === action.payload.id);
            if (todoIndex !== -1) Object.assign(state.todos[todoIndex], action.payload.changes);
        },
        deleteTodo: (state: todoState, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo: Todo) => todo.id !== action.payload);
        },
        toggleTodo: (state: todoState, action: PayloadAction<string>) => {
            state.todos = state.todos.map((todo: Todo) =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        },
        sortByPriority: (state: todoState, action: PayloadAction<string>) => {
            const sortOrder = action.payload;
            state.todos.sort((a, b) => {
                const priorityOrder = { high: '3', medium: '2', low: '1' };
                const aPriority = priorityOrder[a.priority] || 0;
                const bPriority = priorityOrder[b.priority] || 0;
                if (sortOrder === 'highToLow') {
                    // Sort from high to low (e.g., 3, 2, 1)
                    if (bPriority > aPriority) return 1;
                    if (bPriority < aPriority) return -1;
                } else {
                    // 'lowToHigh'
                    // Sort from low to high (e.g., 1, 2, 3)
                    if (aPriority > bPriority) return 1;
                    if (aPriority < bPriority) return -1;
                }
                return 0;
            });
        },
    },
});

export const { addTodo, updateTodo, deleteTodo, toggleTodo, sortByPriority } = todoSlice.actions;
export default todoSlice.reducer;
