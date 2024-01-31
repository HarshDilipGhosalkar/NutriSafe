import React from "react";

const Recipies = () => {
  return (
    <div>
      <div className="w-full mb-[20px]">
        <img className="rounded-t-[20px]" src="assets/header.png"></img>
      </div>
      <div className="px-[10px]">
        <h1 className="font-bold text-3xl mb-[20px]">Select Category</h1>
        <div className="flex flex-col gap-y-[20px]">
          <div className="h-[100px] pl-[20px] flex items-center rounded-[20px] bg-[#ffefcb] overflow-hidden">
            <div className="py-[10px]">
              <p className="font-bold text-xl">Breakfast</p>
              <p className="text-gray-600">
                Breakfast energizes the day, fostering health and productivity
                early on.
              </p>
            </div>
            <img className="h-[100%] mr-[-30px]" src="assets/breakfast.png"></img>
          </div>
          <div className="h-[100px] py-[10px] px-[20px] flex rounded-[20px] bg-[#ceedff]">
            <img></img>
            <div>
              <p className="font-bold text-xl">Lunch</p>
              <p className="text-gray-600">
                Lunch rejuvenates, offering a midday pause and refueling energy.
              </p>
            </div>
          </div>
          <div className="h-[100px] py-[10px] px-[20px] flex rounded-[20px] bg-[#ffcece]">
            <img></img>
            <div>
              <p className="font-bold text-xl">Dinner</p>
              <p className="text-gray-600">
                Dinner concludes the day, nourishing and winding down for rest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipies;
