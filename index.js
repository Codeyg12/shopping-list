import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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

  inputVal = inputVal.trim();

  if (inputVal == "") {
    clearInput();
    return;
  }

  push(shoppingListInDB, inputVal);

  clearInput();

  console.log(`${inputVal} added to database`);
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let shoppingListArray = Object.entries(snapshot.val());
    clearList();
    for (let i = 0; i < shoppingListArray.length; i++) {
      let shoppingListItem = shoppingListArray[i];
      appendToShoppingList(shoppingListItem);
    }
  } else {
    shoppingList.innerHTML = "<h1>Nothing here yet</h1>";
  }
});

function appendToShoppingList(input) {
  let itemId = input[0];
  let itemName = input[1];
  let listItem = document.createElement("li");
  listItem.textContent = itemName;
  listItem.addEventListener("dblclick", () => {
    let locationOfItemInDB = ref(database, `shoppingList/${itemId}`);
    remove(locationOfItemInDB);
  });
  shoppingList.appendChild(listItem);
}

function clearInput() {
  inputField.value = "";
}

function clearList() {
  shoppingList.innerHTML = "";
}
