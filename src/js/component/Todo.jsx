import React, { useState } from "react";
import { SdCard, X } from 'react-bootstrap-icons';


const Todo = ({todo, handlerEdit, handlerDelete}) => {

  const {id, description} = todo;
	const [myTodo, setMyTodo] = useState(description);

  const [display, setDisplay] = useState("notdisplayed");

  const showButton = e => {
    e.preventDefault();
    setDisplay("displayed");
  };

  const hideButton = e => {
    e.preventDefault();
    setDisplay("notdisplayed");
  };

	return <>
  <div className="input-group pt-2 mb-3" >
      <input type="text" 
              className="form-control border border-0 fs-3" 
              placeholder="Write a to-do..."
              onMouseEnter={e => showButton(e)}
              onMouseLeave={e => hideButton(e)} 
              onChange={e => setMyTodo( e.target.value )}
              value={myTodo}
      />
      
      {
      description !== myTodo
        ?  
        <div className="d-flex"
          onMouseEnter={e => showButton(e)}
          onMouseLeave={e => hideButton(e)}
          >
          <button className="btn btn-outline-light border border-0"
            type="button"
            id="button-addon2"
            onClick={() => handlerEdit( id, myTodo )}
          >
                <SdCard color="red" size={25} />
          </button> 
        </div>
        : null   
      }

      <div className="d-flex"
        onMouseEnter={e => showButton(e)}
        onMouseLeave={e => hideButton(e)}
      >
        <button 
          className= {`${display} btn btn-outline-light  border border-0 mx-10`}
            type="button"
            id="button-addon2"
            onClick={()=>{handlerDelete(id)}}
            
          >     
            <X color="red" size={42} />
        </button> 
      </div>    

      <br/>     

  </div>
 
</>
             
};

export default Todo;
