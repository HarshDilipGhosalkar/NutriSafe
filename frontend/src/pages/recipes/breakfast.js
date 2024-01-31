import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InstructionCard from "@/components/InstructionCard";

const ingredients = [
  "1 cup besan (chickpea flour)",
  "1/2 teaspoon salt",
  "1/2 teaspoon baking soda",
  "1/4 teaspoon turmeric powder",
  "1/4 teaspoon red chili powder",
  "1/4 teaspoon ginger-garlic paste",
  "1/4 cup chopped coriander leaves",
  "1/4 cup chopped green chilies",
  "1 tablespoon oil",
  "2 cups water",
];

const instruction = [
  "In a large bowl, whisk together the besan, salt, baking soda, turmeric powder, red chili powder, ginger-garlic paste, coriander leaves, and green chilies.",
  "Gradually add water, whisking constantly, until a smooth batter is formed.",
  "Heat the oil in a nonstick pan over medium heat.",
  "Pour a ladleful of batter onto the pan and spread it out into a thin circle.",
  "Cook for 2-3 minutes per side, or until golden brown.",
  "Serve hot with chutney or yogurt.",
];

const details = {
  name: "Jain Besan Chilla",
  details: {
    nutrients: {
      calories: "200",
      carbohydrates: "20g",
      fat: "10g",
      protein: "10g",
    },
  },
};

const Breakfast = () => {
  return (
    <div>
      <div className="h-[150px] bg-red-100">IMAGE</div>
      <div className="p-[10px]">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="flex gap-x-[20px]">
            <TabsTrigger className="rounded-full" value="details">
              Details
            </TabsTrigger>
            <TabsTrigger className="rounded-full" value="incredient">
              Ingredients
            </TabsTrigger>
            <TabsTrigger className="rounded-full" value="instruction">
              Instructions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-[10px] py-[10px] px-[15px]">
            <div className="px-[10px] rounded-lg border-[1px] border-red-300 bg-red-100 px-[20px] p-[10px]">
              <h1 className="text-2xl mb-[20px]">{details.name}</h1>
              <h1 className="text-xl font-bold">Nutrients:</h1>
              <div className="text-xl">
                <p className="text-red-700">Calories: {details.details.nutrients.calories}</p>
                <p className="text-green-700">Carbohydrates: {details.details.nutrients.carbohydrates}</p>
                <p className="text-yellow-600">Fat: {details.details.nutrients.fat}</p>
                <p className="text-blue-700">Protein: {details.details.nutrients.protein}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="incredient">
            <div className="p-[15px]">
              {ingredients.map((items) => (
                <div className="rounded-lg py-[10px] px-[20px] mb-[10px] border-gray-300 border-[1px]">
                  <p>{items}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="instruction">
            <div className="p-[15px]">
              <div className="flex flex-col bg-gray-100">
                <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                <InstructionCard instructions={instruction} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Breakfast;
