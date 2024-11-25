import  { userContext }  from "./userContext.js";
import { useContext } from "react";

export const useUser = () => {
    return useContext(userContext);
}
