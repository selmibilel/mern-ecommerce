import {createSlice} from "@reduxjs/toolkit";


export const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        isFetching:false,
        error:false,
    },
    reducers:{
        // GET ALL PRODUCTS
        getProductStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        getProductSuccess:(state,action)=>{
            state.isFetching = false;
            state.products = action.payload;
            state.error = false;
        },
        getProductFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        // DELETE PRODUCT
        deleteProductStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        deleteProductSuccess:(state,action)=>{
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex((item)=> item._id === action.payload),1
            );
            state.error = false;
        },
        deleteProductFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        // UPDATE PRODUCT
        updateProductStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        updateProductSuccess:(state,action)=>{
            state.isFetching = false;
            state.products[state.products.findIndex((item)=> item._id === action.payload.id)] = action.payload.product;
            state.error = false;
        },
        updateProductFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        // ADD PRODUCT
        addProductStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },
        addProductSuccess:(state,action)=>{
            state.isFetching = false;
            state.products.push(action.payload);
            state.error = false;
        },
        addProductFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        }
    },
});

export const {
    getProductStart, 
    getProductSuccess, 
    getProductFailure, 
    deleteProductStart, 
    deleteProductSuccess, 
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} = productSlice.actions;

export default productSlice.reducer;