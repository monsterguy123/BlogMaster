import React from "react";
import Navbar from "./Navcomponent/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export const Elipses = (str, limit) => {
  return (
    str.length > limit ? str.substring(0, limit) + "..." : str
  );
}

export default Main;
