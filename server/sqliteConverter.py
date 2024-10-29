import sqlite3

connection = sqlite3.connect('subjects.db')
cursor = connection.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY,
        subject TEXT)''')

with open('subjects.txt', 'r') as file:
    subjects = file.readlines()

for subject in subjects:
    subject = subject.strip()  
    if subject:  
        cursor.execute('INSERT INTO subjects (subject) VALUES (?)', (subject,))

connection.commit()
connection.close()
