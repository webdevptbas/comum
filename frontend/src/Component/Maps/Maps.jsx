import React from "react";
import "./Maps.css";

const Maps = ({ isAlsut }) => {
  return (
    <>
      {isAlsut ? (
        <div className="maps-container">
          <iframe
            className="google-maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7932.404940507923!2d106.65163004496182!3d-6.237022509644613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb2d9101b56b%3A0x784e10de74dbd3!2sComum%20-%20Alam%20Sutera!5e0!3m2!1sid!2sid!4v1754973872387!5m2!1sid!2sid"
            style={{ border: "none" }}
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      ) : (
        <div className="maps-container">
          <iframe
            className="google-maps"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15864.569015169482!2d106.7907901!3d-6.244977!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1990f509bed%3A0x7aeeddf09f65de96!2sComum%20Bike%20and%20Coffee!5e0!3m2!1sen!2sid!4v1745217424755!5m2!1sen!2sid"
            style={{ border: "none" }}
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Maps;
