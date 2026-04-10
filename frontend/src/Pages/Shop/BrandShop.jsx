import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router";
import { ProductCard } from "../../Component/Card/Card";
import { useGetProductsQuery } from "../../Slices/productsApiSlice";
import { fetchBrands } from "../../Util/apiService";
import { sortProducts } from "../../Util/ProductSort";

const BrandShopPage = () => {
  const { brand } = useParams();
  const { search } = useLocation();

  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);

  const params = new URLSearchParams(search);

  const gender = params.get("gender");
  const category = params.get("category");

  const brandId = useMemo(() => {
    if (!brand || brands.length === 0) return null;

    const found = brands.find(
      (b) => b.name.toLowerCase() === brand.toLowerCase(),
    );

    return found?._id || null;
  }, [brand, brands]);

  const shouldFetchProducts = !loadingBrands && brandId;

  const queryParams = {
    ...(brandId && { brand: brandId }),
    ...(gender && { gender }),
    ...(category && { category }),
  };

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingBrands(false);
      }
    };

    loadBrands();
  }, []);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery(queryParams, {
    skip: !shouldFetchProducts,
  });

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
            <p>{processedProducts?.length} Product(s)</p>
          </div>

          {processedProducts?.length === 0 && (
            <div className="product-grid heading4">No product available</div>
          )}
          <div className="product-grid">
            {processedProducts?.map((product) => (
              <Link key={product._id} to={`/shop/${brand}/${product._id}`}>
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

export default BrandShopPage;
