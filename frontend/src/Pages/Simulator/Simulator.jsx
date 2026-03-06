import React from "react";
import "./Simulator.css";
import { Divider, Card } from "antd";
import {
  SendOutlined,
} from "@ant-design/icons";
import useMediaQuery from "../../Util/useMediaQuery";
import comumSimulator from "../../Videos/comumSimulator.mp4";
import comumSimulatorLandscape from "../../Videos/comumSimulatorLandscape.mp4";
import simulatorFeatures from "./item";

const AYO_APP_URL =
  "https://link.ayo.co.id/l/sNIYITAye9-Comum-Padel-&-Tennis-Simulator";

const SimulatorPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const openAyoApp = () => {
    window.open(AYO_APP_URL, "_blank");
  };

  return (
    <>
      <div className="simulator-container">
        {/* HERO */}
        <section className="simulator-hero">
          <div className="hero-text">
            <h1 className="title" style={{ margin: "0", color: "#000000" }}>
              Comum Padel & Tennis Simulator
            </h1>
            <p className="text-l-regular">
              Experience padel and tennis in a whole new way. Real-time
              tracking, immersive visuals, and data-driven play all inside one
              machine.
            </p>
            {/* <div className="simulator-media">
              <img src={simulator} alt="Comum Simulator" />
            </div> */}
          </div>
          <div className="simulator-actions">
            <button
              className="simulator-button text-l-regular"
              onClick={openAyoApp}
            >
              <SendOutlined />
              Register via AYO App
            </button>
          </div>
        </section>

        {isMobile ? (
          <video width="100%" autoPlay loop muted>
            <source src={comumSimulator} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <video width="100%" autoPlay loop muted>
            <source src={comumSimulatorLandscape} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <Divider />

        {/* FEATURES */}
        <section className="simulator-features">
          {simulatorFeatures.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <Card key={i} className="feature-card" bordered>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Icon className="feature-icon" />
                  <h3 className="text-l-medium">{feature.title}</h3>
                </div>
                <p className="text-l-regular">{feature.desc}</p>
              </Card>
            );
          })}
        </section>

        <Divider />

        {/* CTA */}
        <section className="simulator-cta">
          <h2 className="title" style={{ color: "#000000" }}>
            Ready to Play?
          </h2>
          <p className="text-l-regular">
            Register through the AYO App and experience the future of padel and
            tennis at Comum.
          </p>

          <button
            className="simulator-button text-l-regular"
            onClick={openAyoApp}
          >
            <SendOutlined />
            Register on AYO App
          </button>
        </section>
      </div>
    </>
  );
};

export default SimulatorPage;
