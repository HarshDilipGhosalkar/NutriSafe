import React from "react";
// import CircularProgressBar from "../components/CircularProgressBar";
import { useRouter } from "next/router";

const HomePage = () => {
  const value = 600;
  const router = useRouter();

  return (
    <>
      <div className="mt-[20px] flex flex-col">
        <div className="flex mb-[20px] px-[10px] gap-x-[20px]">
          <div 
          className="w-[50%] rounded-[20px] p-[10px] border-[1px] rounded-lg"
          onClick={() => router.push("/packaged")}>
            <img
              className="mb-[10px] rounded-[20px]"
              src="assets/packet.png"
            ></img>
            <p className="w-full text-gray-600 text-center font-bold">
              Scan Packet Food
            </p>
          </div>
          <div
            className="w-[50%] rounded-[20px] p-[10px] items-center border-[1px] rounded-lg"
            onClick={() => router.push("/scanner")}
          >
            <img
              className="mb-[10px] rounded-[20px]"
              src="assets/food.png"
            ></img>
            <p className="w-full text-gray-600 text-center font-bold">
              Scan Cooked Food
            </p>
          </div>
        </div>
        <div className="p-[10px] mb-[10px] mx-[10px] gap-x-[10px] items-center flex rounded-[15px] border-[1px]">
          <img className="w-[60px] h-[60px]" src="assets/cooking.png" />
          <div>
            <p className="text-gray-600">
              Get AI generated recipies considering your preference and
              allergies
            </p>
            <a
              onClick={() => {
                router.push("/recipes");
              }}
              className="bold text-blue-500 font-bold"
            >
              Get Recipes &rarr;{" "}
            </a>
          </div>
        </div>
        <div className="p-[10px]">
          <div className="flex py-[15px] rounded-[10px] border-[1px] justify-around">
            <div className="flex w-[33%] flex-col items-center" 
              onClick={() => router.push('/report')}
            >
              <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full border-[1px] border-gray-300">
                <img className="w-[40px]" src="assets/warning.png" />
              </div>
              <p className="font-bold text-gray-600">Report</p>
            </div>
            <div
              className="flex w-[33%] flex-col items-center"
              onClick={() => router.push("/alternate")}
            >
              <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full border-[1px] border-gray-300">
                <img className="w-[40px]" src="assets/rice.png" />
              </div>
              <p className="font-bold text-gray-600">Alternate Food</p>
            </div>
            <div className="flex w-[33%] flex-col items-center">
              <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full border-[1px] border-gray-300">
                <img className="w-[40px]" src="assets/vegetables.png" />
              </div>
              <p className="font-bold text-gray-600">Recommend</p>
            </div>
          </div>
        </div>
        <div className="p-[10px]">
          <div
            className="rounded-lg border-[1px] shadow-lg border-gray-300 p-[10px]"
            onClick={() => router.push("/maps")}
          >
            <img className="rounded-lg" src="assets/map.png"></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
