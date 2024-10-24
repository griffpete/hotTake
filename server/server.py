from flask import Flask, request
from dataBase import DummyDB

app = Flask(__name__)
db = DummyDB("posts.db")
subjects = DummyDB("subjects.db")
#print("db", db.readAllRecords())
#print("subjects:", subjects.readAllRecords())

@app.route("/userPosts", methods=["GET"])
def retrieve_posts():
    POSTS = db.readAllRecords()
    return POSTS, {"Access-Control-Allow-Origin": "*"}

@app.route("/subjects", methods=["GET"])
def retrieve_subjects():
    SUBJECTS = subjects.readAllRecords()
    return SUBJECTS, {"Access-Control-Allow-Origin": "*"}

@app.route("/userPosts", methods=["POST"])
def create_posts():
    print("the request data is: ", request.form)
    dataEntry = {"Name": request.form["name"],
                "Subject":request.form["subject"],
                "Message":request.form["message"]}
    db.saveRecord(dataEntry)
    return "Created", 201, {"Access-Control-Allow-Origin": "*"}


def run():
    app.run(port=5150)


if __name__ == '__main__':
    run()