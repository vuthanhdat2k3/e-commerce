import { Avatar, Box, Card, CardHeader, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { dressPage1 } from '../../Data/dress/page1'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../Redux/Customers/Product/Action'


const RecentlyAddeddProducts = () => {
    const navigate=useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { customersProduct } = useSelector((store) => store);
    const [searchTerm, setSearchTerm] = useState("");

    // Query Params từ URL
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

    useEffect(() => {
      const data = {
        category: category || "",
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 100000000,
        minDiscount: 0,
        sort: sort || "price_low",
        pageNumber: page || 0,
        pageSize: 10,
        stock: availability,
        search: searchTerm || "",
      };
      dispatch(findProducts(data)); // Gửi yêu cầu tìm kiếm sản phẩm với các filter
    }, [availability, category, sort, page, searchTerm, dispatch]);

  return (
    <Card>
       <CardHeader
          title='Recently Added Products'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography onClick={()=>navigate("/admin/products")} variant='caption' sx={{color:"blue",cursor:"pointer",paddingRight:".8rem"}}>View All</Typography>}
          titleTypographyProps={{
            variant: 'h5',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
    <TableContainer>
      <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
        <TableHead>
          <TableRow>
             <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
           <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
             <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customersProduct?.products?.content?.slice(0,5).map(item => (
            <TableRow hover key={item.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
             <TableCell> <Avatar alt={item.title} src={item.imageUrl} /> </TableCell>
             
              <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{item.title}</Typography>
                  <Typography variant='caption'>{item.brand}</Typography>
                </Box>
              </TableCell>
              <TableCell>{item?.category?.name}</TableCell>
              <TableCell>{item?.discountedPrice}</TableCell>
              <TableCell>{item?.quantity}</TableCell>
              
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
  )
}

export default RecentlyAddeddProducts