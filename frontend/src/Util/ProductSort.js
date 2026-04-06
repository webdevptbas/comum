export const sortProducts = (products) => {
  if (!products) return [];

  return [...products].sort((a, b) => {
    // 1. Move out-of-stock to bottom
    if (a.displayStock === 0 && b.displayStock > 0) return 1;
    if (a.displayStock > 0 && b.displayStock === 0) return -1;

    // 2. Alphabetical sort
    return a.productName.localeCompare(b.productName);
  });
};
