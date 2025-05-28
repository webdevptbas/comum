const coffeeMenu = [
  {
    category: "Signature Menu",
    items: [
      { name: "Nectar Coffee", hot: "29K", cold: "33K" },
      { name: "Watermelon Fizz", hot: "29K", cold: "33K" },
      { name: "Honey Yuzu Mint Tea", hot: "29K", cold: "33K" },
      { name: "Avellanas Xocco", hot: "29K", cold: "33K" },
    ],
  },
  {
    category: "Daily Coffee",
    subcategories: [
      {
        sub: "Black",
        items: [
          { name: "Espresso", hot: "20K" },
          { name: "Americano", hot: "25K", cold: "27K" },
        ],
      },
      {
        sub: "White",
        items: [
          { name: "Piccolo", hot: "27K" },
          { name: "Cappuccino / Latte / Flat White", hot: "29K", cold: "33K" },
          { name: "Caramel Latte", hot: "30K", cold: "33K" },
          { name: "Hazelnut Latte", hot: "30K", cold: "33K" },
          { name: "Aren Latte", hot: "30K", cold: "33K" },
          { name: "Pandan Latte", hot: "30K", cold: "33K" },
        ],
      },
    ],
  },
  {
    category: "Tea",
    items: [
      { name: "Seasonal (Chamomile, Chai)", hot: "25K" },
      { name: "Ice Lemon Tea", cold: "30K" },
      { name: "Ice Lychee Tea", cold: "30K" },
    ],
  },
  {
    category: "Non-Coffee",
    items: [
      { name: "Bitter Nuts", hot: "30K", cold: "33K" },
      { name: "Matcha Me!", hot: "30K", cold: "33K" },
      { name: "OG Chai Latte", hot: "30K", cold: "33K" },
      { name: "Dragon Fruit Smoothies", cold: "38K" },
      { name: "Mix Berries Smoothies", cold: "38K" },
    ],
  },
  {
    category: "Snacks",
    items: [
      { name: "French Fries", price: "18K" },
      { name: "Comum Cookies", price: "15K" },
      { name: "Pisang Goreng", price: "18K" },
    ],
  },
  {
    category: "Toast",
    items: [
      { name: "Comum Toast Chocolate", price: "20K" },
      { name: "Comum Toast Cheese", price: "20K" },
    ],
  },
];

export default coffeeMenu;
