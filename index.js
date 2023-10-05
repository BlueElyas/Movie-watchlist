// Take the input of the value when the button is clicked
// Put it in the promise of API to search it up in a template literal
// When the icon is clicked, add to local storage

// If movie does not exist, do not push into localstorage

// If it works, save to local storage
// If not, display error message


// When on watchlist, take any items from local storage and display on screen
// If an item is removed, remove from local storage and unrender

const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('submit-search')



searchBtn.addEventListener('click', () => {
    let inputValue = searchInput.value
    console.log(inputValue)
    localStorage.setItem(inputValue, "test")
})

