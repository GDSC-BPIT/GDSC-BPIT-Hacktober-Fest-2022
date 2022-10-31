import datetime
import pyttsx3
import webbrowser
import smtplib

"covid awareness project !"

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

def sendEmail(to, content):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.login('shineeaibot@gmail.com', 'radhakrishna')
    server.sendmail('shineeaibot@gmail.com', to, content)
    server.close()
wishme()
print(""" i Shinee welcome you to our project covid talks .
        Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.
        Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.
        Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are
        more likely to develop serious illness.
        The best way to prevent and slow down transmission is to be well informed about the COVID-19 virus, the disease it causes and how it spreads.
        Protect yourself and others from infection by washing your hands or using an alcohol based rub frequently and not touching your face.  """)
speak(""" i Shenai welcome you to our project covid talks .
        Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.
        Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.
        Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.
        The best way to prevent and slow down transmission is to be well informed about the COVID-19 virus, the disease it causes and how it spreads.
        Protect yourself and others from infection by washing your hands or using an alcohol based rub frequently and not touching your face.  """)

while True:
            
            print("would you like to check out our new website  :")
            ch=input("enter your answer:  ")
            if ch=="yes":
                webbrowser.open("covid.html")
                webbrowser.open("education.html")
                webbrowser.open("index.html")
            else :
                break
            print("would you like to see our blog and don't forget to share your opinion on peddlet :")
            ch=input("enter your answer:  ")
            if ch=="yes":
                webbrowser.open("https://theektaagrawal.wixsite.com/covidtimes")

            else :
                break
            print("would you like to continue to write us an feedback :")
            ch=input("enter your answer:  ")
            if ch=="yes":
                try:
                    content =input("write your feedback !!")
                    to = "shineeaibot@gmail.com"    
                    sendEmail(to, content)
                    print("Email has been sent successfully !")
                    speak("Email has been sent successfully !")
                except Exception as e:
                    speak("Sorry . I am not able to send this email")
                    print("Sorry . I am not able to send this email")
                break
            else :
                break

        


else :
        pass

print ("thank you for your time!")
speak("thank you for your time!")



