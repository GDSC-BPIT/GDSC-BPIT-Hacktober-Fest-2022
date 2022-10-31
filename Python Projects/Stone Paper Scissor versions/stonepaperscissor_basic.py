'''
playing the game of stone,paper & scissor (basic)
'''
import random
i=0
ps=0
cs=0
while i<3:
    game=['stone','paper','scissor']
    print('stone,paper & scissor')
    p=input('make your choice from above:')
    x=random.randint(0,2)
    com=game[x]
    print(com)
    if com==p:
        print('tie')
        ps+=1
        cs+=1
    elif com==game[0] and p==game[1]:
        print("you win")
        ps+=1
    elif com==game[0]  and p==game[2]:
        print("you lose")
        cs+=1
    elif com==game[1] and p==game[2]:
        print("you win")
        ps+=1
    elif com==game[1] and p==game[0]:
        print("you lose")
        cs+=1
    elif com==game[2] and p==game[0]:
        print("you win")
        ps+=1
    elif com==game[2] and p==game[1]:
        print("you lose")
        cs+=1
    else:
        print('unknown error')
    i+=1
print( " your scores ",ps)
print(" computer's scores",cs)

