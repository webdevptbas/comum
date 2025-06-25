import React from "react";
import "./Motto.css";
import { ComumHome } from "../../../Icons";
import mottoBg from "../../../Images/Background/motto-bg.png";

const Motto = () => {
  return (
    <>
      <div
        className="motto-container"
        style={{
          backgroundImage: `url(${mottoBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="logo-quote-container">
          <ComumHome />
        </div>
        <div className="motto-desc">"MORE THAN JUST</div>
        <div className="motto-desc">
          A <span style={{ color: "#3267E3" }}>COMMUNAL SPACE</span>"
        </div>
      </div>
    </>
  );
};

export default Motto;
