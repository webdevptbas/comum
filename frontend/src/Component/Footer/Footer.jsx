import React, { useState } from "react";
import { Layout } from "antd";
import "./Footer.css";
import { useNavigate } from "react-router";
import ComumFooter from "../../Icons/img/comumFooter.svg";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "../../Icons";
import { subscribeEmail } from "../../Util/apiService";

const { Footer } = Layout;

const menuItems = [
  {
    key: "/about-us",
    label: "About us",
  },
  {
    key: "/store",
    label: "Store",
  },
  // {
  //   key: "/term-of-service",
  //   label: "Term of Service",
  // },
  // {
  //   key: "/policy",
  //   label: "Shipping and Return",
  // },
  // {
  //   key: "/policy",
  //   label: "Privacy Policy",
  // },
  // {
  //   key: "/policy",
  //   label: "Refund Policy",
  // },
];

const MainFooter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
          <div className="title news-title">
            Stay Ahead, Never Miss a Great Deal Again!
          </div>
          <p className="news-subtitle">
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
            <button className="submit-button" type="submit">
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
          <div className="more-information">
            <h3 className="title footer-title">More Information</h3>
            <div className="footer-menu-container">
              {menuItems.map((menuItem, index) => (
                <p
                  key={index}
                  className="footer-subtitle clickable"
                  onClick={() => navigate(menuItem.key)}
                >
                  {menuItem.label}
                </p>
              ))}
            </div>
          </div>

          <div className="contact-container">
            <div>
              <h3 className="title footer-title">Contact</h3>
              <p className="footer-subtitle">
                Jl. Panglima Polim IX No.4, RT./RW/RW.: 1, 7, Melawai, Kec. Kby.
                Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta.
              </p>
              <p className="footer-subtitle">comumbikeandcoffee@gmail.com</p>
            </div>
            <div>
              <h3 className="title footer-title">Follow Us!</h3>
              <div className="socmed-container">
                <a
                  href="https://www.instagram.com/comumbike/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon width="45" height="45" className="clickable" />
                </a>
                <a
                  href="https://wa.me/6282211110837?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Comum"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappIcon width="45" height="45" className="clickable" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        ©{new Date().getFullYear()} Comum Bike & Coffee. All right reserved
      </div>
    </Footer>
  );
};

export default MainFooter;
