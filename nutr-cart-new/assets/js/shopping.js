document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const groceryList = document.getElementById("groceryList");
  const summaryContainer = document.getElementById("summaryContainer");

  // Function to load data file
  function loadData(callback) {
    fetch('assets/json/grocery.json')
      .then(response => response.json())
      .then(data => callback(data))
      .catch(error => console.error('Error loading data:', error));
  }

  // Function to calculate total price and carb count at each store and create button-like summaries
  function calculateTotal(result, data, listItems) {
    summaryContainer.innerHTML = ''; // Clear previous summary

    const storesTotalPrice = {};
    const storesTotalCarbs = {};
    const storesTotalSugar = {};
    const dict = { "Trader Joe's": [], "Aldi's": [], "Pavilions": [] };

    data.stores.forEach(store => {
      const storeName = store.name;
      storesTotalPrice[storeName] = 0; // Initialize total price for this store to 0
      storesTotalCarbs[storeName] = 0; // Initialize total carbs for this store to 0
      storesTotalSugar[storeName] = 0

      listItems.forEach(item => {
        const itemName = item.textContent.trim();
        if (result === "option1") {
          if (itemName in store.prices) {
            dict[storeName].push(' Price from ' + itemName + " - " + store.prices[itemName]);
            storesTotalPrice[storeName] += store.prices[itemName]; // Add item price to total price
            storesTotalCarbs[storeName] += store.carbs[itemName]; // Add item carb count to total carbs
            storesTotalSugar[storeName] += store.sugar[itemName]
          }
        }
        if (result === "option2") {
          if (itemName in store.prices) {
            dict[storeName].push(' Carbs from ' + itemName + " - " + store.carbs[itemName]);
            storesTotalPrice[storeName] += store.prices[itemName]; // Add item price to total price
            storesTotalCarbs[storeName] += store.carbs[itemName]; // Add item carb count to total carbs
            storesTotalSugar[storeName] += store.sugar[itemName]
          }
        }
        if (result === "option3") {
          if (itemName in store.prices) {
            dict[storeName].push(' Sugar from ' + itemName + " - " + store.sugar[itemName]);
            storesTotalPrice[storeName] += store.prices[itemName]; // Add item price to total price
            storesTotalCarbs[storeName] += store.carbs[itemName]; // Add item carb count to total carbs
            storesTotalSugar[storeName] += store.sugar[itemName]
          }
        }
      });
    });
    let sortedStores = '';
    if (result === "option1") {
      sortedStores = Object.keys(storesTotalPrice).map(storeName => ({
        name: storeName,
        totalPrice: storesTotalPrice[storeName],
        totalCarbs: storesTotalCarbs[storeName],
        totalSugar: storesTotalSugar[storeName]
      })).sort((a, b) => a.totalPrice - b.totalPrice);
    }
    if (result === "option2") {
      sortedStores = Object.keys(storesTotalPrice).map(storeName => ({
        name: storeName,
        totalPrice: storesTotalPrice[storeName],
        totalCarbs: storesTotalCarbs[storeName],
        totalSugar: storesTotalSugar[storeName]
      })).sort((a, b) => a.totalCarbs - b.totalCarbs);
    }
    if (result === "option3") {
      sortedStores = Object.keys(storesTotalPrice).map(storeName => ({
        name: storeName,
        totalPrice: storesTotalPrice[storeName],
        totalCarbs: storesTotalCarbs[storeName],
        totalSugar: storesTotalSugar[storeName]
      })).sort((a, b) => a.totalSugar - b.totalSugar);
    }

    sortedStores.forEach(store => {
      const storeName = store.name;
      const storeButton = document.createElement("button");
      storeButton.classList.add("summary-button"); // Add summary-button class
      storeButton.textContent = `${storeName}: Price - $${storesTotalPrice[storeName].toFixed(2)}, Carbs - ${storesTotalCarbs[storeName]}, Sugar - ${storesTotalSugar[storeName]}`;
      summaryContainer.appendChild(storeButton);

      const additionalParagraph = document.createElement("p");
      additionalParagraph.textContent = dict[storeName]
      additionalParagraph.classList.add("additional-paragraph");
      additionalParagraph.style.display = "none"; // Initially hide the paragraph
      summaryContainer.insertBefore(additionalParagraph, storeButton);

      // Change color on hover
      storeButton.addEventListener("mouseover", function() {
        this.style.backgroundColor = "#FFC0CB"; // Change color on hover
        additionalParagraph.style.display = "block";
        additionalParagraph.style.color = "gray";
        additionalParagraph.style.margin = "auto";
        additionalParagraph.style.textAlign = "center";

      });
      storeButton.addEventListener("mouseout", function() {
        this.style.backgroundColor = ""; // Revert to default color when mouse leaves
        additionalParagraph.style.display = "none";
      });
    });
  }

  // Get the dropdown element
  const dropdown = document.getElementById('dropdown');
  // Get the output div
  const output = document.getElementById('output');
  let result = '';
  dropdown.addEventListener('change', function() {
    // Check which option is selected
    result = this.value;
  });
  
  searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      const newItem = searchInput.value.trim();
      if (newItem !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = newItem;
        groceryList.appendChild(listItem);
        searchInput.value = ""; // Clear input after adding item

        // Load data and calculate prices and carbs
        loadData(data => calculateTotal(result, data, groceryList.querySelectorAll("li")));
      }
    }
  });
});