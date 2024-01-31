from flask_restful import Resource, reqparse
from models.user import User as UserModel
from models.report import Report as ReportModel
import json

class Report(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mobile_number", type=str, required=True)
        parser.add_argument("food_image", type=str, required=True)
        parser.add_argument("food_name", type=str, required=True)
        parser.add_argument("allergies_detected", type=str, required=True)

        args = parser.parse_args()

        response = UserModel.get_user_by_mobile_number(args["mobile_number"])
        if response["error"]:
            return response, 400
        
        user = response["data"]
        allergies = {
            "allergens": json.dumps(user["allergens"]),
            "allergy_foods": json.dumps(user["allergy_foods"]),
            "food_preferences": json.dumps(user["food_preferences"])
        }

        response = ReportModel.add_report(
            allergies=allergies, 
            food_image=args["food_image"],
            food_name=args["food_name"], 
            allergies_detected=args["allergies_detected"]
        )

        if response["error"]:
            return response, 400
        
        return {"error": False}, 200
    
    def get(self):
        response = ReportModel.get_reports()
        if response["error"]:
            return response, 400
        
        reports = response["data"]

        return {"error": False, "data": json.loads(reports.to_json())}, 200