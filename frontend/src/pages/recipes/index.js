import React from "react";
import { useRouter } from "next/router";
import { useState } from 'react';




const Recipies = () => {
  const [inputText, setInputText] = useState('');
  const [isTextInput, setIsTextInput] = useState(false);
  const [textInputs, setTextInputs] = useState([]);

  const addTextInput = () => {
    if (inputText.trim() !== '') {
      setTextInputs([...textInputs, inputText]);
      setInputText('');
      setIsTextInput(false);
    }
  };

  const toggleInputType = () => {
    setIsTextInput(!isTextInput);
    if (!isTextInput) {
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTextInput();
    }
  };

  const router = useRouter();
  return (
    <div>
      <div className="w-full">
        <img className="" src="assets/header.png"></img>
      </div>
      <div className="px-[10px]">
        <h1 className="font-bold text-3xl mb-[20px]">Select Category</h1>
        <div className="flex flex-col gap-y-[20px]">
          <div
            className="h-[100px] pl-[20px] flex items-center rounded-[20px] bg-[#ffefcb] overflow-hidden"
            onClick={() => router.push("/recipes/breakfast")}
          >
            <div className="py-[10px]">
              <p className="font-bold text-xl">Breakfast</p>
              <p className="text-gray-600">
                Breakfast energizes the day, fostering health and productivity.
              </p>
            </div>
            <img
              className="h-[100%] mr-[-20px]"
              src="assets/breakfast.png"
            ></img>
          </div>
          <div
            className="h-[100px] pl-[20px] flex items-center rounded-[20px] bg-[#ceedff] overflow-hidden"
            onClick={() => router.push("/recipes/lunch")}
          >
            <div className="py-[10px] pr-[10px]">
              <p className="font-bold text-xl">Lunch</p>
              <p className="text-gray-600">
                Lunch offers a midday pause and refuel energy.
              </p>
            </div>
            <img className="h-[100%] mr-[-35px]" src="assets/lunch.png"></img>
          </div>
          <div
            className="h-[100px] pl-[20px] flex items-center rounded-[20px] bg-[#ffcece] overflow-hidden"
            onClick={() => router.push("/recipes/dinner")}
          >
            <div className="py-[10px] pr-[10px]">
              <p className="font-bold text-xl">Dinner</p>
              <p className="text-gray-600">
                Dinner concludes the day, winding down for rest.
              </p>
            </div>
            <img className="h-[100%] w-[175px]" src="assets/dinner.png"></img>
          </div>

          <div className="h-[150px] pl-[20px] items-center rounded-[20px] bg-[#ffefcb] overflow-hidden">
      {/* Part 1: Image and Text */}
      <div className="flex items-center rounded-[20px] bg-[#ffefcb] h-[60px] w-[100%]">
        <img className="h-[30%] mr-[-20px]" src="assets/sparkler.png" alt="Sparkler" />
        <div className="py-[10px] ml-[30px]">
          <p className="text-gray-600">
            We'll configure a recipe from your ingredients
          </p>
        </div>
      </div>

      {/* Part 2: Add Ingredients */}
      <div className="flex items-center rounded-[20px] bg-[#ffefcb] h-[30px] mb-2">
        {textInputs.map((text, index) => (
          <div key={index} style={{ marginBottom: '10px', display: 'flex' }}>
            <div style={{ border: '1px solid #ccc', padding: '5px', marginRight: '10px', display: 'flex', alignItems: 'center', fontSize: '9px' }}>
              {text}
              <button onClick={() => removeTextInput(index)} style={{ fontSize: '9px' }}>✖</button>
            </div>
          </div>
        ))}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          {isTextInput ? (
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ marginRight: '10px', width: '80px', fontSize: '9px', background: "#ffefcb" }}
              placeholder="Add Ingredients"
              onKeyPress={handleKeyPress}
            />
          ) : (
            <button onClick={toggleInputType} style={{ fontSize: '9px' }}>Add Ingredients</button>
          )}
        </div>
      </div>

      {/* Part 3: Generate Recipe Button */}
      <div className="flex items-center">
  <button className="h-[40px] px-4 rounded-[10px] bg-green-500 text-white" onClick={() => console.log("Generate Recipe Clicked")}>
    <div className="flex items-center rounded-[20px] h-[60px] w-[100%]" style={{ alignItems: "center" }}>
      <img className="h-[30%] mr-[-20px]" src="assets/sparkler.png" alt="Sparkler" />
      <div className="py-[10px] ml-[30px] text-white">
        <p className="text-white">
          Generate Recipe
        </p>
      </div>
    </div>
  </button>
</div>
    </div>
          </div>
      </div>
    </div>
  );
};

export default Recipies;
