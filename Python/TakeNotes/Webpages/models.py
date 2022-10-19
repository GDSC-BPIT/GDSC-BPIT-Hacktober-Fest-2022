# This file deals with the database of the users

# . means import from package

from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

# For the notices
class Note(db.Model):
    id = db.Column(db.Integer , primary_key = True);
    data = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone = True) , default = func.now())

    # Establishing a Foreign Key relationship: (lowercase required)
    user_id = db.Column(db.Integer , db.ForeignKey('user.id'))

# class Reminder(db.Model):
#     id = db.Column(db.Integer , primary_key = True);
#     data = db.Column(db.String(10000))
#     date = db.Column(db.DateTime(timezone = True) , default = func.now())

#     # Establishing a Foreign Key relationship: (lowercase required)
#     user_id = db.Column(db.Integer , db.ForeignKey('user.id'))

# For User Login and Sign Up
class User(db.Model , UserMixin):
    id = db.Column(db.Integer , primary_key = True);
    email = db.Column(db.String(150) , unique = True);
    password = db.Column(db.String(150));
    firstName = db.Column(db.String(150));
    notes = db.relationship("Note");