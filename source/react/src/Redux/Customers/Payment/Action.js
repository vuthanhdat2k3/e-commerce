import { API_BASE_URL } from '../../../config/api';
import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE,
  } from './ActionType';
  
  import axios from 'axios';
  
  export const createPayment = (reqData) => async (dispatch) => {
    console.log("create payment reqData ", reqData);
    try {
      dispatch({
        type: CREATE_PAYMENT_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${reqData.jwt}`,
        }
      };

      // const { data } = await axios.post(`${API_BASE_URL}/api/payments/${reqData.orderId}`, config);

      // Thêm reqData làm payload, cấu hình config ở tham số thứ ba
      const { data } = await axios.post(
        `${API_BASE_URL}/payment/vn-pay/${reqData.orderId}?bankCode=NCB`,
        reqData,
        config
      );
      console.log("datta",data)

      if (data.data && data.data.paymentUrl) {
        window.location.href= data.data.paymentUrl;
    }
      // if(data.payment_link_url){
      //   window.location.href=data.payment_link_url;
      // }

      dispatch({
        type: CREATE_PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PAYMENT_FAILURE,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
};

  


export const updatePayment = (reqData) => async (dispatch) => {
  console.log("Updating payment with reqData: ", reqData);
  try {
      dispatch(updatePaymentRequest());

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${reqData.jwt}`,
          },
      };

      const { data } = await axios.get(
          `${API_BASE_URL}/payment/vn-pay-callback`,
          config
      );

      console.log("Updated payment data: ", data);
      dispatch(updatePaymentSuccess(data));
  } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Update payment error: ", errorMessage);
      dispatch(updatePaymentFailure(errorMessage));
  }
};


export const updatePaymentRequest = () => {
  return {
    type: UPDATE_PAYMENT_REQUEST,
  };
};

export const updatePaymentSuccess = (payment) => {
  return {
    type: UPDATE_PAYMENT_SUCCESS,
    payload: payment,
  };
};

export const updatePaymentFailure = (error) => {
  return {
    type: UPDATE_PAYMENT_FAILURE,
    payload: error,
  };
};

 
  