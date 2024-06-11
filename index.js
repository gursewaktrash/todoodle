import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const appSettings = {
  databaseURL: "https://todoodle-cc086-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const todoodleListInDB = ref(database, "todoodleList");

const inputField = document.getElementById("input-field");
const addbutton = document.getElementById("add-button");
const todoodlelistItems = document.getElementById("todoodle-list");

addbutton.addEventListener("click", function () {
  let inputvalue = inputField.value;

  //Function to use firebase 'push' to push inputvalue to database
  push(todoodleListInDB, inputvalue);

  //Log the value from input to see if click button works
  console.log("InputValueLog: " + inputvalue);

  //Clear input field after add button clicked
  clearInputField();
});


//Call the onValue function with TodoodleListInDB
onValue(todoodleListInDB, function (snapshot) {
  //Use Object.values() to convert snapshot.val() from Object to an Array. Create a variable to this.
  let itemsArray = Object.entries(snapshot.val());

  //Clear the list before the loop to avoid duplicate data featched
  cleartodoodlelistItems();

  //Use for loop to get itemsArray and console log each item , Log them as 1 by 1
  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i]

    //Use addItemsToTodoodleList(inputvalue) function inside of the loop to add item to the list for each item
    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]

    addItemsToTodoodleList(currentItem);

    //Log the items 1 By 1
    console.log("ArrayItems : " + currentItemValue);
  }
  
});


//Function to clear todoodleListDisplay
function cleartodoodlelistItems() {
  todoodlelistItems.innerHTML = "";
}


//Function to clear values
function clearInputField() {
  inputField.value = "";
}


// Function to create a new <li> item with the inputvalue in the todoodle-list <ul>
function addItemsToTodoodleList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue


    // Create a span element
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    newEl.appendChild(span);

    //Event listener to delete item when span is clicked
    span.addEventListener("click", function(){
        let exactLocationofItemInDB = ref(database, `todoodleList/${itemID}`)
        console.log("Deleted Item: " + itemValue  )
        remove (exactLocationofItemInDB)
    })


     //Event listener for item clicked
     newEl.addEventListener("click", function(){
        console.log("Selected ItemId: " + itemID )
        newEl.classList.toggle("checked");
    })

    todoodlelistItems.append(newEl)
}

