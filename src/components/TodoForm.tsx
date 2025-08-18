import AddIcon from '@mui/icons-material/Add';
import { addTodo } from '../features/todo/todoSlice';
import { useEffect, useState } from 'react';
import type { Todo } from '../types';
import { useDispatch } from 'react-redux';

interface TodoForm {
    setTodoErr: React.Dispatch<React.SetStateAction<string>>;
}

const TodoForm = ({ setTodoErr }: TodoForm) => {
    const dispatch = useDispatch();
    const [todo, setTodo] = useState<Todo>({
        id: '',
        task: '',
        completed: false,
    });
    const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTodo((prevState) => ({ ...prevState, task: value }));
    };
    useEffect(() => {
        setTodo({
            id: '',
            task: '',
            completed: false,
        });
    }, []);
    const validTodo = {
        ...todo,
        id: crypto.randomUUID(),
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validTodo.task) {
            dispatch(addTodo(validTodo));
            setTodo({
                id: '',
                task: '',
                completed: false,
            });
        } else {
            setTodoErr('Please add a todo before adding...');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-6 p-8">
            <div className="text-xl flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Add your Todo..."
                    aria-label="add todo"
                    className="rounded-md shadow-[inset_2px_2px_8px_rgba(0,0,0,0.5)] dark:shadow-[inset_2px_2px_8px_rgba(0,0,0,0.5)] py-3 px-4 outline-0 w-sm text-blue-900 dark:text-gray-200"
                    value={todo.task}
                    onChange={handleTodoChange}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 active:inset-shadow-sm active:inset-shadow-blue-900 px-4 py-2 rounded-md outline-0 cursor-pointer"
            >
                <AddIcon fontSize="large" />
            </button>
        </form>
    );
};

export default TodoForm;
