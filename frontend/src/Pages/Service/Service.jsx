import React from "react";
import "./Service.css";
import AddressComponent from "../../Component/Address/Address";
import Maps from "../../Component/Maps/Maps";
import ServiceMenu from "../../Component/ServiceMenu/ServiceMenu";

const ServicePage = () => {
  return (
    <>
      <div className="service-container">
        <div className="service-header">
          <h1 className="title service-title">Comum Service</h1>
        </div>
        <div className="service-body">
          {/* <div className="grid-parent">
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
          </div> */}
          <div className="menu-address-container">
            <div className="menu-service">
              <ServiceMenu />
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
          {/* <div className="footer-photo">
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ServicePage;
