import { useSelector } from 'react-redux';
import type { Todo } from '../types';
import type { RootState } from '../features/store';

import TodoItem from './TodoItem';

interface TodoListProps {
    todoErr: string;
}

const TodoList = ({ todoErr }: TodoListProps) => {
    const todos = useSelector((state: RootState) => state.todos.todos);

    return (
        <>
            {todos.length > 0 ? (
                <ul className="w-[80%]">
                    {todos.map((todo: Todo) => {
                        return (
                            <li
                                key={todo.id}
                                className="m-2 text-xl p-2 capitalize tracking-wide flex gap-4 items-center"
                            >
                                <TodoItem todo={todo} />
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-2xl text-red-400 tracking-wider">{todoErr}</p>
            )}
        </>
    );
};

export default TodoList;
