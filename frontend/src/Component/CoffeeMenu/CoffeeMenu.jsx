import React from "react";
import "./CoffeeMenu.css";
import "../../index.css";
import coffeeMenu from "./coffeeItem";

const CoffeeMenu = () => {
  return (
    <div className="menu-text">
      <div className="menu-row">
        {coffeeMenu.map((section, index) => (
          <div key={index} className="menu-category">
            <h2 className="heading2">{section.category}</h2>

            {section.subcategories ? (
              section.subcategories.map((sub, idx) => (
                <div key={idx} className="menu-subcategory">
                  <h3 className="heading3">{sub.sub}</h3>
                  <ul>
                    {sub.items.map((item, i) => (
                      <li key={i} className="menu-item">
                        <div className="menu-item-row">
                          <div className="menu-name heading6">{item.name}</div>
                          <div className="menu-price">
                            {item.price && (
                              <div className="text-s-medium">{item.price}</div>
                            )}
                            {item.hot && (
                              <div div className="text-s-medium">
                                Hot: {item.hot}{" "}
                              </div>
                            )}
                            {item.cold && (
                              <div div className="text-s-medium">
                                {" "}
                                Cold: {item.cold}
                              </div>
                            )}
                          </div>
                        </div>
                        {item.description && (
                          <div className="menu-description">
                            {item.description}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <ul>
                {section.items.map((item, i) => (
                  <li key={i} className="menu-item">
                    <div className="menu-item-row">
                      <div className="menu-name heading6">{item.name}</div>
                      <div className="menu-price">
                        {item.price && (
                          <div className="text-s-medium">{item.price}</div>
                        )}
                        {item.hot && (
                          <div className="text-s-medium">Hot: {item.hot} </div>
                        )}
                        {item.cold && (
                          <div className="text-s-medium">
                            {" "}
                            Cold: {item.cold}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.description && (
                      <div className="menu-description">{item.description}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoffeeMenu;
