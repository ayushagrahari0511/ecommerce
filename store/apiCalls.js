import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import axios from 'axios'
import { 
  getProductFailure, 
  getProductStart, 
  getProductSuccess, 
  deleteProductFailure, 
  deleteProductStart, 
  deleteProductSuccess, 
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productSlice";
import {userRequest} from '../requestMethods'


export const login = async (dispatch, user, router) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/api/login", user);
    dispatch(loginSuccess(res.data));
    if(res) {
      router.push({
        pathname: router.query.returnUrl
      })
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};


export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get("/api/product/find");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/product/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (dispatch, product, id) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/product/${id}`, {product});
    dispatch(updateProductSuccess({id, product}));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/product`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};