time_limit, grid_size, no_of_trees = map(int,input().split())

trees = []
temp1 =[]
temp2 = []
temp3 = []
temp4 = []
uProfit = 0
lProfit=0
rProfit=0
dProfit=0

# calculate_profit function
def cal_profit(tree):
    currentProfit = 0

    # calculating upprofit
    upProfit(tree)
    currentProfit = uProfit
    direction = 0

    downProfit(tree)
    if dProfit > currentProfit:
        currentProfit = dProfit
        direction = 1

    rightProfit(tree)
    if rProfit > currentProfit:
        currentProfit = rProfit
        direction = 2

    leftProfit(tree)
    if lProfit > currentProfit:
        currentProfit = lProfit
        direction = 3

    return direction,currentProfit


#upProfit function
def upProfit(near_tree):
    global uProfit
    uptrees = sorted([i for i in trees if near_tree["x"] == i["x"] and near_tree["y"] < i["y"]],key=lambda j: j["y"])
    for i in uptrees:
        if near_tree["h"] > abs(i["position"] - near_tree["position"]) and near_tree["weight"] > i["weight"]:
            uProfit += i["value"]
            temp1.append(i)
            near_tree = i
        else:
            break


#downProfit function
def downProfit(near_tree):
    global dProfit
    downtrees = sorted([i for i in trees if near_tree["x"] == i["x"] and near_tree["y"] > i["y"]],key=lambda j: -j["y"])
    for i in downtrees:
        if near_tree["h"] > abs(i["position"] - near_tree["position"]) and near_tree["weight"] > i["weight"]:
            dProfit += i["value"]
            temp2.append(i)
            near_tree = i
        else:
            break


# rightProfit function
def rightProfit(near_tree):
    global rProfit
    righttrees = sorted([i for i in trees if near_tree["y"] == i["y"] and near_tree["x"] < i["x"]],key=lambda j: j["x"])
    for i in righttrees:
        if near_tree["h"] > abs(i["position"] - near_tree["position"]) and near_tree["weight"] > i["weight"]:
            rProfit += i["value"]
            temp3.append(i)
            near_tree = i
        else:
            break

# leftProfit function
def leftProfit(near_tree):
    global lProfit
    lefttrees = sorted([i for i in trees if near_tree["y"] == i["y"] and near_tree["x"] > i["x"]],key = lambda j: -j["x"])
    for i in lefttrees:
        if near_tree["h"] > abs(i["position"] - near_tree["position"]) and near_tree["weight"] > i["weight"]:
            lProfit += i["value"]
            temp4.append(i)
            near_tree = i
        else:
            break

def path1():
    list = [i for i in trees if abs(i["x"]-current_x)+abs(i["y"]-current_y)+i["d"] <= t]
    list.sort(key = lambda x: (-((x["value"]+x["tree_profit"])/(abs(x["x"]-current_x)+abs(x["y"]-current_y)+x["d"])),-(x["value"])))
    if len(list) != 0:
        return list,cal_profit(list[0])[1]
    else:
        return [],0

def path2():
    list = [i for i in trees if abs(i["x"]-current_x)+abs(i["y"]-current_y)+i["d"] <= t]
    list.sort(key = lambda x: (-(x["value"]/(abs(x["x"]-current_x)+abs(x["y"]-current_y)+x["d"])),(x["x"]-current_x)**2 + (x["y"]-current_y)**2,-(x["value"])))
    if len(list) != 0:
        return list,cal_profit(list[0])[1]
    else:
        return [],0


#-----------------------------------------------------------------------------------------------------------------

# taking input of properties for each tree in a list of dicts
for i in range(no_of_trees):
    x, y, h, d, c, p = map(int,input().split())
    trees.append({"position":x+y,"x":x,"y":y,"h":h,"d":d,"c":c,"p":p, "value":p*h*d, "weight":c*d*h, "tree_profit":0})

time = 0
current_x = 0
current_y = 0
t = time_limit

for i in trees:
    i["tree_profit"] = cal_profit(i)[1]
    temp1 = []
    temp2 = []
    temp3 = []
    temp4 = []
    uProfit = 0
    lProfit = 0
    rProfit = 0
    dProfit = 0

trees = path1()[0]

temp1 = []
temp2 = []
temp3 = []
temp4 = []
uProfit = 0
lProfit = 0
rProfit = 0
dProfit = 0

# moving
while time <= time_limit and len(trees)>0:

    direction = cal_profit(trees[0])[0]

    if current_x < trees[0]["x"]:
        print("move right\n"*(trees[0]["x"]-current_x),end="")
        t -= trees[0]["x"]-current_x

    elif current_x > trees[0]["x"]:
        print("move left\n"*(current_x-trees[0]["x"]),end="")
        t -= current_x-trees[0]["x"]

    if current_y < trees[0]["y"]:
        print("move up\n"*(trees[0]["y"]-current_y),end="")
        t -= trees[0]["y"]-current_y

    elif current_y > trees[0]["y"]:
        print("move down\n"*(current_y-trees[0]["y"]),end="")
        t -= current_y-trees[0]["y"]

#------------------- cutting trees ------------

    if direction == 0 and (t - trees[0]["d"]) >= 0 :
        print("cut up")
        a = temp1
        t -= trees[0]["d"]

    elif direction == 1 and (t - trees[0]["d"]) >= 0:
        print("cut down")
        a = temp2
        t -= trees[0]["d"]

    elif direction == 2 and (t - trees[0]["d"]) >= 0:
        print("cut right")
        a = temp3
        t -= trees[0]["d"]

    elif direction == 3 and (t - trees[0]["d"]) >= 0:
        print("cut left")
        a = temp4
        t -= trees[0]["d"]

    time += trees[0]["d"] + abs(trees[0]["x"]-current_x)+ abs(trees[0]["y"]-current_y)

    current_x = trees[0]["x"]
    current_y = trees[0]["y"]

    trees.remove(trees[0])

    if len(a) != 0 and len(trees) != 0:
        for i in a:
            trees.remove(i)
    temp1 = []
    temp2 = []
    temp3 = []
    temp4 = []
    uProfit = 0
    lProfit = 0
    rProfit = 0
    dProfit = 0

    list1,path1_profit = path1()
    temp1 = []
    temp2 = []
    temp3 = []
    temp4 = []
    uProfit = 0
    lProfit = 0
    rProfit = 0
    dProfit = 0

    list2,path2_profit = path2()
    temp1 = []
    temp2 = []
    temp3 = []
    temp4 = []
    uProfit = 0
    lProfit = 0
    rProfit = 0
    dProfit = 0

    if path1_profit > path2_profit:
        trees = list1
    else:
        trees = list2