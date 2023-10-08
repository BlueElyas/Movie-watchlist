//RENDER RESULTS WITH s=? THEN RENDER EACH ONE WITH A FOR LOOP

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input')
    const searchBtn = document.getElementById('submit-search')
    const movieSearchArea = document.getElementById('movie-search-area')
    const defaultMovies = document.getElementById('default-text')
    const doesNotExist = document.getElementById('does-not-exist')


    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const inputValue = searchInput.value
            fetch(`https://www.omdbapi.com/?apikey=15e9726&s=${inputValue}`, {method: "GET"})
            .then(res =>res.json())
            .then(data => {
                movieSearchArea.innerHTML = ''
                defaultMovies.style.display = 'none'
                if(data.Response === 'True') {
                    renderItems(data.Search)
                    doesNotExist.style.display = 'none'
                } else {
                    doesNotExist.style.display = 'flex'
                }
            })
        })
    }



    function renderItems(array) {
        for (let movie of array) {
            fetch(`https://www.omdbapi.com/?apikey=15e9726&t=${movie.Title}`, { method: "GET" })
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
                        localStorage.setItem(`watchlist_${movieTitle}`, movieTitle)
                        console.log(movieTitle)
                    })
                })
        }
    }
})



