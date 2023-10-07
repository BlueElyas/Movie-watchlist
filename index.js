// Take the input of the value when the button is clicked
// Put it in the promise of API to search it up in a template literal
// When the icon is clicked, add to local storage

// If movie does not exist, do not push into localstorage

// If it works, save to local storage
// If not, display error message

let arrayOfMovies = []

// When on watchlist, take any items from local storage and display on screen
// If an item is removed, remove from local storage and unrender

const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('submit-search')

const movieSearchArea = document.getElementById('movie-search-area')

//RENDER RESULTS WITH s=? THEN RENDER EACH ONE WITH A FOR LOOP


searchBtn.addEventListener('click', () => {
    const inputValue = searchInput.value
    fetch(`http://www.omdbapi.com/?apikey=15e9726&s=${inputValue}`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
        renderItems(data.Search)
    })
})

function renderItems(array) {
    movieSearchArea.innerHTML = ""
    for (let movie of array) {
        fetch(`http://www.omdbapi.com/?apikey=15e9726&t=${movie.Title}`, {method: "GET"})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                movieSearchArea.innerHTML += `
                <div class="movie-container" id="movie-container" >
                    <img src="${data.Poster}" alt="">
                    <div class="movie-content">
                        <div class="movie-header">
                            <h2>${data.Title}</h2>
                            <i class="fa-solid fa-star" style="color: #fec654;"></i>
                            <p>${data.imdbRating}</p>
                        </div>
                        <div class="movie-details" id="movie-details">
                            <p>${data.Runtime}</p>
                            <p>${data.Genre}</p>
                            <div class="watchlist-button">
                                <i class="fa-solid fa-circle-plus" id = "add-to-list"></i>Watchlist</div>
                        </div>
                        <p>${data.Plot}</p>
                    </div>
                </div>
                `
                const addToListIcon = document.getElementById('add-to-list')
                addToListIcon.addEventListener('click', () => {
                    localStorage.setItem(data.Title, data.Title)
                })
            })

    }
}

function addItem(e) {
    console.log(e.target)
}



// localStorage.setItem(inputValue, "test")