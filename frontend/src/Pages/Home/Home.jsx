import React, { useEffect, useState } from "react";
import "./Home.css";
import "../../index.css";
import { Carousel } from "antd";
import Tag from "../../Component/Tag/Tag";
import { brands, categories, slides } from "./item";
import { ProductCard } from "../../Component/Card/Card";
import { useNavigate } from "react-router";
import HighlightCarousel from "../../Component/HomeComponent/HighlightCarousel/HighlightCarousel";
import Motto from "../../Component/HomeComponent/Motto/Motto";
import Event from "../../Component/HomeComponent/Event/Event";
import { fetchAllProducts } from "../../Util/apiService";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const isLatest = (createdAt) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return new Date(createdAt) >= oneMonthAgo;
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <div className="home-container">
        <Carousel
          // autoplay autoplaySpeed={3500}
          arrows
          infinite={true}
        >
          {slides.map((slide, index) => (
            <div className="carousel-image-container" key={index}>
              <img
                src={slide.src}
                alt={slide.title}
                className="background-image"
              />
              <div className="text-overlay">
                <Tag type={slide.tagType} text={slide.tagText} />
                <div className="heading1">{slide.title}</div>
                <div className="subtitle">{slide.subtitle}</div>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="category-scroll-wrapper">
          <div className="category-container">
            {categories.map((category, index) => (
              <div className={`${category.type}-container`} key={index + 1}>
                <img className="icon" src={category.src} alt={category.alt} />
              </div>
            ))}
          </div>
        </div>
        {/* <div className="shop-container">
          <div className="title shop-title">Explore Our Latest Product</div>
          <div className="products">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                title={product.productName}
                price={product.price}
                src={
                  "https://basgroup.quickconnect.to/d/s/13BlbuAcZPG5UhLaVQZxzS5quafIglat/vCAufnZ8xsyQz16ziBR_4FHPIiaDL6Jc-2bhAQPfLQQw"
                }
                type={product.isDiscount ? "discount" : "-"}
                text={`${product.discount}%`}
                isDiscount={product.isDiscount}
                finalPrice={product.discountPrice}
              />
            ))}
          </div>
          <div className="button top-picks-button">View More</div>
        </div> */}
        <div className="brand-container">
          <div className="brand-title heading2">Our Partner Brands</div>
          <div className="brand-grid">
            {brands.slice(0, 14).map((brand, index) => (
              <div className="brand-card" key={index}>
                {brand.igUrl ? (
                  <a
                    href={brand.igUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brand-link"
                  >
                    <img
                      className="brand-logo"
                      src={brand.src}
                      alt={brand.alt}
                    />
                  </a>
                ) : (
                  <img className="brand-logo" src={brand.src} alt={brand.alt} />
                )}
              </div>
            ))}

            <div
              className="brand-card explore-more"
              onClick={() => navigate("/brands")}
            >
              <div className="explore-text">
                <div className="explore-number">30+</div>
                <div className="explore-label">Explore More</div>
              </div>
            </div>
          </div>
        </div>
        {/* <HighlightCarousel /> */}
        <Motto />
        <Event />
      </div>
    </>
  );
};

export default HomePage;
