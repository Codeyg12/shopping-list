import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'

const appSettings = {
    databaseURL: "https://playground-ea176-default-rtdb.firebaseio.com/"
}

const inputField = document.querySelector('#input-field')
const addButton = document.querySelector('#add-button')

addButton.addEventListener('click', () => {
    let inputVal = inputField.value
    console.log(inputVal)
})
