import React from "react";
import "./CoffeeMenu.css";
import coffeeMenu from "./coffeeItem";

const CoffeeMenu = () => {
  return (
    <div className="menu-text">
      <div className="menu-row">
        {coffeeMenu.map((section, index) => (
          <div key={index} className="menu-category">
            <h2>{section.category}</h2>

            {section.subcategories ? (
              section.subcategories.map((sub, idx) => (
                <div key={idx} className="menu-subcategory">
                  <h3>{sub.sub}</h3>
                  <ul>
                    {sub.items.map((item, i) => (
                      <li key={i} className="menu-item">
                        <div className="menu-row">
                          <div className="menu-name">{item.name}</div>
                          <div className="menu-price">
                            {item.price && <>{item.price}</>}
                            {item.hot && <>Hot: {item.hot} </>}
                            {item.cold && <> Cold: {item.cold}</>}
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
                    <div className="menu-row">
                      <div className="menu-name">{item.name}</div>
                      <div className="menu-price">
                        {item.price && <>{item.price}</>}
                        {item.hot && <>Hot: {item.hot} </>}
                        {item.cold && <> Cold: {item.cold}</>}
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
