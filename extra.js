

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-ea176-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const books = ref(database, "books");

const inputField = document.querySelector("#input-field");
const addButton = document.querySelector("#add-button");
const shoppingList = document.querySelector("#shopping-list");

onValue(books, function(snapshot) {
  clearList()
  let booksArray = Object.values(snapshot.val())
  console.log(snapshot.val());
  console.log(booksArray);
  for (let i = 0; i < booksArray.length; i++) {
    let currentBook = booksArray[i]
    appendToList(currentBook)
    console.log(currentBook)
  }
})

function clearList() {
  shoppingList.innerHTML = ""
}

function appendToList(input) {
  shoppingList.innerHTML += `<li>${input}</li>`
}

addButton.addEventListener("click", () => {
  let inputVal = inputField.value;

  push(books, inputVal)

  // appendToShoppingList(inputVal);

  clearInput();

  console.log(`${inputVal} added to database`);
});

function appendToShoppingList(input) {
  shoppingList.innerHTML += `<li>${input}</li>`;
}

function clearInput() {
  inputField.value = "";
}
