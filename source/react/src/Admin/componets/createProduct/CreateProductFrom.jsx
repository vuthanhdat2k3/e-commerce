import { useEffect, useState } from "react";
import { Alert, Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Fragment } from "react";
import "./CreateProductForm.css";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../Redux/Customers/Product/Action";
import { navigation } from "../../../config/navigationMenu";

const initialSizes = [
  { name: "", quantity: 0 },
  { name: "", quantity: 0 },
  { name: "", quantity: 0 },
];

const images = [{ src: "" }, { src: "" }, { src: "" }, { src: "" }];

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    images: images,
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPersent: "",
    size: initialSizes,
    quantity: "",
    topLavelCategory: "",
    secondLavelCategory: "",
    thirdLavelCategory: "",
    description: "",
    author: "",
  });
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [categories, setCategories] = useState({
    topLevelCategories: [],
    secondLevelCategories: [],
    thirdLevelCategories: [],
  });

  useEffect(() => {
    // Mapping the categories data from navigation to set the state
    const topLevelCategories = navigation.categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));

    setCategories({
      topLevelCategories,
      secondLevelCategories: [],
      thirdLevelCategories: [],
    });
  }, []);
  // console.log('categories', categories);
  const [notification, setNotification] = useState({
    message: "",
    type: "", // 'success' or 'error'
  });

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    if (name === 'topLavelCategory') {
      const selectedCategory = navigation.categories.find(
        (category) => category.name === value
      );
      const secondLevelCategories = selectedCategory
        ? selectedCategory.sections.map((section) => ({
            id: section.id,
            name: section.name,
          }))
        : [];
      setCategories((prevState) => ({
        ...prevState,
        secondLevelCategories,
        thirdLevelCategories: [], // Reset third level categories
      }));
    }
  
    if (name === 'secondLavelCategory') {
      const selectedCategory = navigation.categories
        .find((category) => category.name === productData.topLavelCategory)
        .sections.find((section) => section.name === value);
      const thirdLevelCategories = selectedCategory
        ? selectedCategory.items.map((item) => ({
            id: item.id,
            name: item.name,
          }))
        : [];
      setCategories((prevState) => ({
        ...prevState,
        thirdLevelCategories,
      }));
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImagesChange = (e, index) => {
    let { name, value } = e.target;
    const newImages = [...productData.images];
    newImages[index].src = value;
    setProductData((prevState) => ({ ...prevState, images: newImages }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? (name = "quantity") : (name = e.target.name);

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData)
    dispatch(createProduct({ data: productData, jwt }))
      .then((response) => {
        setNotification({
          message: "Product added successfully!",
          type: "success",
        });
        // Reset the notification after 5 seconds
        setTimeout(() => setNotification({ message: "", type: "" }), 5000);
      })
      .catch((error) => {
        setNotification({
          message: "Error adding product. Please try again.",
          type: "error",
        });
        // Reset the notification after 5 seconds
        setTimeout(() => setNotification({ message: "", type: "" }), 5000);
      });
  };


  return (
    <div className="createProductContainer ">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Add New Product
      </Typography>
      {/* Display Notification */}
      {notification.message && (
        <Alert severity={notification.type} sx={{ marginBottom: 2 }}>
          {notification.message}
        </Alert>
      )}
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          {productData?.images?.map((image, index) => (
            <Grid container item spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label={`Image URL ${index + 1}`}
                  name="imageUrl"
                  value={image.src}
                  onChange={(e) => handleImagesChange(e, index)}
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountPersent"
              value={productData.discountPersent}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLavelCategory"
                value={productData.topLavelCategory}
                onChange={handleCategoryChange}
                label="Top Level Category"
              >
                {categories.topLevelCategories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLavelCategory"
                value={productData.secondLavelCategory}
                onChange={handleCategoryChange}
                label="Second Level Category"
              >
                {categories.secondLevelCategories.map((section) => (
                  <MenuItem key={section.id} value={section.name}>
                    {section.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLavelCategory"
                value={productData.thirdLavelCategory}
                onChange={handleCategoryChange}
                label="Third Level Category"
              >
                {categories.thirdLevelCategories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {productData.topLavelCategory === "Books" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                value={productData.author}
                onChange={handleChange}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              name="description"
              rows={3}
              onChange={handleChange}
              value={productData.description}
            />
          </Grid>
          {productData.size.map((size, index) => (
            <Grid container item spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  onChange={(event) => handleSizeChange(event, index)}
                  fullWidth
                />
              </Grid>{" "}
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 0.7 }}
              color="primary"
              size="large"
              type="submit"
            >
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;
