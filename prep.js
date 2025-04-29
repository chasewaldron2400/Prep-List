// DATA STRUCTURES

// Predefined station categories
stations = ["Saute", "Grill", "Cold"]

// Prep items for each station, possibly loaded from a database or file
station_items = {
    "Saute": [ {name: "Caramelized Onions", par: 3}, {name: "Demi Glace", par: 2}, ... ],
    "Grill": [ {name: "Burger Patties", par: 20}, {name: "Grill Seasoning", par: 1}, ... ],
    "Cold": [ {name: "Salad Mix", par: 5}, {name: "Vinaigrette", par: 3}, ... ]
}

// User inputs their current inventory for each item
user_inventory = {}  // e.g., {"Caramelized Onions": 1, "Burger Patties": 15, ...}

// Final list to generate
prep_list = {}  // e.g., {"Caramelized Onions": 2, "Burger Patties": 5}


// MAIN FLOW

function startPrepListApp():
    displayStations()
    selected_station = getUserStationChoice()
    
    for item in station_items[selected_station]:
        current_quantity = getUserInput("How many of " + item.name + " do you have?")
        user_inventory[item.name] = current_quantity
        
        // Compare to par to see if more is needed
        if current_quantity < item.par:
            needed_quantity = item.par - current_quantity
            prep_list[item.name] = needed_quantity

    displayPrepList(prep_list)


// HELPER FUNCTIONS

function displayStations():
    print("Select your station:")
    for station in stations:
        print("- " + station)

function getUserStationChoice():
    input = prompt("Enter station name:")
    while input not in stations:
        input = prompt("Invalid station. Enter again:")
    return input

function getUserInput(prompt_text):
    return int(prompt(prompt_text))

function displayPrepList(list):
    print("You need to prep the following:")
    for item, qty in list.items():
        print(item + ": " + qty)
