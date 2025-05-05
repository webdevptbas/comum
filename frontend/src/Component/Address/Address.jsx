import React from "react";
import "./Address.css";

const AddressComponent = () => {
  return (
    <>
      <div className="address-container">
        <h3 className="address-title">OPEN HOURS</h3>
        <p>Mon - Sun, 7.00 AM - 6 PM</p>
        <h3 className="address-title">ADDRESS</h3>
        <p>
          Jl. Panglima Polim IX No.4, RT./RW/RW.: 1, 7, Melawi, Kec. Kby. Baru,
          Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12160
        </p>
        <button
          className="get-direction-btn"
          onClick={() =>
            window.open(
              "https://www.google.com/maps/dir/?api=1&destination=Comum+Coffee",
              "_blank"
            )
          }
        >
          Get Directions
        </button>
      </div>
    </>
  );
};

export default AddressComponent;
