import { useEffect, useRef, useState } from 'react';
import type { Todo } from '../types';
import { SaveAlt } from '@mui/icons-material';
import { Done, Edit, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo, updateTodo } from '../features/todo/todoSlice';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [editedValue, setEditedValue] = useState<string>(todo.task);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    useEffect(() => {
        if (isEditing && inputRef.current) inputRef.current.focus();
    }, [isEditing]);
    const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEditedValue(value);
    };
    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    };

    return (
        <>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedValue}
                        className="rounded-md inset-shadow-[0_0_5px] inset-shadow-cyan-800 py-3 px-4 flex-1 outline-0"
                        ref={inputRef}
                        onChange={handleEditingChange}
                    />
                    <button
                        className="bg-blue-400 px-4 py-2 rounded-lg cursor-pointer"
                        onClick={() => {
                            dispatch(updateTodo({ id: todo.id, changes: { ...todo, task: editedValue } }));
                            setIsEditing(false);
                        }}
                    >
                        <SaveAlt />
                    </button>
                </>
            ) : (
                <>
                    <div className="flex">
                        <input
                            type="checkbox"
                            id={todo.id}
                            className="hidden peer"
                            onChange={() => dispatch(toggleTodo(todo.id))}
                        />
                        <label
                            htmlFor={todo.id}
                            className="flex justify-center items-center p-1 rounded-full cursor-pointer bg-gray-400 peer-checked:bg-green-500"
                        >
                            <Done fontSize="small" />
                        </label>
                    </div>
                    <span
                        className={`flex-1 ${
                            todo.completed === true ? 'opacity-50 line-through' : 'opacity-100'
                        } text-blue-900 dark:text-gray-200`}
                    >
                        {todo.task}
                    </span>
                    <button
                        className="p-2 bg-cyan-500 rounded-md cursor-pointer flex items-center"
                        onClick={() => setIsEditing(true)}
                    >
                        <Edit />
                    </button>
                    <button
                        className="p-2 bg-red-600 rounded-md cursor-pointer flex items-center"
                        onClick={() => handleDeleteTodo(todo.id)}
                    >
                        <Delete />
                    </button>
                </>
            )}
        </>
    );
};

export default TodoItem;
