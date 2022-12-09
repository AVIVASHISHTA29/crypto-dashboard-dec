import React from "react";
import Button from "../Button/button";
import MobileDrawer from "./Drawer";
import "./styles.css";

function Header() {
  return (
    <div className="header">
      <h1>
        CryptoTracker<span style={{ color: "var(--blue)" }}>.</span>
      </h1>
      <div className="links-flex">
        <a href="/">
          <p className="link">Home</p>
        </a>
        <a href="/">
          <p className="link">Compare</p>
        </a>
        <a href="/">
          <p className="link">Watchlist</p>
        </a>
        <Button
          text="Dashboard"
          onClick={() => {
            console.log("btn-clicked!!!");
          }}
        />
      </div>
      <MobileDrawer />
    </div>
  );
}

export default Header;
