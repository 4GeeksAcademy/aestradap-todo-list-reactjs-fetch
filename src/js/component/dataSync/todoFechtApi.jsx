


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
        return data;
    } else {
        console.log('error: ', response.status, response.statusText, data.message, data.msg);
        return {error: {status: response.status, statusText: response.statusText, message: data.message}};
    };
};

//get a existing todoList for a user
export const getData = async (username) => {
  const response = await fetch(`${apiUrl}user/${username}`);
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
export const updateData = async () => {
    const response = await fetch(`${apiUrluser/}`, {
        method: 'PUT',
        body: JSON.stringify(dataToSend),  // the variable dataToSend can be a 'string' or an {object} that comes from somewhere else in our application
        headers: {
           'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log('error: ', response.status, response.statusText);
        /* Handle the error returned by the HTTP request */
        return {error: {status: response.status, statusText: response.statusText}};
    };
};



// [PUT] /todos/user/<username>
//       Content-Type: "application/json"
//       BODY:
//           [
//               { label: "Make the bed", done: false },
//               { label: "Walk the dog", done: false },
//               { label: "Do the replits", done: false }
//           ]

//   RESPONSE:
//       {
//           "result": "A list with 3 todos was succesfully saved"
//       }

//       	// const [todoList, setTodoList] = useState([
// 	// 	{done: false ,id:'',label: ""} 
// 	// 	{id: 0 , label: "Make the Bed "},
// 	// 	{id: 1, label: "Wash my hands"},
// 	// 	{id: 2 , label: "Eat"},
// 	// 	{id: 3, label: "Walk the dog"}]);