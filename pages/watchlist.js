
const watchListArea = document.getElementById('watchlist-area')

function renderWatchlist() {
    console.log(Object.keys(localStorage))
    const watchlistMovies = Object.keys(localStorage).filter(key => key.startsWith('watchlist_')).map(key => localStorage.getItem(key))
    console.log(watchlistMovies)

    watchlistMovies.forEach(movieTitle => {
        fetch(`https://www.omdbapi.com/?apikey=15e9726&t=${movieTitle}`, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            console.log(data);
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
                            <i class="fa-solid fa-circle-minus remove-from-list" data-title="${data.Title}"></i>Watchlist
                        </div>
                    </div>
                    <p>${data.Plot}</p>
                </div>`

            watchListArea.appendChild(watchlistContainer)
            const removeFromListIcon = watchlistContainer.querySelector('.remove-from-list')

            removeFromListIcon.addEventListener('click', () => {
                const movieTitle = removeFromListIcon.getAttribute('data-title')
                localStorage.removeItem(`watchlist_${movieTitle}`)
                watchListArea.removeChild(watchlistContainer)
            })
        })
    })
}

renderWatchlist()




