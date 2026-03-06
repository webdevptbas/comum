import React from "react";
import "./Service.css";
import AddressComponent from "../../Component/Address/Address";
import Maps from "../../Component/Maps/Maps";
import ServiceMenu from "../../Component/ServiceMenu/ServiceMenu";
import comumService from "../../Videos/comumService.mp4";
import comumServiceLandscape from "../../Videos/comumServiceLandscape.mp4";
import useMediaQuery from "../../Util/useMediaQuery";

const ServicePage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <div className="service-container">
        <div className="service-header">
          <h1 className="title service-title">Comum Service</h1>
        </div>
        <div className="service-body">
          <div className="menu-address-container">
            <div className="menu-service">
              <ServiceMenu />
            </div>
            <div className="map-and-info">
              <div className="maps-wrapper">
                <Maps isAlsut={false} />
              </div>
              <div className="address-wrapper">
                <AddressComponent isAlsut={false} />
              </div>
            </div>
            <div className="map-and-info">
              <div className="maps-wrapper">
                <Maps isAlsut={true} />
              </div>
              <div className="address-wrapper">
                <AddressComponent isAlsut={true} />
              </div>
            </div>
          </div>
          {isMobile ? (
            <video width="100%" autoPlay loop muted>
              <source src={comumService} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <video width="100%" autoPlay loop muted>
              <source src={comumServiceLandscape} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </>
  );
};

export default ServicePage;
