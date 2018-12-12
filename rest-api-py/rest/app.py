from flask import Flask, jsonify, request
app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"

people = [{"id" :"1", "Firstname": "John", "Lastname":"Doe", "Address": {"City":"City X", "State":"State X"}},
          {"id" :"2", "Firstname": "Koko", "Lastname":"Doe", "Address": {"City":"City Y", "State":"State Y"}}]


@app.route('/people')
def get_people():
    return jsonify(people)


@app.route('/people', methods=['POST'])
def create_person():
    people.append(request.get_json())
    return '', 204


@app.route('/person')
def get_persion():
    id = request.args.get('id')
    match = next(p for p in people if p['id'] == id)
    return jsonify(match)

