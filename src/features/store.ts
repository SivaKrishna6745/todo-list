import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';

const rootReducer = {
    todos: todoReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
