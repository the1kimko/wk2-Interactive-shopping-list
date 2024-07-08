document.addEventListener("DOMContentLoaded", () => {
    // Select the input field, add button, shopping list, and clear button elements from the DOM
    const itemInput = document.getElementById("item-input");
    const addItemButton = document.getElementById("add-btn");
    const shoppingList = document.getElementById("shopping-list");
    const clearListButton = document.getElementById("clear-btn");

    // Retrieve the stored shopping list items from local storage, or initialize an empty array if none exist
    let items = JSON.parse(localStorage.getItem('shoppingListItems')) || [];

    // Save the current list of items to local storage
    const saveItems = () => {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
    };

    // Render the shopping list items on the page
    const renderList = () => {
        shoppingList.innerHTML = ''; // Clear the existing list in the DOM
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.name;
            if (item.purchased) {
                li.classList.add('purchased');
            }
            // Add click event listener to toggle the purchased state
            li.addEventListener('click', () => {
                items[index].purchased = !items[index].purchased; // Toggle the purchased state
                saveItems();
                renderList();
            });

            // Create an edit button for each list item
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            // Add click event listener to edit the item name
            editButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click event from bubbling up to the list item
                const newName = prompt('Edit item name: ', item.name); // Prompt the user for a new name
                if (newName) { // If the user entered a new name
                    items[index].name = newName; // Update the item name
                    saveItems();
                    renderList();
                }
            });
            li.appendChild(editButton);
            shoppingList.appendChild(li);
        });
    };

    // Add click event listener to the 'Add' button to add a new item to the list
    addItemButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim(); // Get the trimmed value from the input field
        if (itemName !== '') { // If the input is not empty
            items.push({ name: itemName, purchased: false }); // Add the new item to the list
            itemInput.value = ''; 
            saveItems();
            renderList();
        }
    });

    // Add click event listener to the 'Clear List' button to clear all items from the list
    clearListButton.addEventListener('click', () => {
        items = [];
        saveItems();
        renderList();
    });

    // Initial rendering of the shopping list
    renderList();
});

