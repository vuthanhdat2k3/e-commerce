import React, { useEffect } from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { getAllProducts } from "../Redux/Customers/Product/Action";
import { useDispatch, useSelector } from "react-redux";


const Homepage = () => {
  const { customersProduct } = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  // console.log("products", customersProduct.products);
  let womenDress = [];
  let Sneaker = [];
  if (Array.isArray(customersProduct.products)) {
    womenDress = customersProduct.products.filter(
      (product) => product.category?.name === "women_dress"
    );
    Sneaker = customersProduct.products.filter(
      (product) => product.category?.name === "sneaker"
    );
    // console.log(womenDress);
  } else {
    console.error("products is not an array:", customersProduct.products);
  }

  return (
    <div className="">
      <HomeCarousel images={homeCarouselData} />

      <div className="space-y-10 py-20">
        <HomeProductSection data={womenDress} section={"Women's Dress"} />
        <HomeProductSection data={Sneaker} section={"Sneaker"} />
      </div>

      
    </div>
  );
};

export default Homepage;
