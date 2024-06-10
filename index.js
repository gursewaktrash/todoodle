import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
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
  clearInputField()

});


//Call the onValue function with TodoodleListInDB 
onValue(todoodleListInDB, function(snapshot){

    //Use Object.values() to convert snapshot.val() from Object to an Array. Create a variable to this.
    let itemsArray = Object.values(snapshot.val())

    //Log the items as an array
    console.log("Items in Array: " + itemsArray)

    //Clear the list before the loop to avoid duplicate data featched
    cleartodoodlelistItems()

    //Use for loop to get itemsArray and console log each item , Log them as 1 by 1 
    for(let i = 0; i <itemsArray.length; i++) {

        //Use addItemsToTodoodleList(inputvalue) function inside of the loop to add item to the list for each item
        addItemsToTodoodleList(itemsArray[i])
        console.log("ArrayItems : " +itemsArray[i])
    }

    
})

//Function to clear todoodleListDisplay
function cleartodoodlelistItems(){
    todoodlelistItems.innerHTML = ""
}

//Function to clear values
function clearInputField( ){
    inputField.value = ""
}

//Function to create a new <li> item with the inputvalue to the todoodle-list <ul>
function addItemsToTodoodleList(inputvalue) {
    todoodlelistItems.innerHTML +=  `<li>${inputvalue}</li>`
}