from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from flask_restful import Api
from resources.user import (Signup, Login, Allergies)
from resources.scanner import (PackagedFood, Food)
from resources.recipe import (Recipe, RecipeFromFoodItemsAtHome)
from resources.message import Message
from mongo_engine import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os

app = Flask(__name__)
api = Api(app)
CORS(app)

app.config["JWT_SECRET_KEY"] = "all_stackers_going_to_win_hackathon"

jwt = JWTManager(app)

DB_URI = os.getenv("FLASK_MONGODB_URI")

app.config["MONGODB_HOST"] = DB_URI

db.init_app(app)

api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Allergies, "/addAllergies")
api.add_resource(PackagedFood, "/packagedFood")
api.add_resource(Food, "/food")
api.add_resource(Recipe, "/recipe")
api.add_resource(RecipeFromFoodItemsAtHome, '/recipeFromFoodItemsAtHome')
api.add_resource(Message, "/message")

if __name__ == "__main__":
    app.run(debug=True)
