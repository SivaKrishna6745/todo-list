import { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import type { Todo } from './types';

function App() {
    const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);

    return (
        <div className="mt-5 p-4 bg-black/50 rounded-2xl flex flex-col justify-center items-center w-[60vh] m-auto">
            <TodoForm editingTodo={editingTodo} />
            <TodoList setEditingTodo={setEditingTodo} />
        </div>
    );
}

export default App;
