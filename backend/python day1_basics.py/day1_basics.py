# Day 1 - Python Basics for Inventra

# 1. Variables
product_name = "Laptop"
quantity = 5
price = 49999.99
in_stock = True

# 2. Print output
print("Product:", product_name)
print("Quantity:", quantity)
print("Price:", price)
print("In Stock:", in_stock)

# 3. Conditional statement
if quantity > 0:
    print("Stock is available.")
else:
    print("Out of stock.")

# 4. Loop
for i in range(1, 6):
    print("Day", i)

# 5. Function
def calculate_total(qty, unit_price):
    return qty * unit_price

total = calculate_total(quantity, price)
print("Total value:", total)

# 6. List and Dictionary
items = ["Mouse", "Keyboard", "Monitor"]
details = {"name": "Router", "stock": 10, "price": 1500}

print("Items list:", items)
print("Details dictionary:", details)
