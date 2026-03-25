stock = {"Apples": 10, "Bananas": 5, "Chocolates": 0}

item = "Chocolates"

if item in stock:
    if stock[item] > 0:
        print(f"{item} available: {stock[item]} left")
    else:
        print(f"{item} is out of stock")
else:
    print("Item not found in inventory")
