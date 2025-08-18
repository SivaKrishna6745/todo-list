import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Bedtime, Sunny } from '@mui/icons-material';

function App() {
    const [todoErr, setTodoErr] = useState<string>('');
    const [theme, setTheme] = useState<string>('');
    const toggleLightDarkMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    useEffect(() => {
        document.documentElement.className = theme === 'dark' ? 'dark' : '';
    }, [theme]);

    return (
        <div className="mt-5 p-4 bg-sky-50 dark:bg-sky-950 rounded-lg flex flex-col items-center w-[40vw] min-h-[50vh] m-auto">
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
            <TodoForm setTodoErr={setTodoErr} />
            <TodoList todoErr={todoErr} />
        </div>
    );
}

export default App;
