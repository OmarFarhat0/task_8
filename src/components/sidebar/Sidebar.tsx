import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import blocksIcon from "./../../assets/icons/blocks.svg";
import saveIcon from "./../../assets/icons/save.svg";
import "./sidebar.css";

import logoutIcon from "./../../assets/icons/logout.png";
import axios from "axios";
const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState<string>("productlist");

  const handleLinkClick = (link: string): void => {
    setActiveLink(link);
  };

  async function handleLogOut() {
    try {
      await axios.post(
        "https://test1.focal-x.com/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", // Specify Content-Type as application/json
          },
        }
      );
      localStorage.removeItem("token");
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="sidebar">
      <img src="images/common/Logo.png" className="logo" alt="Logo" />
      <img
        src={localStorage.getItem("profile_image_url") || ""}
        className="profile-image"
        alt="Profile"
      />
      <h2>{localStorage.getItem("user_name")}</h2>

      <div className={`item ${activeLink === "productlist" ? "active" : ""}`}>
        <Link to="/product-list" onClick={() => handleLinkClick("productlist")}>
          <img src={blocksIcon} alt="Product Icon" />
          Products
        </Link>
      </div>

      <div className={`item ${activeLink === "favorites" ? "active" : ""}`}>
        <Link to="/" onClick={() => handleLinkClick("favorites")}>
          <img src={saveIcon} alt="Favorites Icon" />
          Favorites
        </Link>
      </div>

      <div className={`item ${activeLink === "orderlist" ? "active" : ""}`}>
        <Link to="/" onClick={() => handleLinkClick("orderlist")}>
          <img src={saveIcon} alt="Order List Icon" />
          Order List
        </Link>
      </div>

      <div className="logout" onClick={() => {}}>
        <button onClick={() => handleLogOut()}>Logout</button>
        <img src={logoutIcon} alt="logout" />
      </div>
    </div>
  );
};

export default Sidebar;
