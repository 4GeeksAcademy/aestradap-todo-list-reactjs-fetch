import React, { useEffect, useState } from "react";
import Todo from './Todo';
import { createData, getData, updateData } from './dataSync/todoFechtApi.jsx';

const TodoList = () => {
	
	const [todoList, setTodoList] = useState([]);
	
	const [newTodo, setNewTodo] = useState('');

	useEffect(() => {
		//createNewTodoList('aestradap');
		getUserTodoList('aestradap');		
	},[]);

	const getUserTodoList = async (defaultUser) => {
		const defaultUserTodoList  = await getData(defaultUser);
		if(!defaultUserTodoList.error) setTodoList(defaultUserTodoList);
	};

	const createNewTodoList = async (defaultUser) => {
		const defaultUserTodoList  = await createData(defaultUser);
		if(!defaultUserTodoList.error) setTodoList(defaultUserTodoList);
	};

	const updateTodoList = async (defaultUser, todos) => {
        const dataToPut = todos.flatMap( todo => (
			todo && [{label: todo.label, done: false }]
		));
		const newUpdatedTodoList  = await updateData(defaultUser, dataToPut);
		console.log(newUpdatedTodoList)
		if(!newUpdatedTodoList.error) 
			getUserTodoList(defaultUser);
	};
	
	const handlerSummitTask = (e) => {
		if (e.key === "Enter"){
			let newList = todoList;
			newList.push({
				done: false,
				id: todoList.length,
				label:newTodo
			});

			updateTodoList('aestradap', newList);
			setNewTodo('');
		}
	}

	const handlerEdit = (id, newlabel) => {
       const newList = todoList.map(todo => {
		 if( todo.id === id ){
			todo.label = newlabel;
			return todo;
		 }});
		updateTodoList('aestradap', newList);
    }

	const handlerDelete = (id) => {
		const newList = todoList.filter(todo => todo.id != id);
		updateTodoList('aestradap', newList);
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
