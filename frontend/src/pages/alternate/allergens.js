import React from "react";

const foods = [
    "yogurt",
    "cheese",
    "butter",
    "sour cream",
    "ice cream",
    "milk chocolate",
    "whey protein",
    "casein",
    "lactose",
    "milk powder",
    "nonfat dry milk",
    "condensed milk",
    "evaporated milk",
    "goat milk",
    "sheep milk",
    "buffalo milk",
    "camel milk",
    "mare milk",
    "donkey milk",
    "yak milk",
    "reindeer milk",
  ]

  const AllergenFood = () => {
  return (
    <div>
      <div className="flex gap-x-[10px] px-[20px]">
        <input className="w-full py-[10px] px-[20px] bg-blue-100 rounded-[10px]" />
        <button className="bg-green-400 rounded-[10px] px-[10px] text-white font-bold py-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
      <div className="pt-[20px]">
        {foods ? (
          <div className="mt-[10px] px-[20px]">
            {foods.map((item, id) => (
              <div
                key={id}
                className="flex px-[20px] mb-[15px] bg-gray-100 border-gray-300 py-[5px] border-[1px] rounded-[10px] items-center justify-between"
              >
                <p className="font-bold text-xl">
                <span className="mr-[10px]">{id + 1}. </span> {item}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 flex flex-col items-center">
            <img src="/assets/empty_image.png"></img>
            <h1 className="font-bold text-2xl">No item yet</h1>
            <p className="mt-[10px]">Enter the Food in input box</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllergenFood;
