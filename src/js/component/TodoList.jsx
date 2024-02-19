import React, { useEffect, useState } from "react";
import Todo from './Todo';
import { createData, getData, updateData } from './dataSync/todoFechtApi.jsx';

const TodoList = () => {
	
	const [todoList, setTodoList] = useState([]);
	
	const [newTodo, setNewTodo] = useState('');

	const [currentUser, setCurrentUser] = useState('aestradap');
	
	const [users, setUsers] = useState(['aestradap']);
	
	const [newUser, setNewUser] =useState('');

	useEffect(() => {
		
		getUserTodoList(currentUser);		
	},[]);

	// useEffect(() => {
		
	// 	getUserTodoList(currentUser);		
	// },[currentUser]);


	const getUserTodoList = async (defaultUser) => {
		const defaultUserTodoList  = await getData(defaultUser);
		if(!defaultUserTodoList.error){
			setTodoList(defaultUserTodoList);
		} else {
			const newUserTodoList  = await createData(defaultUser);
			
			if(!newUserTodoList.error) setTodoList(newUserTodoList);
		}
	};


	const updateTodoList = async (defaultUser, todos) => {
        const dataToPut = todos.flatMap( todo => (
			todo && [{label: todo.label, done: false }]
		));
		const newUpdatedTodoList  = await updateData(defaultUser, dataToPut);
		console.log(newUpdatedTodoList)
		if(!newUpdatedTodoList.error) 
		await getUserTodoList(defaultUser);
	};

	
	const handlerSummitUser = (event) => {
		if (event.key === "Enter" && users.length >= 1){
			let newUsers = users;
			newUsers.push(newUser);
			setUsers(newUsers);
			setNewUser('');
			setCurrentUser(newUser);
			getUserTodoList(newUser);
		}
	}

	const handlerChangeUser = (event) => {
		setCurrentUser(event.target.value);
	}

	const handlerSummitTask = (event) => {
		console.log(event.target.value)
		if (event.key === "Enter" && todoList){
			let newList = todoList;
			newList.push({
				done: false,
				id: todoList.length,
				label:newTodo
			});

			updateTodoList(currentUser, newList);
			setNewTodo('');
		}
	}

	const handlerEdit = (id, newlabel) => {
       const newList = todoList.map(todo => {
		 if( todo.id === id ){
			todo.label = newlabel;
			return todo;
		 }});
		updateTodoList(currentUser, newList);
    }

	const handlerDelete = (id) => {
		const newList = todoList.filter(todo => todo.id != id);
		updateTodoList(currentUser, newList);
    }

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">TO-DOS</h1>
			
			<div className="container text-center">
				<div className="row mt-4">
					<div className="col"/>
					<div className="col-4 pb-4">
					<div className="input-group input-group-lg">
  						<span className="input-group-text" id="inputGroup-sizing-lg">new user</span>
  						<input type="text"
							className="form-control"
							aria-label="Sizing example input" 
							aria-describedby="inputGroup-sizing-lg"
							onChange={ event => setNewUser(event.target.value)}
							onKeyDown={event => handlerSummitUser(event)}
							value={newUser}
						/>
					</div>
					</div>
					<div className="col-4 pb-4">
						<select className="form-select form-select-lg mb-3"
						 	aria-label="Large select example"
							onChange={event => handlerChangeUser(event)}
						>
							{
								users.map((user, index)=>(<>
									<option selected key={index} value={user}>{user}</option>
								</>))
							}
						</select>
					</div>
					<div className="col"/>
				</div>

				
				<input type="text" 
							className="form-control border border-0 fs-3" 
							placeholder="Write a to-do..." 
							aria-label="Recipient's username"
							aria-describedby="button-addon2"
							onChange={ event => setNewTodo(event.target.value)}
							onKeyDown={event => handlerSummitTask(event)}
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
