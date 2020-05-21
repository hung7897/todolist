import * as React from "react";

export class App extends React.Component<{}, IState>{
	constructor(props: {}){
		super(props);

		this.state = {
			currentTask: "",
			tasks:[],
			isLoading:false,
			notCompleted:0
		};
	}
	//Add Todo
	async addTodo(e:any) {
		//prevent re-loading pages
		e.preventDefault();
		this.setState(
			{
				currentTask:""
			}
		)
		//this 'tasks' is created to POST into server
		const tasks =
			{
				id: this._timeInMiliseconds(),
				value: this.state.currentTask,
				completed: false
			};
		//console.log(JSON.stringify(tasks));
		await fetch('/api/todos', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(tasks)
		});
		//re-fetch data from server
		this.componentDidMount();
	}

	/**
	 * this method about edit todos by PUT method.
	 */
	async editTodo(e:any,id:any) {
		//prevent re-loading pages
		e.preventDefault();
		//check if currentTask isn't null
		if (this.state.currentTask != "") {
			this.setState(
				{
					currentTask: ""
				}
			)
			//set this tasks with different value to PUT into server
			const tasks =
				{
					id: id,
					value: this.state.currentTask,
					completed: false
				};
			//console.log(JSON.stringify(tasks));
			//debugger;
			await fetch(`/api/todos/${id}`, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(tasks)
			});
			//re-fetch data from server after edit todos
			this.componentDidMount();
		}
	}

	/**
	 * this method about delete todos by DELETE method.
	 */
    async remove(e:any,id: any) {
		//prevent re-loading pages
		e.preventDefault();
        await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
		//re-fetch data from server after delete todos
		this.componentDidMount();
    }
	/**
	 * this method about change completed's state todos by PUT method.
	 */
    async toggleTodo(e:any,id: any) {
		//prevent re-loading pages
		e.preventDefault;
        await fetch(`/api/todos/toggle/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
		//re-fetch data from server after delete todos
        this.componentDidMount();
        ;
    }

	/**
	 * Clear todos had completed's state = true
	 * @param e
	 */
	async clearTodoCompleted(e:any){
		//prevent re-loading pages
		e.preventDefault();
		await fetch('/api/todos/clearCompleted',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		//re-fetch data from server after delete todos
		this.componentDidMount();
	}

	/**
	 * fetch data from server
	 */
	async componentDidMount() {
        this.setState({isLoading: true});
        fetch('/api/todos')
            .then(response => response.json())
            .then(data => this.setState({tasks: data, isLoading: false}));

    }

	public renderTasks(): JSX.Element[]{
		return this.state.tasks.map((task: ITask, index: number) =>{
			return(

				<div key={task.id} >
					<input type="checkbox" defaultChecked={task.completed ? true : false} name="checkbox1"
					  	 onClick={()=>this.toggleTodo(event,task.id)}/>
					<span className={task.completed ? "is-completed" : "not-completed"}>{task.value}</span>
					<button onClick={()=>this.remove(event,task.id)} >Delete</button>
					<button onClick={()=>this.editTodo(event,task.id)} >Edit</button>
				</div>
				)
		});
	}
	public render(): JSX.Element{
		console.log(this.state);
		const {tasks, isLoading} = this.state;
		return (
		<div className="todoapp">
				<h1 >todos</h1>
				<form onSubmit={this.addTodo.bind(this)}>
					<input id = "demo" type="text" className="todolist-input" placeholder="What needs to be done?"
							value = {this.state.currentTask}
							onChange={e => this.setState({currentTask: e.target.value})}
							/>
					<button type="submit" className="button-add"> Add todo </button>
				</form>
				<div >
					<form>
						<section>{this.renderTasks()}</section>
						<button onClick={()=>this.clearTodoCompleted(event)}>Clear Completed </button>
					</form>
				</div>
		</div>
			)

	}
	// this method get current second to become id of task
	private _timeInMiliseconds(): number{
		const date: Date = new Date();
		return date.getSeconds();
	}
}
