import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav
        // className="header-app"
        // style={{
        //   backgroundColor: "#0b1f3a",
        //   color: " #bdbdbd",
        //   fontFamily: "var(--custom-font)",
        //   gridGrea: " header",
        //   paddingLeft: "16px",
        //   paddingTop: "32px",
        //   textShadow: "2px 1px 2px black",
        //   justifyContent:'center'
        // }}
      >
        <Link style={{color:'white', fontSize:'28px', }}to="/">Noteful</Link>
      </nav>
    </>
  );
}
