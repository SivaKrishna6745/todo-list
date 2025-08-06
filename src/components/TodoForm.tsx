import AddIcon from '@mui/icons-material/Add';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { addTodo, editTodo } from '../features/todo/todoSlice';
import { useEffect, useState } from 'react';
import type { Todo } from '../types';
import { useDispatch } from 'react-redux';

interface TodoForm {
    editingTodo?: Todo;
}

const TodoForm = ({ editingTodo }: TodoForm) => {
    const dispatch = useDispatch();
    const [todo, setTodo] = useState<Todo>(
        editingTodo || {
            id: '',
            task: '',
            completed: false,
        }
    );
    const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTodo((prevState) => ({ ...prevState, task: value }));
    };
    useEffect(() => {
        if (editingTodo) setTodo((prevState) => ({ ...prevState, task: editingTodo.task }));
        else
            setTodo({
                id: '',
                task: '',
                completed: false,
            });
    }, [editingTodo]);
    const validTodo = {
        ...todo,
        id: crypto.randomUUID(),
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingTodo) {
            dispatch(editTodo({ id: editingTodo.id, changes: todo }));
        } else {
            dispatch(addTodo(validTodo));
            setTodo({
                id: '',
                task: '',
                completed: false,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-8 p-8">
            <div className="text-xl flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Add your Todo..."
                    aria-label="add todo"
                    className="border-b-2 border-cyan-500 py-2 outline-0 w-sm"
                    value={todo.task}
                    onChange={handleTodoChange}
                />
            </div>
            <button type="submit" className="bg-blue-400 px-4 py-2 rounded-lg cursor-pointer">
                {editingTodo ? <SaveAltIcon fontSize="large" /> : <AddIcon fontSize="large" />}
            </button>
        </form>
    );
};

export default TodoForm;
