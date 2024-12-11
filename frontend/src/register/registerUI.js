import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useUser } from "../context/useUser";
import "./register.css";

export const AuthMode = Object.freeze({
    Login: "Login",
    Register: "Register"
})

export default function RegisterUI({ mode }){
    const { user, setUser, signUp, signIn } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (mode === AuthMode.Register) {
                  await signUp();
                  navigate('/signin');
            } else {
                  await signIn();
                  navigate('/');
            }
        } catch (error) {
            const message = error.response && error.response.data ? error. response.data.error : error;
            alert(message);
        }
    }
    
    return (
        <div>
            <h3>{mode === AuthMode.Login ? 'Sign in' : 'Sign up'}</h3>
            <form className="userForm" onSubmit= {handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={user.username}
                        onChange={e => setUser({...user, username: e.target.value})}
                    />
                </div>
                {mode === AuthMode.Register ?
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={e => setUser({...user, email: e.target.value})}
                        />
                    </div> : ""
                }
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={e => setUser({...user, password: e.target.value})}
                    />
                  </div>
                  <div>
                    <button>
                        {mode === AuthMode.Login ? 'Login' : 'Submit'}
                    </button>
                  </div>
                  <div>
                    <Link to={mode === AuthMode.Login ? '/signup' : '/signin'}>
                        {mode === AuthMode.Login ? 'No account? Sign up' : 'Already signed up? Sign in'}
                    </Link>
                </div>
            </form>
        </div>
        );
    }

    


