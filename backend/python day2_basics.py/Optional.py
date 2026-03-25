inventory = {}

def add_item(name, qty):
    inventory[name] = qty

def show_inventory():
    for item, qty in inventory.items():
        print(f"{item}: {qty} units")

# Test it
add_item("Laptops", 15)
add_item("Mice", 25)
show_inventory()
