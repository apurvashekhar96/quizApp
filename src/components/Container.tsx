import "./Container.css";
import React from "react";

interface props {
  children: React.ReactNode;
}

const Container = ({ children }: props) => {
  return <div className="outerContainer">{children}</div>;
};

export default Container;
