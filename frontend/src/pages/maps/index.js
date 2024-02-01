// pages/index.js
import React, { useState } from "react";
import Head from "next/head";
import Map from "@/components/Map";
import ImageCarousel from "@/components/ImageCarousel";

const Home = () => {
  const [foodItem, setFoodItem] = useState("");

  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      setFoodItem(e.target.value);
    }
  };
  const images = [
    "/assets/reliance/biscuits.png",
    "/assets/reliance/butter.png",
    "/assets/reliance/honey.png",
  ];

  // const onInputValueChange = (e) => {
  //   setFoodItem(e.target.value)
  // }

  return (
    <div>
      <div>
        <label>
          Search for:
          <input
            className="px-[10px] py-[5px] bg-blue-100"
            type="text"
            onKeyDown={handleInputChange}
          />
        </label>
      </div>

      <Map foodItem={foodItem} />
    </div>
  );
};

export default Home;
