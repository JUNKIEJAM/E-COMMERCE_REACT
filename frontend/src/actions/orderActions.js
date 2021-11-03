import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {  ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, } from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const { userSignin: { userInfo }, } = getState();   //from user Sign in , we get the user info

    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder=(orderId)=>{
  async(dispatch,getState)=>{
    dispatch({type:ORDER_DETAILS_REQUEST,payload:orderId});
    
    const {userSignin:{userInfo},}=
    getState();

    try{
const {data}=await Axios.get(`/api/orders/${orderId}`,
{headers:{Authorization:`Bearer ${userInfo.token}`},
});

dispatch({type:ORDER_DETAILS_SUCCESS,payload:data});
}
    catch(error){
      const message=
      error.message&&error.response.data.message?
      error.response.data.message:
      error.message;           // either use in built error message or the general error message (n/w error)
  
      dispatch({type:ORDER_DETAILS_FAIL,payload:messge});
    }
    
  };
}