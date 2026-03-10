import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1>Mannsathi.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
            provident, reprehenderit maiores quaerat dt velit ullam, delectus
            iste? Velit sunt animi repellat amet quod harum at omnis placeat
            sed.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>+91-8369484462</li>
            <li>contact@mannsathi.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &#169; Mannsathi.com - All Rights Reserved.{" "}
      </p>
    </div>
  );
};

export default Footer;
