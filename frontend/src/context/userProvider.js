import { useState } from "react";
import { userContext } from "./userContext.js";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const EMPTY_USER = { id: "", username: "", email: "", password: "" }

export default function UserProvider({children}) {
    const userSession = sessionStorage.getItem("user");
    const [user, setUser] = useState(
        userSession ? JSON.parse(userSession) : EMPTY_USER);

    const signUp = async () => {
        const json = JSON.stringify(user);
        const headers = {headers: {"Content-Type" : "application/json"}};
        try{
           // console.log(url + '/user/register');
            await axios.post(URL + "/user/register", json, headers);
            setUser(EMPTY_USER);
        } catch (error) {
           // console.log("ERROR" + error);
            throw error;
        }
    }

    const signIn = async () => {
        try {
            const response = await axios.post(URL + "/user/login", {
                    username: user.username,
                    password: user.password
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            setUser(response.data);
            sessionStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
            setUser(EMPTY_USER);
            throw error;
        }
    }

    const signOut = () => {
        setUser(EMPTY_USER);
        sessionStorage.setItem("user", JSON.stringify(EMPTY_USER));
    }

    const isSignedIn = () => {
        return user.token && user.token.length > 0;
    }

    return (
        <userContext.Provider value={{user, setUser, signUp, signIn, signOut, isSignedIn }}>
            { children }
        </userContext.Provider>
    )
}
