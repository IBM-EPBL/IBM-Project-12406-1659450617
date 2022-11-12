from flask import Flask,Blueprint
from flask_cors import CORS
from flask_pymongo import PyMongo
from endpoints import api_endpoints

def create_app():
    webapp = Flask(__name__)
    CORS(webapp)

    api_blueprint = Blueprint('api_blueprint',__name__)
    api_blueprint = api_endpoints(api_blueprint)
    webapp.register_blueprint(api_blueprint, url_prefix= '/api')
    return webapp

app=create_app()
if('__main__'== __name__):
    app.run(host='0.0.0.0')