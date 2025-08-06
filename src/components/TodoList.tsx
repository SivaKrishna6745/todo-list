import { useDispatch, useSelector } from 'react-redux';
import type { Todo } from '../types';
import type { RootState } from '../features/store';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { toggleTodo, deleteTodo } from '../features/todo/todoSlice';

interface TodoListProps {
    setEditingTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>;
}

const TodoList = ({ setEditingTodo }: TodoListProps) => {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const handleEditTodo = (id: string) => {
        const theEditingTodo = todos.find((todo) => todo.id === id);
        setEditingTodo(theEditingTodo);
    };
    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    };

    return (
        <ul className="w-full">
            {todos.map((todo: Todo) => {
                return (
                    <li key={todo.id} className="m-2 text-xl p-2 capitalize tracking-wide flex gap-4 items-center">
                        <div className="flex">
                            <input
                                type="checkbox"
                                id="check"
                                className="hidden peer"
                                onChange={() => dispatch(toggleTodo(todo.id))}
                            />
                            <label
                                htmlFor="check"
                                className="flex justify-center items-center p-1 rounded-full cursor-pointer bg-gray-400 peer-checked:bg-green-500"
                            >
                                <DoneIcon fontSize="small" />
                            </label>
                        </div>
                        <span
                            className={`flex-1 ${todo.completed === true ? 'opacity-50 line-through' : 'opacity-100'}`}
                        >
                            {todo.task}
                        </span>
                        <button
                            className="p-2 bg-red-400 rounded-md cursor-pointer flex items-center"
                            onClick={() => handleEditTodo(todo.id)}
                        >
                            <EditIcon />
                        </button>
                        <button
                            className="p-2 bg-red-400 rounded-md cursor-pointer flex items-center"
                            onClick={() => handleDeleteTodo(todo.id)}
                        >
                            <DeleteIcon />
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default TodoList;
