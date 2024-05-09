"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Route to authenticate users and return JWTs
@api.route("/token", methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)



@api.route('/signup', methods=['POST'])
def create_user():

    response_body = request.get_json()
    user_name = response_body['user_name']
    email = response_body['email']
    password = response_body['password']

    if not email or not password or not user_name:
        return jsonify({'error': 'Revisa los campos, debes rellenarlos todos'}), 400

    user_exist = User.query.filter_by(user_name=user_name, email=email).first()

    if user_exist:
        return jsonify({'error': 'This email has already registered before'}), 409
    
    user = User(user_name=user_name, email=email, password=password, is_active=True)

    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'Usuario registrado correctamente'}), 200
    
@api.route('/private', methods = ['GET'])
@jwt_required()
def private(): 

    new_user = get_jwt_identity()
    user = User.query.filter_by(id=new_user).first()
    if not user: 
        return jsonify({'error': 'User not found'}), 404
    
    answer = {
        "logged_in_as": new_user,
        "user": user.serialize()
    }
    return jsonify(answer), 200


@api.route('/hello', methods=['GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
