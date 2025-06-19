import React from "react";
import "./Coffee.css";
import buyCoffee from "../../Images/Background/coffee/buyCoffee.svg";
import coffeePorcelainCup from "../../Images/Background/coffee/coffeePorcelainCup.svg";
import coffeePlasticCup from "../../Images/Background/coffee/coffeePlasticCup.svg";
import cashier from "../../Images/Background/coffee/cashier.svg";
import holdingCoffee from "../../Images/Background/coffee/holdingCoffee.svg";
import AddressComponent from "../../Component/Address/Address";
import Maps from "../../Component/Maps/Maps";
import latteArt from "../../Images/Background/coffee/latteArt.svg";
import lycheeTea from "../../Images/Background/coffee/lycheeTea.svg";
import threeDrinks from "../../Images/Background/coffee/threeDrinks.svg";
import brownies from "../../Images/Background/coffee/brownies.svg";
import CoffeeMenu from "../../Component/CoffeeMenu/CoffeeMenu";

const CoffeePage = () => {
  return (
    <>
      <div className="coffee-container">
        <div className="coffee-header">
          <h1 className="title coffee-title">Comum Coffee</h1>
        </div>
        <div className="coffee-body">
          <div className="grid-parent">
            <div className="grid-div1">
              <img src={buyCoffee} alt="Comum" />
            </div>
            <div className="grid-div2">
              <img src={coffeePorcelainCup} alt="Comum" />
            </div>
            <div className="grid-div3">
              <img src={coffeePlasticCup} alt="Comum" />
            </div>
            <div className="grid-div4">
              <img src={cashier} alt="Comum" />
            </div>
            <div className="grid-div5">
              <img src={holdingCoffee} alt="Comum" />
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
              <img src={brownies} alt="Comum" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoffeePage;
