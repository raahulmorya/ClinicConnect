// src/components/Header.js
import React from "react";
import "./header.css";

const Header = () => {
  return (
    <header>
      <h1>
        <a href="/">
          <img id="logo" src="./logo.png" alt="" />
          ClinicConnect
        </a>
      </h1>
      <nav>
        <ul>
          <a href="/">
            <i class="fas fa-home"></i>Home
          </a>
        </ul>
        <ul>
          <a href="/services">
            <i class="fa fa-cog"></i> Services
          </a>
        </ul>
        <ul>
          <a href="/aboutus">
            <i class="fas fa-info-circle"></i> About Us
          </a>
        </ul>
        <ul>
          <a href="/login">
            <i class="fas fa-user"></i> Login
          </a>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
