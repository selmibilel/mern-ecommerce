import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) =>{
    dispatch(loginStart());
    try {
        const res = await axios.post("/auth/login",user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};
