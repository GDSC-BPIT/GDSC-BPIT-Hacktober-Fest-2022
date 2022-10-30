import csv
import matplotlib.pyplot as plt
import numpy as np
import pyttsx3
import datetime

f=open("covidlist.csv","r")
mr=csv.reader(f)

engine=pyttsx3.init("sapi5")
voices=engine.getProperty("voices")
engine.setProperty("voice",voices[1].id)

def speak(audio):
    engine.say(audio)
    engine.runAndWait()


def wishme ():
    hour=int(datetime.datetime.now().hour)
    if hour>=0 and hour<12:
        speak("good morning!")
    elif hour>=12 and hour<18:
        speak("good afternoon!")
    else :
        speak("good evening!")


        
print (""" hello everyone !
today we are going to see a demo of data visualisation using python libararies - matplotlib and numpy .
Here is a sample case study - data analysis of  ' covid 19 cases ' as to how many people of a city got infected with virus , death rate , recovery rate etc.
so get ready !!! """)
speak(""" hello everyone !
today we are going to see a demo of data visualisation using python libararies - matplotlib and numpy .
Here is a sample case study - data analysis of  ' covid 19 cases ' as to how many people of a city got infected with virus , death rate , recovery rate etc.
so get ready !!!""")


#variables
totalpop=0
covidpop=0
tkids=0#(0<A<12)
ckids=0
told=0#(60<A<110)
cold=0
tteens=0#(13<A<18)
cteens=0
tyouth=0#(18<A<30)
cyouth=0
tadults=0#(25<A<60)
cadults=0
tfemale=0
cfemale=0
tmale=0
cmale=0
diedcovidpop=0
nodiecovidpop=0
nodienoncovidpop=0

#table and query condt.

print("="*100)
print("%5s"%"S NO.","%30s"%"NAME","%10s"%"AGE","%10s"%"GENDER","%16s"%"Covid positive or not","%11s"%"DIED OR NOT")
print("="*100)
for row in mr :
        print("%5s"%row[0],"%30s"%row[1],"%10s"%row[2],"%10s"%row[3],"%16s"%row[4],"%11s"%row[5])
        print("_"*100)
        totalpop+=1
        if row[4]=='C' :
            covidpop+=1
        if int(row[2])>0 and int(row[2])<12 :
            tkids+=1
        if int(row[2])>0 and int(row[2])<12 and row[4]=="C":
            ckids+=1
        if int(row[2])>60 :
            told+=1
        if int(row[2])>60 and row[4]=="C" :
            cold+=1
        if int(row[2])>13 and int(row[2])<18 :
            tteens+=1
        if int(row[2])>13 and int(row[2])<18 and row[4]=="C" :
            cteens+=1
        if int(row[2])>18 and int(row[2])<30:
            tyouth+=1
        if int(row[2])>18 and int(row[2])<30 and row[4]=="C" :
            cyouth+=1
        if int(row[2])>30 and int(row[2])<60:
            tadults+=1
        if int(row[2])>30 and int(row[2])<60 and row[4]=="C" :
            cadults+=1
        if row[3]=="F":
            tfemale+=1
        if row[3]=="F" and row[4]=="C" :
            cfemale+=1
        if row[3]=="M":
            tmale+=1
        if row[3]=="M" and row[4]=="C" :
            cmale+=1
        if row[5]=="D":
            diedcovidpop+=1
        if row[5]=="N" and row[4]=="C" :
            nodiecovidpop+=1
        if row[5]=="N" and row[4]=="S" :
            nodienoncovidpop+=1


print("="*100)
print("total no.of people in city ,covid affected people")
print(totalpop,covidpop)
print("total kids,covid affected kids, total old,covid positive old,total teens,covid positive teens,total youth,covid positive youth,total adults, covid adults")
print(tkids,ckids,told,cold,tteens,cteens,tyouth,cyouth,tadults,cadults)
print("total female,covid affected female,total male,covid affected male")
print(tfemale,cfemale,tmale,cmale)
print("total covid affected people,people died due to covid,covid affected people recovered,people without covid")
print(covidpop,diedcovidpop,nodiecovidpop,nodienoncovidpop)






print('''


graphical analysis of data


''')

x1=[1,2,3,4]
y1=[totalpop,tkids,told,tadults]
y2=[covidpop,ckids,cold,cadults]
plt.plot(x1,y1,label=" total population gragh",color="green",marker="*")
plt.plot(x1,y2,label=" covid population gragh",color="red",marker="d")
plt.xlabel("population,kids,old,adults")
plt.ylabel("no. of people")
plt.title("data anaylsis")
plt.legend()
plt.show()

x1=[1,2]
y1=[tfemale,tmale]
y2=[cfemale,cmale]
plt.plot(x1,y1,label=" total population (gender) gragh",color="green",marker="*")
plt.plot(x1,y2,label=" covid population (gender) gragh",color="red",marker="d")
plt.xlabel("female,male")
plt.ylabel("no. of people")
plt.title("data anaylsis onthe basis of gender")
plt.legend()
plt.show()



x1=[1,4,7,10]
x2=[2,5,8,11]
y1=[totalpop,tkids,told,tadults]
y2=[covidpop,ckids,cold,cadults]
plt.bar(x1,y1,color="green")
plt.bar(x2,y2,color="red")
plt.xlabel("population,kids,old,adults")
plt.ylabel("no. of people")
plt.title("data anaylsis")
plt.show()





y1=[tfemale,tmale]
y2=[cfemale,cmale]
x=np.arange(len(y1))
plt.bar(x,y1,width=0.35,color="green")
plt.bar(x+0.35,y2,width=0.35,color="red")
plt.xlabel("female,male")
plt.ylabel("no. of people")
plt.title("data anaylsis")
plt.show()



x=["covid affected kids","covid affected old","covid affected teens","covid affected youth","covid affected adults"]
y=[ckids,cold,cteens,cyouth,cadults]
plt.pie(y,labels=x,autopct="%3d%%")
plt.title("data anaylsis")
plt.legend()
plt.show()

x=["covid affected died","covid affected recorvered"]
y=[diedcovidpop,nodiecovidpop]
plt.pie(y,labels=x,autopct="%6.2f%%")
plt.title("data anaylsis")
plt.legend(loc="upper left")
plt.show()

y=[cfemale,cmale]
x=["covid affected female","covid affected male"]
e=[0.2,0]
plt.pie(y,labels=x,autopct="%6.2f%%",explode=e)
plt.title("data anaylsis")
plt.show()

