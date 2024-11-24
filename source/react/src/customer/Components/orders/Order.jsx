import { Box, Grid } from "@mui/material";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import OrderCard from "./OrderCard";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";

const orderStatus = [
  { label: "Placed", value: "PLACED" },
  { label: "Canceled", value: "CANCELLED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Returned", value: "RETURNED" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  
  const {order}=useSelector(store=>store);

  // State lưu trạng thái của các bộ lọc
  const [filters, setFilters] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // console.log('filter', filters);

  
  useEffect(() => {
    if (jwt) {
      dispatch(getOrderHistory({ jwt }));
    }
  }, [jwt, dispatch]);
  // Cập nhật danh sách đơn hàng sau khi áp dụng bộ lọc
  useEffect(() => {
    if (filters.length > 0 && Array.isArray(order.orders)) {
      const filtered = order.orders?.filter((order) =>
        
        filters.includes(order.orderStatus) // Lọc các đơn hàng có trạng thái nằm trong danh sách filters
      );
      setFilteredOrders(filtered || []);
    } else {
      setFilteredOrders(order.orders || []); // Nếu không có bộ lọc nào, hiển thị toàn bộ đơn hàng
    }
  }, [filters, order.orders]);
  // console.log("orders", order?.orders);

  // Xử lý thay đổi trạng thái checkbox
  const handleFilterChange = (value) => {
    if (filters.includes(value)) {
      setFilters(filters.filter((filter) => filter !== value)); // Bỏ trạng thái nếu đã chọn
    } else {
      setFilters([...filters, value]); // Thêm trạng thái vào danh sách filters
    }
  };
  return (
    <Box className="px-10">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5} className="">
          <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filters</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStatus.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    //   id={`filter-${section.id}-${optionIdx}`}
                    //   name={`${section.id}[]`}
                    defaultValue={option.value}
                    type="checkbox"
                    checked={filters.includes(option.value)}
                    onChange={() => handleFilterChange(option.value)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    //   htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <Box className="space-y-5 ">
          {Array.isArray(filteredOrders) && filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                return order.orderStatus !== "PENDING" && order?.orderItems?.map((item, index) => (
                  <OrderCard item={item} order={order} key={index} />
                ));
              })
            ) : (
              <p>No orders found</p>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
