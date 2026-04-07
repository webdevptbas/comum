import React from "react";
import "./Coffee.css";
import buyCoffee from "../../Images/Background/coffee/buyCoffee.webp";
import toast from "../../Images/Background/coffee/toast.webp";
import tea from "../../Images/Background/coffee/tea.webp";
import frenchFries from "../../Images/Background/coffee/frenchFries.webp";
import threeTea from "../../Images/Background/coffee/threeTea.webp";
import AddressComponent from "../../Component/Address/Address";
import Maps from "../../Component/Maps/Maps";
import latteArt from "../../Images/Background/coffee/latteArt.webp";
import lycheeTea from "../../Images/Background/coffee/lycheeTea.webp";
import threeDrinks from "../../Images/Background/coffee/threeDrinks.webp";
import pisangGoreng from "../../Images/Background/coffee/pisangGoreng.webp";
import CoffeeMenu from "../../Component/CoffeeMenu/CoffeeMenu";

const CoffeePage = () => {
  return (
    <>
      <div className="coffee-container">
        <div className="coffee-header">
          <h2 className="title heading2 coffee-title">Comum Coffee</h2>
        </div>
        <div className="coffee-body">
          <div className="grid-parent">
            <div className="grid-div1">
              <img src={buyCoffee} alt="Comum" />
            </div>
            <div className="grid-div2">
              <img src={toast} alt="Comum" />
            </div>
            <div className="grid-div3">
              <img src={tea} alt="Comum" />
            </div>
            <div className="grid-div4">
              <img src={frenchFries} alt="Comum" />
            </div>
            <div className="grid-div5">
              <img src={threeTea} alt="Comum" />
            </div>
          </div>
          <div className="menu-address-container">
            <div className="menu">
              <CoffeeMenu />
            </div>
            <div className="map-and-info">
              <div className="maps-wrapper">
                <Maps />
              </div>
              <div className="address-wrapper">
                <AddressComponent />
              </div>
            </div>
          </div>
          <div className="footer-photo">
            <div className="div1">
              <img src={latteArt} alt="Comum" />
            </div>
            <div className="div2">
              <img src={lycheeTea} alt="Comum" />
            </div>
            <div className="div3">
              <img src={threeDrinks} alt="Comum" />
            </div>
            <div className="div4">
              <img src={pisangGoreng} alt="Comum" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoffeePage;
