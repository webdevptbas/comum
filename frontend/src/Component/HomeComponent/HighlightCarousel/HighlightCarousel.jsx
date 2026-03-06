import { Carousel, Button } from "antd";
import { useState } from "react";
import "./HighlightCarousel.css";
import Tag from "../../Tag/Tag";

const highlightData = [
  {
    title: "SRAM RED AXS",
    desc: "Seamless wireless shifting, unmatched precision, and cutting-edge technology—SRAM RED AXS redefines performance.",
    price: 2480000,
    discount: 20,
    original: 3100000,
    image: "/Images/Background/sram.svg",
  },
  {
    title: "SHIMANO DURA-ACE",
    desc: "Top-tier race performance with lightning-fast shifting and featherlight materials.",
    price: 1980000,
    discount: 15,
    original: 2300000,
    image: "/images/dura-ace.jpg",
  },
];

const HighlightCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const product = highlightData[activeIndex];

  const onChange = (current) => {
    setActiveIndex(current);
  };

  return (
    <div className="highlight-wrapper">
      {/* Text Section */}
      <div className="highlight-text">
        <p className="highlight-sale-label">Sale</p>
        <h2 className="highlight-title">{product.title}</h2>
        <p className="highlight-description">{product.desc}</p>
        <div className="highlight-price-group">
          <p className="highlight-price">Rp{product.price.toLocaleString()}</p>
          <Tag type={"discount"} text={`-${product.discount}%`} />
          <s className="highlight-original">
            Rp{product.original.toLocaleString()}
          </s>
        </div>
        <Button className="highlight-cta">Get It Now!</Button>
      </div>

      {/* Carousel Section */}
      <div className="highlight-carousel">
        <Carousel afterChange={onChange}>
          {highlightData.map((item, index) => (
            <div key={index}>
              <img
                className="carousel-image"
                src={item.image}
                alt={item.title}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HighlightCarousel;
