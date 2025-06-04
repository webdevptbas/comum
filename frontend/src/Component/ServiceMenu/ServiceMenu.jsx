import React from "react";
import "./ServiceMenu.css";
import serviceMenuItem from "./serviceMenuItem";

const ServiceMenu = () => {
  return (
    <div className="service-menu-container">
      <h1 className="service-menu-title">Service Menu</h1>

      <div className="service-section-scroll-wrapper">
        <div className="service-section-container">
          {serviceMenuItem.map((section, index) => (
            <div key={index} className="service-section">
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item, idx) => (
                  <li key={idx} className="service-item">
                    <div className="service-row">
                      <div className="service-name">{item.name}</div>
                      <div className="service-price">{item.price}</div>
                    </div>
                    {item.details && (
                      <ul className="service-details">
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceMenu;
