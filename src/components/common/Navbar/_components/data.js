// Dummy data for demonstration
const filteredMen = [
  {
    _id: '1',
    name: 'Clothing',
    subCategories: [
      { _id: '1-1', subCategoryName: 'T-Shirts' },
      { _id: '1-2', subCategoryName: 'Shirts' },
      { _id: '1-3', subCategoryName: 'Pants' },
      { _id: '1-4', subCategoryName: 'Jeans' },
    ],
  },
  {
    _id: '2',
    name: 'Footwear',
    subCategories: [
      { _id: '2-1', subCategoryName: 'Sneakers' },
      { _id: '2-2', subCategoryName: 'Formal Shoes' },
      { _id: '2-3', subCategoryName: 'Sandals' },
    ],
  },
  {
    _id: '3',
    name: 'Accessories',
    subCategories: [
      { _id: '3-1', subCategoryName: 'Watches' },
      { _id: '3-2', subCategoryName: 'Belts' },
      { _id: '3-3', subCategoryName: 'Wallets' },
    ],
  },
];

const filteredWomen = [
  {
    _id: '4',
    name: 'Clothing',
    subCategories: [
      { _id: '4-1', subCategoryName: 'Dresses' },
      { _id: '4-2', subCategoryName: 'Tops' },
      { _id: '4-3', subCategoryName: 'Skirts' },
    ],
  },
  {
    _id: '5',
    name: 'Accessories',
    subCategories: [
      { _id: '5-1', subCategoryName: 'Jewelry' },
      { _id: '5-2', subCategoryName: 'Handbags' },
      { _id: '5-3', subCategoryName: 'Scarves' },
    ],
  },
];

const filteredKids = [
  {
    _id: '6',
    name: 'Boys',
    subCategories: [
      { _id: '6-1', subCategoryName: 'T-Shirts' },
      { _id: '6-2', subCategoryName: 'Shorts' },
    ],
  },
  {
    _id: '7',
    name: 'Girls',
    subCategories: [
      { _id: '7-1', subCategoryName: 'Dresses' },
      { _id: '7-2', subCategoryName: 'Tops' },
    ],
  },
];

const filteredHandicraft = [
  {
    _id: '8',
    name: 'Home Decor',
    subCategories: [
      { _id: '8-1', subCategoryName: 'Wall Art' },
      { _id: '8-2', subCategoryName: 'Pottery' },
    ],
  },
  {
    _id: '9',
    name: 'Jewelry',
    subCategories: [
      { _id: '9-1', subCategoryName: 'Necklaces' },
      { _id: '9-2', subCategoryName: 'Bracelets' },
    ],
  },
];

export { filteredMen, filteredWomen, filteredKids, filteredHandicraft };
