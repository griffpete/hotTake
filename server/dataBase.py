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

    def getOne(self, coaster_id):
        data = [coaster_id] 
        self.cursor.execute("Select * FROM posts WHERE id = ?", data) 
        return self.cursor.fetchone()

    def create(self, name, review, rating):
        data = [name, review, rating]
        self.cursor.execute("INSERT INTO posts (name, subject, message) VALUES (?,?,?)", data)
        self.connection.commit()
        return True

    def update(self, coaster_id, name, review, rating):
        data = [name, review, rating, coaster_id]
        self.cursor.execute("UPDATE posts SET name = ?, subject = ?, message = ? WHERE id = ?", data)
        self.connection.commit()
