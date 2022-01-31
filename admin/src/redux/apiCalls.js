// import { publicRequest } from "../shared/baseUrl";

import axios from "axios";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
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



export const getProducts = async (dispatch) =>{
    dispatch(getProductStart());
    try {
        const res = await axios.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};


export const deleteProduct = async (id, TOKEN, dispatch) =>{
    dispatch(deleteProductStart());
    try {
        await axios.delete(`/products/${id}`,{
            headers:{token:`Bearer ${TOKEN}`}
        });
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (id, product, TOKEN, dispatch) =>{
    dispatch(updateProductStart());
    try {
        await axios.put(`/products/${id}`, product,{
            headers:{token:`Bearer ${TOKEN}`}
        });
        dispatch(updateProductSuccess({id,product}));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};


export const addProduct = async (product, TOKEN, dispatch) =>{
    dispatch(addProductStart());
    try {
        await axios.post("/products", product,{
            headers:{token:`Bearer ${TOKEN}`}
        });
        dispatch(addProductSuccess(product));
    } catch (err) {
        dispatch(addProductFailure());
    }
};