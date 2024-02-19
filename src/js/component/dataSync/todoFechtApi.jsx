


const apiUrl = 'https://playground.4geeks.com/apis/fake/todos/user/';

//Create new Todo-list for especific user
export const createData = async ( username ) => {
    const response = await fetch(`${apiUrl}${username}`, {
        method: 'POST',
        body: '[]',  
        headers: {
           'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data.message);
        return await getData(username);
    } else {
        console.log('error: ', response.status, response.statusText, data.message, data.msg);
        return {error: {status: response.status, statusText: response.statusText, message: data.message}};
    };
};

//get a existing todoList for a user
export const getData = async (username) => {
  const response = await fetch(`${apiUrl}${username}`);
  if (response.ok) {
      const data = response.json();
      console.log(data);
      return data;
  } else {
      console.log('error: ', response.status, response.statusText);
      return {error: {status: response.status, statusText: response.statusText}};
  };
};

//update the entire todolist for a user
export const updateData = async (username, data) => {
    console.log(JSON.stringify(data))
    const response = await fetch(`${apiUrl}${username}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
           'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log('error: ', response.status, response.statusText);
        return {error: {status: response.status, statusText: response.statusText}};
    };
};

export const deleteData = async (username) => {
    const response = await fetch(`${apiUrl}${username}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log('error: ', response.status, response.statusText);
        return {error: {status: response.status, statusText: response.statusText}};
    };
};




//  // const [todoList, setTodoList] = useState([
// 	// 	{done: false ,id:'',label: ""} 
// 	// 	{id: 0 , label: "Make the Bed "},
// 	// 	{id: 1, label: "Wash my hands"},
// 	// 	{id: 2 , label: "Eat"},
// 	// 	{id: 3, label: "Walk the dog"}]);