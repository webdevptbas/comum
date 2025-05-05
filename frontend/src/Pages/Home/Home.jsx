import React from "react";
import "./Home.css";
import "../../index.css";
import { Carousel } from "antd";
import Tag from "../../Component/Tag/Tag";
import { brands, categories, slides } from "./item";
import { ProductCard } from "../../Component/Card/Card";
import productDummy from "../../Images/Background/image 1.png";
import { useNavigate } from "react-router";
import HighlightCarousel from "../../Component/HomeComponent/HighlightCarousel/HighlightCarousel";
import Motto from "../../Component/HomeComponent/Motto/Motto";
import Event from "../../Component/HomeComponent/Event/Event";

const HomePage = () => {
  const navigate = useNavigate();
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
                <div className="title">{slide.title}</div>
                <div className="subtitle">{slide.subtitle}</div>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="category-container">
          {categories.map((category, index) => (
            <div className={`${category.type}-container`} key={index + 1}>
              <img className="icon" src={category.src} alt={category.alt} />
              {/* <div className="title">{category.title}</div> */}
              {/* <div className="subtitle">{category.subtitle}</div> */}
              {/* <div className="button white-button">Discover {category.alt}</div> */}
            </div>
          ))}
        </div>
        <div className="shop-container">
          <div className="title shop-title">Explore Our Latest Product</div>
          <div className="products">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCard
                key={index}
                title={`Product ${index + 1}`}
                price={3000000 + index * 112000}
                src={productDummy}
                type={"discount"}
                text={"20%"}
                isDiscount={true}
                finalPrice={(3000000 + index * 112000) * 0.8}
              />
            ))}
          </div>
          <div className="button top-picks-button">View More</div>
        </div>
        <div className="brand-container">
          <div className="brand-title title">Our Partner Brands</div>
          <div className="brand-grid">
            {brands.slice(0, 14).map((brand, index) => (
              <div className="brand-card" key={index}>
                <img className="brand-logo" src={brand.src} alt={brand.alt} />
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
        <HighlightCarousel />
        <Motto />
        <Event />
      </div>
    </>
  );
};

export default HomePage;
