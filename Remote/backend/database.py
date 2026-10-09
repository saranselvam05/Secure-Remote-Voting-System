import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="saran2005",
    database="voting_system_db"
)

cursor = db.cursor()