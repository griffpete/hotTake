from flask import Flask, request
from dataBase import postDB, subjectsDB

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
    db = postDB('server/posts.db')
    POSTS = db.getAll()
    return POSTS, {"Access-Control-Allow-Origin": "*"}

@app.route("/userPosts/<int:post_id>", methods=["GET"])
def retrieve_one_post(post_id):
    db = postDB('server/posts.db')
    post = db.getOne(post_id)
    if not post:
        return f"Post with id {post_id} not found", 404, {"Access-Control-Allow-Origin": "*"}
    return post, {"Access-Control-Allow-Origin": "*"}

@app.route("/subjects", methods=["GET"])
def retrieve_subjects():
    db = subjectsDB('server/subjects.db')
    SUBJECTS = db.getAll()
    return SUBJECTS, {"Access-Control-Allow-Origin": "*"}

@app.route("/userPosts", methods=["POST"])
def create_posts():
    print("the request data is: ", request.form)
    name = request.form["name"]
    subject = request.form["subject"]
    message = request.form["message"]
    db = postDB('server/posts.db')
    db.create(name, subject, message)
    return "Created", 201, {"Access-Control-Allow-Origin": "*"}

@app.route("/userPosts/<int:post_id>", methods=["PUT"])
def update_post(post_id):
    db = postDB('server/posts.db')
    post = db.getOne(post_id)
    if not post:
        return f"Post with id {post_id} not found", 404, {"Access-Control-Allow-Origin": "*"}
    
    name = request.form["name"]
    subject = request.form["subject"]
    message = request.form["message"]
    db.update(post_id, name, subject, message)
    return "Updated", 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/userPosts/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    db = postDB('server/posts.db')
    post = db.getOne(post_id)
    if not post:
        return f"Post with id {post_id} not found", 404, {"Access-Control-Allow-Origin": "*"}
    db.deleteOne(post_id)
    return "Updated", 200, {"Access-Control-Allow-Origin": "*"}


def run():
    app.run(port=5150, host='0.0.0.0')


if __name__ == '__main__':
    run()