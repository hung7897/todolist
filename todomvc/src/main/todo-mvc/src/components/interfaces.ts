//Interface of current task
interface IState{
    currentTask: string;
    tasks: Array<ITask>;
    isLoading : boolean;
    notCompleted: number;
}
//Interface Task
interface ITask{
    id: number;
    value: string;
    completed: boolean;
}

interface TodoProps {
}
