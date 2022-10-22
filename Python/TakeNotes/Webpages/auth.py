# This file deals with the authentication of the users

from flask import Blueprint , render_template , request , flash , redirect , url_for

from Webpages import views
from .models import User

# Authentication Models with Flask
from flask_login import login_user , logout_user , login_required , current_user

from . import db

# Hashing a password
from werkzeug.security import generate_password_hash , check_password_hash

from Webpages.models import User

auth = Blueprint('auth' , __name__);

@auth.route("/login" , methods = ["GET" , "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"];
        password = request.form["password"];

        user = User.query.filter_by(email = email).first();

        if user:
            if check_password_hash(user.password , password):
                flash("Logged in successfully" , category="success");
                login_user(user , remember=True);
                return redirect(url_for("views.home"))
            else :
                flash("Incorrect Password. Please try again!" , category="error");
        else :
            flash("User don't exist. Please Sign Up!" , category="error");
            

    return render_template("login.html" , user = current_user)

@auth.route("/logout")
# Tells that we need to have a previous login to redirect to this page
def logout():
    logout_user();
    return redirect(url_for("auth.login"))

@auth.route("/sign-up" , methods = ["GET" , "POST"])
def signun():
    if request.method == "POST":
        email = str(request.form.get("email"));
        firstName = str(request.form.get("firstName"));
        password1 = str(request.form.get("password1"));
        password2 = str(request.form.get("password2"));

        user = User.query.filter_by(email = email).first();

        if user:
            flash("User already Exists. Please Login!" , category = "error");
        elif len(email) < 4:
            flash("Please check your email address once again" , category = "error");
        elif len(firstName) < 2:
            flash("Please check your name once again" , category = "error");
        elif password1 != password2:
            flash("Passwords don't match. Please check again!" , category = "error");
        elif len(password1) < 7:
            flash("Passwords is too short! Please enter a password greater than 7 characters" , category = "error");
        else :
            new_user = User(email=email, firstName=firstName, password=generate_password_hash(
                password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            return redirect(url_for('views.home'))

    return render_template("sign-up.html" , user = current_user)
