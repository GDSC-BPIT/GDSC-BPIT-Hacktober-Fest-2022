# This file stores all the views and the frontend of the website
'''
This file has the routes of all the pages where the 
user would be going
'''

from flask import Blueprint , render_template , flash , request , jsonify

from flask_login import login_required , current_user

from .models import Note
from . import db

import json

views = Blueprint('views' , __name__);

# Tells that we need to have a previous login to redirect to this page
@views.route('/' , methods = ["GET" , "POST"])
@login_required
def home():
    if request.method == "POST":
        note = request.form.get("note");

        if len(note) < 1:
            flash("Note is too short to be noted!" , category="error")
        else :
            new_note = Note(data = note , user_id = current_user.id);
            db.session.add(new_note);
            db.session.commit();
            flash("Note Added!" , category="success")

    return render_template("home.html" , user = current_user);

@views.route("/delete-note" , methods = ["POST"])
def delete_note():
    note = json.loads(request.data);
    noteID = note["noteID"];
    note = Note.query.get(noteID)

    if note:
        if note.user_id == current_user.id:
            db.session.delete(note);
            db.session.commit();
            
    return jsonify({})


