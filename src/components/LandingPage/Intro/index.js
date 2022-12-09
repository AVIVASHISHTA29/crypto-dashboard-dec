import React from "react";
import Button from "../../Common/Button/button";
import "./styles.css";
import gradient from "../../../assets/gradient.png";
import iPhone from "../../../assets/iphone.png";
import { motion } from "framer-motion";
function LandingPageComponent() {
  return (
    <div className="landing-wrapper">
      <div className="landing-left">
        <h1 className="heading-1">Track Crypto</h1>
        <h1 className="heading-2">Real Time.</h1>
        <p className="para">
          Track crypto through a public api in real time. Visit the dashboard to
          do so!
        </p>
        <div className="btn-flex">
          <Button text="Dashboard" />
          <Button text="Share App" outlined={true} />
        </div>
      </div>
      <div className="landing-right">
        <img src={gradient} className="gradient" />
        <img src={iPhone} className="iphone" />
      </div>
    </div>
  );
}

export default LandingPageComponent;
