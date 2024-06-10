import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
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
  console.log(inputvalue);

  //Clear input field after add button clicked
  clearInputField()

  //Create a new <li> item with the inputvalue to the todoodle-list <ul>
  todoodlelistItems.innerHTML +=  `<li>${inputvalue}</li>`
});


function clearInputField( ){
    inputField.value = ""
}