/**
 * DOM Elements
 */
var moviesList = document.querySelector("#movies-list")

/**
 * Fetch Movies
 */
var api_key = "2067d9db37e32675d3efd1771d50dc1e"
var domain = "http://api.themoviedb.org/3"

function showList() {
    fetch(`${domain}/movie/popular?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed with HTTP code " + response.status)
            }
            return response
        })
        .then(result => result.json())
        .then(data => {
            data.results.forEach(element => {
                var html = '<li class="movie-item">'
                html += '<div class="movie-cover">'
                html += `<span class="movie-rating">${element.vote_average *
                    10}%</span>`
                html += `<img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" />`
                html += "</div>"
                html += '<div class="movie-body">'
                html += '<h5 class="movie-title">'
                html += `${element.title} <span>(${element.release_date.substr(
                    0,
                    4
                )})</span>`
                html += "</h5>"
                html += `<p class="movie-description">${element.overview}</p>`
                html += '<div class="movie-interactions">'
                html += `<a href="javascript:void(0)" class="add-to-favs" data-id="${element.id}"><img src="./heart.png" alt="heart ico"/></button>`
                html += `<a  href="javascript:void(0)" class="more-info" data-id="${element.id}">More info</a>`
                html += "</div>"
                html += "</div>"
                html += "</li>"
                moviesList.insertAdjacentHTML("beforeend", html)
            })
        })
}

showList()

/**
 * Search Fn
 */

var input = document.querySelector("#movie-search")
input.addEventListener("keyup", function() {
    var inputValue = this.value,
        i
    var filterItem = moviesList.querySelectorAll("li")
    for (i = 0; i < filterItem.length; i++) {
        var _this = filterItem[i]
        var phrase = _this.querySelector(".movie-title").innerHTML
        if (phrase.search(new RegExp(inputValue, "i")) < 0) {
            _this.style.display = "none"
        } else {
            _this.style.display = "block"
        }
    }
})
