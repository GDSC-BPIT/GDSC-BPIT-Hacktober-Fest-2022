'''
playing the game of stone,paper & scissor (interface version)
'''
from tkinter import *
import random

p1=Tk()
p1['bg']='aqua'
p1.geometry("1150x630+0+0")
p1.title("stone paper scissor game")
p1.resizable(False,False)
computer_value = {"0":"Rock","1":"Paper","2":"Scissor"}

canvas1=Canvas(p1,width=10,height=550,bg='black').place(x=50,y=20)
canvas2=Canvas(p1,width=10,height=500,bg='black').place(x=100,y=40)
canvas3=Canvas(p1,width=10,height=450,bg='black').place(x=150,y=60)
canvas4=Canvas(p1,width=10,height=400,bg='black').place(x=200,y=80)
canvas5=Canvas(p1,width=10,height=400,bg='black').place(x=950,y=80)
canvas6=Canvas(p1,width=10,height=450,bg='black').place(x=1000,y=60)
canvas7=Canvas(p1,width=10,height=500,bg='black').place(x=1050,y=40)
canvas8=Canvas(p1,width=10,height=550,bg='black').place(x=1100,y=20)

def reset_game():
    b1["state"] = "active"
    b2["state"] = "active"
    b3["state"] = "active"
    l1.config(text = "Player")
    l3.config(text = "Computer")
    l4.config(text = "")
def button_disable():
    b1["state"] = "disable"
    b2["state"] = "disable"
    b3["state"] = "disable"

def isrock():
    c_v = computer_value[str(random.randint(0,2))]
    if c_v == "Rock":
        match_result = "Match Draw"
    elif c_v=="Scissor":
        match_result = "Player Win"
    else:
        match_result = "Computer Win"
    l4.config(text = match_result)
    l1.config(text = "Rock")
    l3.config(text = c_v)
    button_disable()
def ispaper():
    c_v = computer_value[str(random.randint(0, 2))]
    if c_v == "Paper":
        match_result = "Match Draw"
    elif c_v=="Scissor":
        match_result = "Computer Win"
    else:
        match_result = "Player Win"
    l4.config(text = match_result)
    l1.config(text = "Paper")
    l3.config(text = c_v)
    button_disable()
def isscissor():
    c_v = computer_value[str(random.randint(0,2))]
    if c_v == "Rock":
        match_result = "Computer Win"
    elif c_v == "Scissor":
        match_result = "Match Draw"
    else:
        match_result = "Player Win"
    l4.config(text = match_result)
    l1.config(text = "Scissor")
    l3.config(text = c_v)
    button_disable()

Label(p1,text = "STONE PAPER SCISSOR",font = "georgia 38 bold underline",bg='aqua',fg = "black").pack(pady = 20)
frame2 = Frame(p1,bg='aqua')
frame2.pack()
l1 = Label(frame2,text = "Player",font=("arial",20),bg="aqua")
l2 = Label(frame2,text = "VS",font=("arial",20),bg="aqua")
l3 = Label(frame2, text = "Computer",font=("arial",20),bg="aqua")
l1.pack()
l2.pack()
l3.pack()
l4 = Label(p1,text = "",font = "normal 20 bold",bg = "white",width = 15 ,borderwidth = 2,relief = "solid")
l4.pack(pady = 20)
frame1 = Frame(p1,bg='aqua')
frame1.pack()
b1 = Button(frame1, text = "Rock",bg="#78f50b",fg="black",font=("arial",20), width = 7,command = isrock)
b2 = Button(frame1, text = "Paper ",bg="#78f50b",fg="black",font=("arial",20), width = 7,command = ispaper)
b3 = Button(frame1, text = "Scissor",bg="#78f50b",fg="black",font=("arial",20), width = 7,command = isscissor)
b1.pack(side = LEFT, padx = 10)
b2.pack(side = LEFT,padx = 10)
b3.pack(padx = 10)
button_reset=Button(p1,bg="white",fg="black",text="Reset Game",font=("arial",20),command = reset_game).pack(pady = 20)
button_exit=Button(p1,bg="white",fg="black",text="EXIT",font=("arial",20),command=p1.destroy)
button_exit.pack()
p1.mainloop()
