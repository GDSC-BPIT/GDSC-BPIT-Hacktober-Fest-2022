'''
playing the game of stone,paper & scissor with a voice assisstant Jiya ...
'''

import time
import pyttsx3
import datetime
import speech_recognition as sr
import os
import random

engine=pyttsx3.init("sapi5")
voices=engine.getProperty("voices")
engine.setProperty("voice",voices[1].id)
def speak(audio):
    engine.say(audio)
    engine.runAndWait()
def takecom():
    r=sr.Recognizer()
    with sr.Microphone() as source :
        print("listening ... ")
        r.pause_threshold = 0.9
        audio = r.listen(source)
    try:
        print("Recognizing...")    
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}")
    except Exception :
        print("i couldn't understand what u said !")
        return "None"  
    return query
    
i=0
ps=0
cs=0

print("Hello ! I am Jiya and let's play stone , paper and scissors . ")
speak(" Hello ! I am Jiya and let's play stone , paper and scissors .")

while i<3:
    game=['stone','paper','scissor']
    print('stone,paper & scissor')
    speak("stone,paper & scissor")
    speak('make your choice from above:')
    p=takecom().lower()
    x=random.randint(0,2)
    com=game[x]
    print(com)
    if com==p:
        print('tie')
        speak('tie')
        ps+=1
        cs+=1
    elif com==game[0] and p==game[1]:
        print("you win")
        speak("you win")
        ps+=1
    elif com==game[0]  and p==game[2]:
        print("you lose")
        speak("you lose")
        cs+=1
    elif com==game[1] and p==game[2]:
        print("you win")
        spaek("you win")
        ps+=1
    elif com==game[1] and p==game[0]:
        print("you lose")
        speak("you lose")
        cs+=1
    elif com==game[2] and p==game[0]:
        print("you win")
        speak("you win")
        ps+=1
    elif com==game[2] and p==game[1]:
        print("you lose")
        speak("you lose")
        cs+=1
    else:
        print('unknown error')
        speak('unknown error')    
    i+=1

speak("the results are - ")
print( " your score ", ps)
print(" computer's score", cs)

      
time.sleep(5)




