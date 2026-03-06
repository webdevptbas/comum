import React from "react";
import "./Address.css";

const AddressComponent = ({ isAlsut }) => {
  return (
    <>
      {isAlsut ? (
        <div className="address-container">
          <h3 className="address-title-location heading2">COMUM ALAM SUTERA</h3>
          <h3 className="address-title heading3">OPEN HOURS</h3>
          <p className="text-l-regular">Mon - Sun, 9:00 AM - 8:00 PM</p>
          <h3 className="address-title heading3">ADDRESS</h3>
          <p className="text-l-regular">
            Ruko Palmyra Square Unit 25A No. 6 RT.002 RW.014 Kunciran - Pinang
            Kota Tangerang, Banten - 15325
          </p>
          <button
            className="get-direction-btn text-button-regular"
            onClick={() =>
              window.open("https://maps.app.goo.gl/V99n1gsy2Ewp85DB9", "_blank")
            }
          >
            Get Directions
          </button>
        </div>
      ) : (
        <div className="address-container">
          <h3 className="address-title-location heading2">
            COMUM PANGLIMA POLIM
          </h3>
          <h3 className="address-title heading3">OPEN HOURS</h3>
          <p className="text-l-regular">Mon - Sun, 7:00 AM - 6:00 PM</p>
          <h3 className="address-title heading3">ADDRESS</h3>
          <p className="text-l-regular">
            Jl. Panglima Polim IX No.4 RT.001 RW.007 Melawai - Kebayoran Baru
            Jakarta Selatan, DKI Jakarta - 12160
          </p>
          <button
            className="get-direction-btn text-button-regular"
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
      )}
    </>
  );
};

export default AddressComponent;
