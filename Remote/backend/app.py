from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db, cursor
import random

otp_store = {}

app = Flask(__name__)
CORS(app)

# ---------------- LOGIN ----------------

@app.route("/login", methods=["POST"])
def login():

    data = request.json
    voter_id = data["voter_id"]

    query = "SELECT age,has_voted FROM voters WHERE voter_id=%s"
    cursor.execute(query,(voter_id,))
    voter = cursor.fetchone()

    if voter is None:
        return jsonify({"status":"error","message":"Invalid Voter ID"})

    age=voter[0]
    voted=voter[1]

    if age < 18:
        return jsonify({"status":"error","message":"Not eligible to vote"})

    if voted == 1:
        return jsonify({"status":"error","message":"Already voted"})

    return jsonify({"status":"success"})

@app.route("/signup", methods=["POST"])
def signup():

    data = request.json

    voter_id = data["voter_id"]
    name = data["name"]
    age = data["age"]
    constituency = data["constituency"]
    phone_number = data["phone_number"]


    # Check voter already exists

    check_query = "SELECT * FROM voters WHERE voter_id=%s"

    cursor.execute(check_query,(voter_id,))

    voter = cursor.fetchone()


    if voter:

        return jsonify({

            "status":"error",
            "message":"Voter ID already exists"

        })


    # Insert voter

    query = """
    INSERT INTO voters
    (voter_id,name,age,constituency,phone_number)
    VALUES(%s,%s,%s,%s,%s)
    """


    cursor.execute(query,
    (voter_id,name,age,constituency,phone_number))


    db.commit()


    return jsonify({

        "status":"success",
        "message":"Signup successful"

    })

@app.route("/send_otp", methods=["POST"])
def send_otp():

    data = request.json

    voter_id = data["voter_id"]
    phone = data["phone_number"]


    # Check voter details
    query = """
    SELECT phone_number, has_voted 
    FROM voters 
    WHERE voter_id=%s
    """

    cursor.execute(query,(voter_id,))

    voter = cursor.fetchone()


    if voter is None:
        return jsonify({
            "status":"error",
            "message":"Invalid Voter ID"
        })


    # Check phone number
    if str(voter[0]) != str(phone):

        return jsonify({
            "status":"error",
            "message":"Phone number mismatch"
        })


    # Already voted check
    if voter[1] == 1:

        return jsonify({
            "status":"error",
            "message":"You have already voted"
        })


    # Generate OTP
    otp = random.randint(1000,9999)

    otp_store[voter_id] = otp


    print("OTP:",otp)


    return jsonify({

    "status":"success",
    "message":"OTP Sent",
    "otp":otp

})

@app.route("/verify_otp", methods=["POST"])
def verify_otp():

    data=request.json

    voter_id=data["voter_id"]
    otp=data["otp"]

    if otp_store.get(voter_id) == int(otp):
        return jsonify({"status":"success"})
    else:
        return jsonify({"status":"error"})



# ---------------- GET CANDIDATES ----------------

@app.route("/candidates/<voter_id>", methods=["GET"])
def candidates(voter_id):

    query = "SELECT constituency FROM voters WHERE voter_id=%s"
    cursor.execute(query,(voter_id,))
    voter = cursor.fetchone()

    constituency = voter[0]

    query2 = "SELECT * FROM candidates WHERE constituency=%s"
    cursor.execute(query2,(constituency,))
    rows = cursor.fetchall()

    data=[]

    for r in rows:
        data.append({
            "id":r[0],
            "name":r[1],
            "party":r[2]
        })

    return jsonify(data)


# ---------------- VOTE ----------------

@app.route("/vote", methods=["POST"])
def vote():

    data = request.json

    voter_id = data["voter_id"]
    candidate_id = data["candidate_id"]


    # Check already voted
    check_query = "SELECT has_voted FROM voters WHERE voter_id=%s"

    cursor.execute(check_query,(voter_id,))

    voter = cursor.fetchone()


    if voter is None:
        return jsonify({
            "status":"error",
            "message":"Invalid Voter ID"
        })


    if voter[0] == 1:
        return jsonify({
            "status":"error",
            "message":"You have already voted"
        })


    # Insert vote
    query = """
    INSERT INTO votes(voter_id,candidate_id)
    VALUES(%s,%s)
    """

    cursor.execute(query,(voter_id,candidate_id))


    # Update vote status
    update_query = """
    UPDATE voters 
    SET has_voted=1 
    WHERE voter_id=%s
    """

    cursor.execute(update_query,(voter_id,))


    db.commit()


    return jsonify({
        "status":"success",
        "message":"Vote submitted successfully"
    })


# ---------------- RESULTS ----------------

@app.route("/results", methods=["GET"])
def results():

    query="""
    SELECT candidates.name, COUNT(votes.vote_id)
    FROM candidates
    LEFT JOIN votes
    ON candidates.candidate_id=votes.candidate_id
    GROUP BY candidates.name
    """

    cursor.execute(query)

    rows=cursor.fetchall()

    data=[]

    for r in rows:
        data.append({
            "candidate":r[0],
            "votes":r[1]
        })

    return jsonify(data)


# =================================================
# ADMIN SECTION
# =================================================

# -------- GET ALL CANDIDATES --------

@app.route("/admin/candidates", methods=["GET"])
def admin_candidates():

    query="SELECT * FROM candidates"
    cursor.execute(query)

    rows=cursor.fetchall()

    data=[]

    for r in rows:
        data.append({
            "id":r[0],
            "name":r[1],
            "party":r[2],
            "constituency":r[3]
        })

    return jsonify(data)


# -------- ADD CANDIDATE --------

@app.route("/admin/add_candidate", methods=["POST"])
def add_candidate():

    data=request.json

    name=data["name"]
    party=data["party"]
    constituency=data["constituency"]

    query="""
    INSERT INTO candidates(name,party,constituency)
    VALUES(%s,%s,%s)
    """

    cursor.execute(query,(name,party,constituency))
    db.commit()

    return jsonify({"message":"Candidate Added"})


# -------- DELETE CANDIDATE --------

@app.route("/admin/delete_candidate/<id>", methods=["DELETE"])
def delete_candidate(id):

    query="DELETE FROM candidates WHERE candidate_id=%s"
    cursor.execute(query,(id,))
    db.commit()

    return jsonify({"message":"Candidate Deleted"})


# -------- UPDATE CANDIDATE --------

@app.route("/admin/update_candidate/<id>", methods=["PUT"])
def update_candidate(id):

    data=request.json

    name=data["name"]
    party=data["party"]
    constituency=data["constituency"]

    query="""
    UPDATE candidates
    SET name=%s, party=%s, constituency=%s
    WHERE candidate_id=%s
    """

    cursor.execute(query,(name,party,constituency,id))
    db.commit()

    return jsonify({"message":"Candidate Updated"})


# --------adminlogin------------

@app.route("/admin/login", methods=["POST"])
def admin_login():

    data = request.json

    username = data["username"]
    password = data["password"]

    query = "SELECT * FROM admin WHERE username=%s AND password=%s"
    cursor.execute(query,(username,password))

    admin = cursor.fetchone()

    if admin:
        return jsonify({"status":"success"})
    else:
        return jsonify({"status":"error","message":"Invalid credentials"})


app.run(debug=True)