import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../../../Redux/Customers/Payment/Action";
import { Alert, AlertTitle, Box, Grid, CircularProgress } from "@mui/material";
import OrderTraker from "../orders/OrderTraker";
import AddressCard from "../adreess/AdreessCard";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [transactionNo, setTransactionNo] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [paymentId, setPaymentId] = useState("");

  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((store) => store.order);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    // console.log("orderId", orderId);
    const urlParams = new URLSearchParams(window.location.search);
    setTransactionNo(urlParams.get("vnp_TransactionNo"));
    setTransactionStatus(urlParams.get("vnp_ResponseCode"));
    setPaymentId(urlParams.get("payment_ID"));
  }, []);
  // console.log('check', transactionNo, transactionStatus);

  useEffect(() => {
    if (transactionNo && transactionStatus === "00" ) {
      const data = { jwt };
      dispatch(updatePayment(data));
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId, transactionNo, paymentId, transactionStatus, jwt]);

  console.log('order', order);
  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error.message || "An unexpected error occurred."}
        </Alert>
      </Box>
    );
  }

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Your payment was successful, and the order has been placed!
        </Alert>
      </div>

      <OrderTraker activeStep={1} />

      <Grid container className="space-y-5 py-5 pt-20">
        {order?.orderItems?.map((item) => (
          <Grid
            container
            item
            key={item.id} // Thêm key để tối ưu hiệu năng
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item?.product?.imageUrl}
                  alt={item?.product?.title || "Product"}
                />
                <div className="ml-5 space-y-2">
                  <p>{item?.product?.title}</p>
                  <p className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Color: {item?.product?.color || "N/A"}</span>
                    <span>Size: {item.size || "N/A"}</span>
                  </p>
                  <p>Seller: {item?.product?.brand || "Unknown"}</p>
                  <p>Price: {item.price}</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <AddressCard address={order?.shippingAddress} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PaymentSuccess;
