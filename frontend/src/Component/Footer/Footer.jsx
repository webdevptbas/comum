import React, { useState } from "react";
import { Dropdown, Layout } from "antd";
import "./Footer.css";
import ComumFooter from "../../Icons/img/comumFooter.svg";
import { InstagramIcon, WhatsappIcon } from "../../Icons";
import { subscribeEmail } from "../../Util/apiService";

const { Footer } = Layout;

const MainFooter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const whatsappNumbers = [
    {
      name: "Comum Panglima Polim",
      number: "6282211110837",
    },
    {
      name: "Comum Alam Sutera",
      number: "6282125039938",
    },
  ];
  const instagramAccounts = [
    {
      name: "Comum Bike and Coffee",
      account: "comumbike",
    },
    {
      name: "Comum Padel",
      account: "comumpadel",
    },
  ];

  const menuItems = whatsappNumbers.map((item, index) => ({
    key: index,
    label: (
      <a
        href={`https://wa.me/${item.number}?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Comum`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.name}
      </a>
    ),
  }));

  const instagramMenuItems = instagramAccounts.map((item, index) => ({
    key: index,
    label: (
      <a
        href={`https://www.instagram.com/${item.account}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.name}
      </a>
    ),
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage("Please enter a valid email.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const res = await subscribeEmail(email); // ✅ Call backend
      setMessage(res.message || "Thank you for subscribing!");
      setEmail("");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to subscribe. Please try again.";
      setMessage(msg);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <Footer className="footer">
      <div className="footer-img">
        <img src={ComumFooter} alt="Comum" />
      </div>
      <div className="news-details">
        <div className="news-container">
          <div className="heading4 news-title">
            Stay Ahead, Never Miss a Great Deal Again!
          </div>
          <p className="news-subtitle text-l-regular">
            Get ready to discover all the latest trends, collaborations, and
            exclusive promotions!
          </p>
          <form className="news-form" onSubmit={handleSubmit}>
            <input
              className="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Insert your email"
            />
            <button className="submit-button text-button-regular" type="submit">
              Subscribe Newsletter
            </button>
            {message && (
              <p
                className={`message ${
                  message.includes("Thank") ? "success" : "error"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>

        <div className="details-container">
          <div className="contact-container">
            <div>
              <h5 className="heading5 footer-title">Contact</h5>
              {/* <p className="footer-subtitle text-s-regular">
                Jl. Panglima Polim IX No.4, RT./RW/RW.: 1, 7, Melawai, Kec. Kby.
                Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta.
              </p> */}
              <div style={{ margin: "20px 0" }}>
                <p className="footer-title heading5">Comum Panglima Polim</p>
                <p className="footer-subtitle text-l-regular">
                  Jl. Panglima Polim IX No.4 RT.001 RW.007 Melawai - Kebayoran
                  Baru Jakarta Selatan, DKI Jakarta - 12160
                </p>
              </div>
              <div style={{ margin: "20px 0" }}>
                <p className="footer-title heading5">Comum Alam Sutera</p>
                <p className="footer-subtitle text-l-regular">
                  Ruko Palmyra Square Unit 25A No. 6 RT.002 RW.014 Kunciran -
                  Pinang Kota Tangerang, Banten - 15325
                </p>
              </div>
              <p className="footer-subtitle text-l-regular">
                info@comumspace.com
              </p>
            </div>
            <div style={{ margin: "20px 0 0 0" }}>
              <h5 className="heading5 footer-title">Follow Us!</h5>
              <div className="socmed-container">
                <Dropdown
                  menu={{ items: instagramMenuItems }}
                  placement="bottomLeft"
                  trigger={["click"]}
                >
                  <div style={{ cursor: "pointer" }}>
                    <InstagramIcon
                      width="45"
                      height="45"
                      className="clickable"
                    />
                  </div>
                </Dropdown>
                <Dropdown
                  menu={{ items: menuItems }}
                  placement="bottomLeft"
                  trigger={["click"]}
                >
                  <div style={{ cursor: "pointer" }}>
                    <WhatsappIcon
                      width="45"
                      height="45"
                      className="clickable"
                    />
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright text-s-regular">
        ©{new Date().getFullYear()} Comum Bike & Coffee. All right reserved
      </div>
    </Footer>
  );
};

export default MainFooter;
