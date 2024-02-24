import json
import os
from flask_restful import Resource, reqparse
from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from llama_index import (
    LangchainEmbedding,
    ServiceContext,
    StorageContext,
    load_index_from_storage,
    set_global_service_context,
)
from llama_index.memory import ChatMemoryBuffer
from .prompt import *

os.environ["TOKENIZERS_PARALLELISM"] = "False"
os.environ["OPENAI_API_KEY"] = "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"

model = LangchainEmbedding(HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2'))
service_context = ServiceContext.from_defaults(embed_model=model)
set_global_service_context(service_context)

storage_context = StorageContext.from_defaults(persist_dir="./AI/balance_dosh_index")
balance_dosh_index= load_index_from_storage(storage_context)

memory = ChatMemoryBuffer.from_defaults(token_limit=1500)

remediesChatEngine = balance_dosh_index.as_chat_engine(
    chat_mode="context",
    memory=memory,
    system_prompt= prompt1,
)

class remedies(Resource):
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("symptoms", type=str, required=True, help="symptoms is required")
        parser.add_argument("cropName", type=str, required=True, help="cropName is required")
        parser.add_argument("disease_name", type=str, required=True, help="disease_name is required")
        args = parser.parse_args()
        symptoms = args["symptoms"]
        cropName =args["cropName"]
        disease_name=args["disease_name"]
        promt=f"cropName={cropName},disease_name={disease_name},symptoms={symptoms} give treatment and fertilizers"
        try:
            response = remediesChatEngine.chat(promt)
            print(response)
            json_response = json.loads(response.response)
            print(json_response)
            json_response["symptoms"] = symptoms
            return {"error": False, "data": json_response}, 200
        except Exception as e:
            return {"error": True, "message": str(e)}, 500
    