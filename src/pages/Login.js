import {BlogContext} from "../context/BlogContext"
import React, {useContext, useState} from 'react'
import { useHistory } from "react-router";
import { userlogin } from '../utils/Functions';

const Login = () => {
    const history = useHistory();
    const {setislogin, setlogininfo} = useContext(BlogContext);
    const [username, setusername] = useState(sessionStorage.getItem('username'));
    const [password, setpassword] = useState(sessionStorage.getItem('password'));
    const [Error, setError] = useState()

    const handleSubmit =  async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let infologin = {};
        data.forEach(function (value, key) {
        infologin[key] = value;
        });
        sessionStorage.setItem('username',username)
        sessionStorage.setItem('password',password)

        await userlogin(infologin,setlogininfo,setislogin,setError,history)
             
       };
     
    
    return (
        <div className='container col-6 mt-5'>
            
              <h2 className="text-center text-primary fw-bold fs-1 mb-5"><i className="bi bi-person-circle me-2" /> Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input name='email'type="email" className="form-control"  aria-describedby="emailHelp" />
                    <div className="form-text">OR</div>

                    <label className="form-label">User Name</label>
                    <input name='username' value={username} onChange={(e)=> setusername(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" />
                   
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input name='password'type="password" value={password} onChange={(e)=> setpassword(e.target.value)}  className="form-control"  />
                </div>

                <button  type="submit" className="btn btn-primary container">SIGN IN</button>
                { Error?.message?.toLowerCase().includes('failed') ?  <h3  className="mt-5 alert alert-danger" role="alert">username or password is wrong</h3>: null}
                { Error?.message?.toLowerCase().includes('network') ?  <h3  className="mt-5 alert alert-danger" role="alert">Server Error</h3>: null}
            </form>
        </div>
    )
}

export default Login
