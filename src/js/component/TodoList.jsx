import React, { useEffect, useState } from "react";
import Todo from './Todo';
import { createNewTodoList } from './dataSync/todoFechtApi.jsx';

const TodoList = () => {
	
	const [todoList, setTodoList] = useState([
		{id: 0 , description: "Make the Bed "},
		{id: 1, description: "Wash my hands"},
		{id: 2 , description: "Eat"},
		{id: 3, description: "Walk the dog"}]);
	
	const [newTodo, setNewTodo] = useState('');

	useEffect(() => {
		createNewTodoList('aestradap');
	},[]);
	
	const handlerSummitTask = (e) => {
		if (e.key === "Enter"){
			setTodoList([
				...todoList,
				{
					id: todoList.length,
					description:newTodo
				}
			]);
			setNewTodo('');
		}
	}

	const handlerEdit = (id, description) => {
		console.log(id,description)
        let newList = [...todoList];
		newList[id] = {id:id, description: description};
		setTodoList(newList);
    }

	const handlerDelete = (id) => {
		const newList = todoList.filter(todo => todo.id != id)
        setTodoList(newList);
    }

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">TO-DOS</h1>
			<div className="container text-center">
				
				<input type="text" 
							className="form-control border border-0 fs-3" 
							placeholder="Write a to-do..." 
							aria-label="Recipient's username"
							aria-describedby="button-addon2"
							onChange={ e => setNewTodo(e.target.value)}
							onKeyDown={e => handlerSummitTask(e)}
							value={newTodo}
						/>
				
				<div className="row mt-4">
					<div className="col"/>
					<div className="col-8 paper py-2">
						{ todoList.length > 0
							?
								todoList.map(todo => (
									<>
									<Todo
										key={todo.id}
										todo={todo}
										todoList={todoList}
										setTodoList={setTodoList}
										handlerDelete={handlerDelete}
										handlerEdit={handlerEdit}
									/>
									<hr className="border border-danger border-2 opacity-50"></hr>
									</>
								))
							: <p>"No tasks, add a task"</p>
						}
						{
							todoList.length > 0
							? <div className="d-flex justify-content-start">
									<p className="my-2" 
										style={{color:'rgb(108,117,125)'}}
									>
										{todoList.length} item left
									</p>
								</div>	
							:null
						}
					</div>
					<div className="col"/>
				</div>
			</div>	
		</div>
	);
};

export default TodoList;
