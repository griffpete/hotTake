import sqlite3

def dict_factory(cursor, row):
    fields = []
    # Extract column names from cursor description
    for column in cursor.description:
        fields.append(column[0])

    # Create a dictionary where keys are column names and values are row values
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict

class postDB():
    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()   

    def getAll(self):
        self.cursor.execute("Select * FROM posts")
        return self.cursor.fetchall() 

    def getOne(self, post_id):
        data = [post_id] 
        self.cursor.execute("Select * FROM posts WHERE id = ?", data) 
        return self.cursor.fetchone()

    def create(self, name, subject, message):
        data = [name, subject, message]
        self.cursor.execute("INSERT INTO posts (name, subject, message) VALUES (?,?,?)", data)
        self.connection.commit()
        return True

    def update(self, post_id, name, subject, message):
        data = [name, subject, message, post_id]
        self.cursor.execute("UPDATE posts SET name = ?, subject = ?, message = ? WHERE id = ?", data)
        self.connection.commit()

    def deleteOne(self, post_id):
        data = [post_id]
        self.cursor.execute("DELETE FROM posts WHERE id = ?", data)
        self.connection.commit()

class subjectsDB: 
    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()   

    def getAll(self):
        self.cursor.execute("Select * FROM subjects")
        return self.cursor.fetchall() 

    def getOne(self, subject_id):
        data = [subject_id] 
        self.cursor.execute("Select * FROM subjects WHERE id = ?", data) 
        return self.cursor.fetchone()

    def create(self, subject):
        data = [subject]
        self.cursor.execute("INSERT INTO subjects (subject) VALUES (?)", data)
        self.connection.commit()
        return True
