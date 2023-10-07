const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('submit-search')
const movieSearchArea = document.getElementById('movie-search-area')



//RENDER RESULTS WITH s=? THEN RENDER EACH ONE WITH A FOR LOOP

window.addEventListener('DOMContentLoaded', () => {
})

searchBtn.addEventListener('click', () => {
    const inputValue = searchInput.value
    fetch(`http://www.omdbapi.com/?apikey=15e9726&s=${inputValue}`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
        renderItems(data.Search)
    })
})

function renderItems(array) {
    for (let movie of array) {
        fetch(`http://www.omdbapi.com/?apikey=15e9726&t=${movie.Title}`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                const movieContainer = document.createElement('div')
                movieContainer.classList.add('movie-container')
                movieContainer.innerHTML = `
                <img src="${data.Poster}" alt="">
                <div class="movie-content">
                    <div class="movie-header">
                        <h2>${data.Title}</h2>
                        <i class="fa-solid fa-star" style="color: #fec654;"></i>
                        <p>${data.imdbRating}</p>
                    </div>
                    <div class="movie-details">
                        <p>${data.Runtime}</p>
                        <p>${data.Genre}</p>
                        <div class="watchlist-button">
                            <i class="fa-solid fa-circle-plus add-to-list" data-title="${data.Title}"></i>Watchlist
                        </div>
                    </div>
                    <p>${data.Plot}</p>
                </div>
                `

                movieSearchArea.appendChild(movieContainer)
                const addToListIcon = movieContainer.querySelector('.add-to-list')

                addToListIcon.addEventListener('click', () => {
                    const movieTitle = addToListIcon.getAttribute('data-title')
                    localStorage.setItem(movieTitle, movieTitle)
                    console.log(movieTitle)
                    renderWatchlist(movieTitle)
                })
            })
    }
}


function renderWatchlist(movie) {
    const watchListArea = document.getElementById('watchlist-area')
    const movieWatch = localStorage.getItem(movie)
    console.log(movieWatch)
    fetch(`http://www.omdbapi.com/?apikey=15e9726&t=${movieWatch}`, { method: "GET" })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const watchlistContainer = document.createElement('div')
        watchlistContainer.classList.add('movie-container')
        watchlistContainer.innerHTML =
        `<img src="${data.Poster}" alt="">
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
                    <i class="fa-solid fa-circle-minus remove-from-list"></i>Watchlist
                </div>
            </div>
            <p>${data.Plot}</p>
        </div>`
        console.log(data.Genre)


        watchListArea.appendChild(watchlistContainer)
        const removeFromListIcon = watchlistContainer.querySelector('.remove-from-list')


        removeFromListIcon.addEventListener('click', () => {
            const movieTitle = removeFromListIcon.getAttribute('data-title')
            localStorage.removeItem(movieTitle, movieTitle)
        })
    }) .catch(error => {
        console.error("Error:", error)
    })
}


// localStorage.setItem(inputValue, "test")