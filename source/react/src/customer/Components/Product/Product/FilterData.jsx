export const color = [
  "white",
  "Black",
  "Red",
  "marun",
  "Being",
  "Pink",
  "Green",
  "Yellow",
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" , type: "Fashion"},
      { value: "beige", label: "Beige" , type: "Fashion"},
      { value: "blue", label: "Blue" , type: "Fashion"},
      { value: "brown", label: "Brown" , type: "Fashion"},
      { value: "green", label: "Green" , type: "Fashion"},
      { value: "purple", label: "Purple" , type: "Fashion"},
      {value:"yellow",label:"Yellow", type: "Fashion"},
      {value:"black",label:"Black", type: "Fashion"},
      {value:"gray",label:"Gray", type: "Fashion"}
    ],
  },

  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S" , type: "women-men"},
      { value: "M", label: "M" , type: "women-men"},
      { value: "L", label: "L" , type: "women-men"},
      { value: "XL", label: "XL" , type: "women-men"},
      { value: "XXL", label: "XXL" , type: "women-men"},
      { value: "38", label: "38" , type: "shoes"},
      { value: "39", label: "39" , type: "shoes"},
      { value: "40", label: "40" , type: "shoes"},
      { value: "41", label: "41" , type: "shoes"},
      { value: "42", label: "42" , type: "shoes"},
      { value: "24inch", label: "24inch" , type: "laptop"},
      { value: "27inch", label: "27inch" , type: "laptop"},
      { value: "29inch", label: "29inch" , type: "laptop"},
      { value: "32GB", label: "32GB" , type: "mobile_phone"},
      { value: "64GB", label: "64GB" , type: "mobile_phone"},
      { value: "128GB", label: "128GB" , type: "mobile_phone"},
      { value: "256GB", label: "256GB" , type: "mobile_phone"},
    ],
  },
  
];

export const singleFilter=[
  {
    id: "price",
    name: "Price",
    options: [
      { value: "100000-500000", label: "100K To 500K" },
      { value: "500000-1000000", label: "500K To 1000K" },
      { value: "1000000-5000000", label: "1000K To 5000K" },
      { value: "5000000-10000000", label: "5000K To 10000K" },
      { value: "10000000-20000000", label: "10000K To 20000K" },
      { value: "20000000-30000000", label: "20000K To 30000K" },
    ],
  },
  {
    id: "disccout",
    name: "Disccount Range",
    options: [
      {
        value: "10",
        label: "10% And Above",
      },
      { value: "20", label: "20% And Above" },
      { value: "30", label: "30% And Above" },
      { value: "40", label: "40% And Above" },
      { value: "50", label: "50% And Above" },
      { value: "60", label: "60% And Above" },
      { value: "70", label: "70% And Above" },
      { value: "80", label: "80% And Above" },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out Of Stock" },
      
    ],
  },
]

export const sortOptions = [
  
  { name: "Price: Low to High", query: "price_low", current: false },
  { name: "Price: High to Low", query: "price_high", current: false },
];
