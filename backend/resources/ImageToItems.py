from flask import request
from flask_restful import Resource, reqparse
import google.generativeai as genai
from pathlib import Path
import json
from io import BytesIO


genai.configure(api_key = 'AIzaSyCZ3hM3g0uvHPhgvzjpK1xBJ1_gk6I8sY0')

generation_config = {
  "temperature": 0.4,
  "top_p": 1,
  "top_k": 32,
  "max_output_tokens": 4096,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  }
]

model = genai.GenerativeModel(model_name = "gemini-pro-vision",
    generation_config = generation_config,
    safety_settings = safety_settings
)

def input_image_setup(image):
    image_parts = [
        {
            "mime_type": "image/png",
            "data": image.getvalue()
        }
    ]
    return image_parts

def generate_gemini_response(input_prompt, image, question_prompt):

    image_prompt = input_image_setup(image)
    prompt_parts = [input_prompt, image_prompt[0], question_prompt]
    response = model.generate_content(prompt_parts)
    return response.text

input_prompt = """
You will receive input images of any plant or crop and you have to predict the plant/crop name and also whether the plant is healthy or not if plant/crop is not healthy then also provide disease name and if the plant is healthy then return empty crop_disease field.Strictly,note don't give general disease name give the exact name of the disease the crop has. 
               
"""

question_prompt = """You will receive input images of any plant or crop and you have to predict the plant/crop name and also whether the plant is healthy or not if plant/crop is not healthy then also provide disease name and if the plant is healthy then return empty crop_disease field and aslo give a small description of the image like which crop/plant is present and describe that image in few words like is the crop/plant is having certain disease the write about it if not then dont.Note don't give general disease name give the exact name of the disease the crop has. Strictly no other words, introduction and outro are allowed.Also plant description should not be more than 3 4 lines
    for example if crop/plant is healthy: 
        
            {"cropName": "banana", "health_status": "yes","disease_name":"" ,plant_description:""}
            
        example if plant/crop is not healthy: 
        
            {"cropName": "banana", "health_status": "no","disease_name":"Earaly blight",plant_description:"A banana plant with black spots on it"},

         
           
        
        The above format is just for example return the response in above format .
    Strictly no \n or \ or any other special characters are allowed. don't format your response in any way.
"""

class ImageToItems(Resource):
    def post(self):
        image = request.files['image']

        image_content = BytesIO(image.read())
        response = generate_gemini_response(input_prompt, image_content, question_prompt)
        parsed_array = json.loads(response)

        return {"error": False, "data": parsed_array}, 200
        