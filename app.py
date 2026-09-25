import os
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "change-this-secret-before-production")

database_url = os.environ.get("DATABASE_URL", "sqlite:///friendly_ai.db")
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class BusinessEnquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(160))
    email = db.Column(db.String(160), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    service = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class StudentEnquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    college = db.Column(db.String(180), nullable=False)
    email = db.Column(db.String(160), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    domain = db.Column(db.String(120), nullable=False)
    program = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.String(40))
    mode = db.Column(db.String(40))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/students")
def students():
    return render_template("students.html")

@app.route("/domain")
def domain():
    return render_template("domain.html")

@app.post("/business-enquiry")
def business_enquiry():
    item = BusinessEnquiry(
        name=request.form["name"].strip(),
        company=request.form.get("company","").strip(),
        email=request.form["email"].strip(),
        phone=request.form["phone"].strip(),
        service=request.form["service"].strip(),
        message=request.form["message"].strip()
    )
    db.session.add(item); db.session.commit()
    flash("Project enquiry saved successfully.")
    return redirect(url_for("home") + "#contact")

@app.post("/student-enquiry")
def student_enquiry():
    item = StudentEnquiry(
        name=request.form["name"].strip(),
        college=request.form["college"].strip(),
        email=request.form["email"].strip(),
        phone=request.form["phone"].strip(),
        domain=request.form["domain"].strip(),
        program=request.form["program"].strip(),
        duration=request.form.get("duration",""),
        mode=request.form.get("mode","")
    )
    db.session.add(item); db.session.commit()
    flash("Student enquiry saved successfully.")
    return redirect(url_for("students") + "#enquiry")

@app.route("/admin")
def admin():
    # Add login/authentication before using this page publicly.
    businesses = BusinessEnquiry.query.order_by(BusinessEnquiry.created_at.desc()).all()
    students_data = StudentEnquiry.query.order_by(StudentEnquiry.created_at.desc()).all()
    return render_template("admin.html", businesses=businesses, students=students_data)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
