const coffeeMenu = [
  {
    category: "Signature Menu",
    items: [
      {
        name: "Nectar Coffee",
        description:
          "A blend of rich espresso, creamy milk, and delicate nectar sweetness--a truly indulgent treat for your senses",
        hot: "29K",
        cold: "33K",
      },
      {
        name: "Watermelon Fizz",
        description:
          "Experience a refreshing twist with our Watermelon Espresso Soda - a tantalizing blend of ripe watermelon, bubbly soda, and a surprising hint of espresso. Served over ice, it's a delightful fusion of fruity freshness and caffeinated zing, perfect for flavor adventurers",
        hot: "29K",
        cold: "33K",
      },
      {
        name: "Honey Yuzu Mint Tea",
        description:
          "Delight in our Honey Yuzu Mint Tea, a refreshing blend of Manuka honey, zesty yuzu, and invigorating mint. Experience a harmonious fusion of sweetness, citrus, and herbal freshness in every sip",
        hot: "29K",
        cold: "33K",
      },
      {
        name: "Avellanas Xocco",
        description:
          "A decadent treat blending creamy hazelnut flavors with rich chocolate notes. Perfectly crafted for those seeking a delightful fusion of nutty sweetness and luxurious cocoa, it's an irresistible delight for any dessert lover",
        hot: "29K",
        cold: "33K",
      },
    ],
  },
  {
    category: "Daily Coffee",
    subcategories: [
      {
        sub: "Black",
        items: [
          {
            name: "Espresso",
            description:
              "A bold shot of finely-ground coffee, delivering immense flavor in a small cup",
            hot: "20K",
          },
          {
            name: "Americano",
            description: "Experience a smooth, bold brew with an Americano",
            hot: "25K",
            cold: "27K",
          },
        ],
      },
      {
        sub: "White",
        items: [
          {
            name: "Piccolo",
            description:
              "Bold flavor, smooth perfection. Savor the best in every sip",
            hot: "27K",
          },
          {
            name: "Cappuccino / Latte / Flat White",
            description:
              "Rich espresso meets velvety steamed milk, pure indulgence",
            hot: "29K",
            cold: "33K",
          },
          {
            name: "Caramel Latte",
            description: "Rich, creamy espresso with sweet caramel bliss",
            hot: "30K",
            cold: "33K",
          },
          {
            name: "Hazelnut Latte",
            description:
              "Rich, creamy blend of espresso with roasted hazelnut notes",
            hot: "30K",
            cold: "33K",
          },
          {
            name: "Aren Latte",
            description: "Sweet palm sugar latte for a natural energy boost",
            hot: "30K",
            cold: "33K",
          },
          {
            name: "Pandan Latte",
            description: "Savor the perfect blend of pandan and coffee",
            hot: "30K",
            cold: "33K",
          },
        ],
      },
    ],
  },
  {
    category: "Tea",
    subcategories: [
      {
        sub: "Seasonal Tea",
        items: [
          { name: "Chamomile Tea", hot: "25K" },
          { name: "Chai Tea", hot: "25K" },
        ],
      },
      {
        sub: "Ice Drink",
        items: [
          {
            name: "Ice Lemon Tea",
            description:
              "Refreshing ice lemon tea with zesty lemon and brewed tea",
            cold: "30K",
          },
          {
            name: "Ice Lychee Tea",
            description:
              "Refreshing blend of lychee, tea, and a hint of sweetness",
            cold: "30K",
          },
        ],
      },
    ],
    // items: [
    //   { name: "Seasonal (Chamomile, Chai)", hot: "25K" },
    //   { name: "Ice Lemon Tea", cold: "30K" },
    //   { name: "Ice Lychee Tea", cold: "30K" },
    // ],
  },
  {
    category: "Non-Coffee",
    items: [
      {
        name: "Bitter Nuts",
        description: "Unleash the bold in every cup",
        hot: "30K",
        cold: "33K",
      },
      {
        name: "Matcha Me!",
        description: "Elevate your day with vibrant matcha flavor",
        hot: "30K",
        cold: "33K",
      },
      {
        name: "OG Chai Latte",
        description:
          "Blending robust chai, aromatic cinnamon, and creamy milk, this indulgent drink offers a perfect harmony of spice and sweetness",
        hot: "30K",
        cold: "33K",
      },
      {
        name: "Dragon Fruit Smoothies",
        description: "Revitalize with our refreshing Dragon Fruit Smoothie",
        cold: "38K",
      },
      {
        name: "Mix Berries Smoothies",
        description: "Experience a smoot, bold brew with an Americano",
        cold: "38K",
      },
    ],
  },
  {
    category: "Snacks",
    items: [
      {
        name: "French Fries",
        description:
          "Bold flavor, smooth perfection. Savor the best in every bites",
        price: "18K",
      },
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
