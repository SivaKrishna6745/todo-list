export type Priority = 'low' | 'medium' | 'high';

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    priority: Priority;
};
