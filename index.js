import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-databse-6ecea-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputField = document.querySelector("#input-field");
const addButton = document.querySelector("#add-button");
const shoppingList = document.querySelector("#shopping-list");

addButton.addEventListener("click", () => {
  let inputVal = inputField.value;

  // push(shoppingListInDB, inputVal)

  appendToShoppingList(inputVal);

  clearInput();

  console.log(`${inputVal} added to database`);
});

function appendToShoppingList(input) {
  shoppingList.innerHTML += `<li>${input}</li>`;
}

function clearInput() {
  inputField.value = "";
}
