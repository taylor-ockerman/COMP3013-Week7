import useBoundStore from "../../store/Store";
import classes from "./Navbar.module.css";
import { useState, useEffect } from "react";
import React from "react";
import { DrawerContext } from "../../Contexts/drawerContext";
import { NavLink } from "react-router-dom";

export default () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const { close } = React.useContext(DrawerContext);

  const handleClick = (action) => {
    close();
    if (action) action();
  };

  const items = !user
    ? [
        <NavLink key = "0" onClick={handleClick} className={classes.link} end to="/">
          Home
        </NavLink>,
        <NavLink key = "1" onClick={handleClick} className={classes.link} to="/login">
          Login
        </NavLink>,
      ]
    : [
        <NavLink key = "0" onClick={handleClick} className={classes.link} end to="/posts">
          Posts
        </NavLink>,
        <NavLink key = "1" onClick={handleClick} end to="/posts/create">
          Create
        </NavLink>,
        <NavLink key = "2" onClick={() => handleClick(logoutService)} to="/">
          Logout
        </NavLink>,
      ];
  return [items];
};
