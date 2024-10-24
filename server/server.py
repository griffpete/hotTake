from flask import Flask, request
from dataBase import postDB

app = Flask(__name__)

#print("db", db.readAllRecords())
#print("subjects:", subjects.readAllRecords())
@app.route("/userPosts/<int:post_id>", methods=["OPTIONS"])
def handle_cors_preflight(post_id):
    return "", 204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type"
    }


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