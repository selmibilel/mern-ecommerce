import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./login.css";

import {login} from "../../redux/apiCalls";

const Login = () => {
    const [username, setUsername]= useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();


    const handleClick = (e)=>{
        e.preventDefault();
        login(dispatch,{username, password});
    }
    return (
        <div className='loginFormContainer'>
            <form className="loginForm">
                <input 
                type="text" 
                className='loginInput' 
                placeholder='username' 
                onChange={(e)=>setUsername(e.target.value)}
                />
                <input 
                type="password" 
                className='loginInput' 
                placeholder='password' 
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button 
                    className='buttonLogin' 
                    onClick={handleClick}
                    type='submit'
                    >
                    LOGIN
                </button>
            </form>
        </div>
    )
}

export default Login
