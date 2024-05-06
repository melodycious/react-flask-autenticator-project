import os 
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

api = Blueprint('api', __name__)

# Create Flask application instance
app = Flask(__name__)

# Configure JWT secret key
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')

# Initialize CORS extension
CORS(app)

# Initialize JWT extension
jwt = JWTManager(app)

# Route to authenticate users and return JWTs
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

# Sample route
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200
