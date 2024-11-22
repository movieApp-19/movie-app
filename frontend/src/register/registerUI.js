import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useUser } from "../context/useUser";
import "./register.css";

export const AuthenticationMode = Object.freeze({
    Login: "Login",
    Register: "Register"
})

export default function RegisterUI({authenticationMode}){
    const { user, setUser, signUp, /*signIn*/ } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (authenticationMode === AuthenticationMode.Register) {
              await signUp();
              navigate('/signin');
            } else {
              //await signIn();
              navigate('/');
            }
          } catch (error) {
            const message = error.response && error.response.data ? error. response.data.error : error;
            alert(message);
            console.log("TÄÄLLÄ" +message);
          }
        }
    

    return(
            <div>
            <h3>{authenticationMode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h3>
            <form onSubmit= {handleSubmit}>
              <div>
                <label>Username</label>
                <input
                type="text"
                value={user.username}
                onChange={e => setUser({...user, username: e.target.value})} />
              </div>

             <div>
                <label>Email</label>
                <input
                 type="email"
                  value={user.email}
                   onChange={e => setUser({...user, email: e.target.value})} />
             </div>
            
            <div>
            <label>Password</label>
            <input 
            type="password"
             value={user.password}
              onChange={e => setUser({...user, password: e.target.value})} />
          </div>
          <div>
            <button>{authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}</button>
          </div>
          <div>
            <Link to={authenticationMode === AuthenticationMode.Login ? '/signup' : '/signin'}>
            {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already signed up? Sign in'}
            </Link>
          </div>
          </form>
          </div>
        )
    }

    


