import react, { useState, useEffect } from "react";  // eslint-disable-line no-unused-vars
import './App.css';
import Axios from "axios";
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from "react-router-dom"; // eslint-disable-line no-unused-vars
function App() {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [userListem, setUserListem] = useState(""); 
  const [userListPass, setUserListpass] = useState(""); 
  const [userListem1, setUserListem1] = useState(""); 
  const [userListPass1, setUserListpass1] = useState(""); 

  useEffect(() => {
      Axios.get("http://localhost:3001/api/get").then((response) => {
        console.log(response.data);
        //setUserList(response.data);
        setUserListem(response.data[0].email);
        setUserListpass(response.data[0].password);
        setUserListem1(response.data[0].email);
        setUserListpass1(response.data[0].password);
      });
  }, []);

  const LoginUser = () => {
    Axios.post("http://localhost:3001/api/insert", {
      UserEmail: Email, 
      UserPassword: Password,
    }).then(() => {
        alert('Successfully insert');
    });
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <div className="form">
        <label>Email ID:</label>
        <input type='text' name='Email' onChange={(e)=> {
          setEmail(e.target.value)
        }}/>
        <label>Password:</label>
        <input type='text' name='Password' onChange={(e)=> {
          setPassword(e.target.value)
        }}/>
        <button onClick={LoginUser}>Login</button>
       
      </div>
      <h1>Email: {userListem} | Password:{userListPass}</h1>
      <h1>Email: {userListem1} | Password:{userListPass1}</h1>

    </div>
  );
}

/*
 {userList.map((val) => {
             return (
              
             <h1>Email: {val.UserEmail} | Password: {val.UserPassword} </h1>
             );
        })};*/

export default App;
