from flask import Flask, request, jsonify

from src.core import Account, Person, Traits, Sex, PersonRepository


app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/register", methods = ["POST"])
def register():
    assert request.method == "POST"

    data = request.json

    a = Account(email=data["email"])
    t = Traits(**data["traits"])
    p = Person(nickname=data["nickname"],
               sex=Sex[data["sex"]],
               traits=t,
               account=a,
              )

    pr = PersonRepository()
    return pr.store(p)
