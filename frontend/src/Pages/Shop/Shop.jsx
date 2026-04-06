import React from "react";
import "./Shop.css";
import { ProductCard } from "../../Component/Card/Card";
import { Link, useLocation } from "react-router";
import { useGetProductsQuery } from "../../Slices/productsApiSlice";
import { sortProducts } from "../../Util/ProductSort";

const ShopPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const gender = params.get("gender");
  const brand = params.get("brand");
  const category = params.get("category");

  const queryParams = React.useMemo(() => {
    const params = {};
    if (gender) params.gender = gender;
    if (brand) params.brand = brand;
    if (category) params.category = category;
    return params;
  }, [gender, brand, category]);

  const { data: products, isLoading, error } = useGetProductsQuery(queryParams);

  const processedProducts = React.useMemo(() => {
    return sortProducts(products);
  }, [products]);

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <div className="store-header">
            <p>{products.length} Product(s) Available</p>
          </div>

          {processedProducts.length === 0 && (
            <div className="product-grid heading4">No product available</div>
          )}
          <div className="product-grid">
            {processedProducts?.map((product) => (
              <Link
                className="product-link"
                to={`/shop/${product?.brand?.name?.toLowerCase()}/${product?._id}`}
                key={product._id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCard
                  key={product._id}
                  title={product.productName}
                  brand={product.brand?.name}
                  src={product.imageUrl?.[0]}
                  price={product.displayPrice}
                  finalPrice={product.displayDiscountPrice}
                  type={product.displayIsDiscount ? "discount" : ""}
                  text={
                    product.displayIsDiscount
                      ? `${product.displayDiscount}%`
                      : ""
                  }
                  isDiscount={product.displayIsDiscount}
                  displayStock={product.displayStock}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ShopPage;
