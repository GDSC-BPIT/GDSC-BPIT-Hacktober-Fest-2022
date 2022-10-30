import random
pos=[101,102,103,201,202,203,301,302,303]
user=[]
comp=[]
global flag
flag=0
print (" welcome to tic-tak-toe")
name=input("enter your name , player :  ")
print (''' our players are -
            1.''',name," symbol - O",
            ''' 2. computer symbol - X .''')
print('''

           |            |    
    101  |    102  |    103
           |            |
-----------------------------------------  
           |            |    
    201  |    202  |    203
           |            |
-----------------------------------------  
           |            |    
    301  |    302  |    303
           |            |


NOTE - THESE ARE THE POSITION NUMBERS OF THE BOARD-GAME .
''')
def userwin():
      global flag 
      flag=1
      print(name,"wins")
      
def compwin():
      global flag 
      flag=1
      print("computer wins")
      
def winner():
    if (all(x in user for x in [101,102,103])):
        userwin()
    
    elif (all(x in user for x in [201,202,203])):
        userwin()
    
    elif (all(x in user for x in [301,302,303])):
        userwin()
    elif (all(x in user for x in [101,201,301])):
        userwin()
    
    elif (all(x in user for x in [202,102,302])):
        userwin()
    
    elif (all(x in user for x in [303,203,103])):
        userwin()
    
    elif (all(x in user for x in [101,202,303])):
        userwin()

    elif (all(x in user for x in [103,202,301])):
        userwin()

    elif (all(x in comp for x in [101,102,103])):
        compwin()
    
    elif (all(x in comp for x in [201,202,203])):
        compwin()
    
    elif (all(x in comp for x in [301,302,303])):
        compwin()
    
    elif (all(x in comp for x in [101,201,301])):
        compwin()
    
    elif (all(x in comp for x in [202,102,302])):
        compwin()
    
    elif (all(x in comp for x in [303,203,103])):
        compwin()
    
    elif (all(x in comp for x in [101,202,303])):
        compwin()

    elif (all(x in comp for x in [103,202,301])):
        compwin()
    else:
        pass
      
def user_move():
    p=int( input ("make your move  ") )
    user.append(p)
    pos.remove(p)
    winner()
    
def comp_move():
    g=random.randint(0,len(pos)-1)
    comp.append(pos[g])
    print("computer chose for",pos[g])
    pos.remove(pos[g])
    winner()
    
answer=input("would you like to make first move (yes or no) :  ")

if answer=='yes':
    user_move()
    for i in range (4):
                comp_move()
                if flag == 1:
                      break
                user_move()
                if flag == 1:
                      break
    else :
          print("DRAW")
          
elif answer=='no':
      comp_move()
      for i in range (4):
                user_move()
                if flag == 1:
                      break
                comp_move()
                if flag == 1:
                      break
      else :
            print("DRAW")

else:
      pass

print("THANK YOU")
