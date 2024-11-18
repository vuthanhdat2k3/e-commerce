import { Box, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();
  // console.log("items ", item, order, order.orderStatus, order.createdAt);

  // Parse order.createdAt to a Date object (assuming it's a string)
  const orderDate = new Date(order.createdAt);

  // Get the current date and format it
  const currentDate = new Date();
  const currentDateString = currentDate.toLocaleDateString("en-GB");

  // Calculate the expected delivery date (3 days from order.createdAt)
  const expectedDeliveryDate = new Date(orderDate); // Use order.createdAt as the base date
  expectedDeliveryDate.setDate(orderDate.getDate() + 3);
  const expectedDeliveryDateString =
    expectedDeliveryDate.toLocaleDateString("en-GB");

  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border ">
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div
            onClick={() => navigate(`/account/order/${order?.id}`)}
            className="flex cursor-pointer"
          >
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item?.product.imageUrl}
              alt=""
            />
            <div className="ml-5">
              <p className="mb-2">{item?.product.title}</p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                <span>Size: {item?.size}</span>
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>{item?.price}</p>
        </Grid>
        <Grid item xs={4}>
          <p className="space-y-2 font-semibold">
            {order?.orderStatus === "DELIVERED" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Delivered</span>
                <p className="text-xs">
                  Your order was delivered on {currentDateString}
                </p>
              </>
            ) : order?.orderStatus === "CANCELLED" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-red-600 p-0 mr-2 text-sm"
                />
                <span>Order Canceled</span>
                <p className="text-xs text-red-600">
                  Your order was canceled on {currentDateString}
                </p>
              </>
            ) : order?.orderStatus === "RETURNED" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-yellow-600 p-0 mr-2 text-sm"
                />
                <span>Order Returned</span>
                <p className="text-xs text-yellow-600">
                  Your order was returned on {currentDateString}
                </p>
              </>
            ) : order?.orderStatus === "PLACED" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-blue-600 p-0 mr-2 text-sm"
                />
                <span>Order Placed</span>
                <p className="text-xs text-blue-600">
                  Your order was placed on {currentDateString}
                </p>
              </>
            ) : order?.orderStatus === "CONFIRMED" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-orange-600 p-0 mr-2 text-sm"
                />
                <span>Order Confirmed</span>
                <p className="text-xs text-orange-600">
                  Your order was confirmed on {currentDateString}
                </p>
              </>
            ) : (
              <>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Expected Delivery On {expectedDeliveryDateString}</span>
                <p className="text-xs">Your item is on the way</p>
              </>
            )}
          </p>

          {item.orderStatus === "DELIVERED" && (
            <div
              onClick={() => navigate(`/account/rate/{id}`)}
              className="flex items-center text-blue-600 cursor-pointer"
            >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
              <span>Rate & Review Product</span>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
