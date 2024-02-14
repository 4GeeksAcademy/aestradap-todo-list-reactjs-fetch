


const apiUrl = 'https://playground.4geeks.com/apis/fake/todos/';

export const createNewTodoList = async ( username ) => {
    const response = await fetch(`${apiUrl}user/${username}`, {
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
fetch("https://playground.4geeks.com/apis/fake/todos/user/aestradap", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,es-US;q=0.8,es;q=0.7",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrerPolicy": "same-origin",
  "body": "",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});