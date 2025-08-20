import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Bedtime, Sunny } from '@mui/icons-material';
import type { Todo } from './types';

function App() {
    const [todo, setTodo] = useState<Todo>({
        id: '',
        task: '',
        completed: false,
        priority: 'low',
    });
    const [todoErr, setTodoErr] = useState<string>('');
    const [theme, setTheme] = useState<string>('');
    const toggleLightDarkMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    useEffect(() => {
        document.documentElement.className = theme === 'dark' ? 'dark' : '';
    }, [theme]);

    return (
        <div className="mt-5 p-4 bg-sky-50 dark:bg-sky-950 rounded-lg flex flex-col items-center w-[50vw] min-h-[50vh] m-auto">
            <div className="flex items-center gap-8">
                <h1 className="text-2xl text-slate-900 dark:text-gray-200">Todo List</h1>
                <button
                    onClick={toggleLightDarkMode}
                    className="relative inline-flex items-center cursor-pointer outline-0 h-7 w-14 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.5)] rounded-full"
                >
                    <span
                        className={`inline-block h-full w-5 transform transition-transform duration-300 ${
                            theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                        }`}
                    >
                        {theme === 'dark' ? <Sunny color="warning" /> : <Bedtime color="success" />}
                    </span>
                </button>
            </div>
            <TodoForm todo={todo} setTodo={setTodo} setTodoErr={setTodoErr} />
            <TodoList setTodo={setTodo} todoErr={todoErr} />
        </div>
    );
}

export default App;
