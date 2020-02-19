/**
 * Local Storage
 */
var favs = JSON.parse(localStorage.getItem("favs"))

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
                var html = `<li class="movie-item ${
                    favs.indexOf(element.id.toString()) > -1 ? "favs" : ""
                }">`
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
                // Cut the description if is too long
                html += `<p class="movie-description">${
                    element.overview.length > 300
                        ? element.overview.substr(0, 300) + "..."
                        : element.overview
                }</p>`
                html += "</div>"
                html += '<div class="movie-interactions">'
                html += `<a href="javascript:void(0)" class="add-to-favs" onclick="addToFavs(this);" data-id="${
                    element.id
                }"><img src="${
                    favs.indexOf(element.id.toString()) > -1
                        ? "./img/heart-ico-green.png"
                        : "./img/heart-ico.png"
                }" alt="heart ico"/></button>`
                html += `<a  href="javascript:void(0)" class="more-info" data-id="${element.id}">More info</a>`

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
            _this.style.display = "flex"
        }
    }
})

/**
 * Add to favs
 */

function addToFavs(identifier) {
    var id = identifier.getAttribute("data-id")
    // if ls is not initialized
    if (!favs) {
        localStorage.setItem("favs", JSON.stringify([id]))
        return
    }

    // if item is already added, remove it and replace heart ico
    if (favs.indexOf(id) > -1) {
        favs.splice(favs.indexOf(id), 1)
        identifier.closest(".movie-item").classList.remove("favs")
        identifier.querySelector("img").src = "./img/heart-ico.png"
    } else {
        favs = [...favs, id]
        identifier.closest(".movie-item").classList.add("favs")
        identifier.querySelector("img").src = "./img/heart-ico-green.png"
    }
    // restore into ls
    localStorage.setItem("favs", JSON.stringify(favs))
}

/**
 * Filter Favs/All
 */

function showOnly(identifier) {
    var filterItem = moviesList.querySelectorAll("li")
    for (i = 0; i < filterItem.length; i++) {
        var _this = filterItem[i]
        var classes = _this.getAttribute("class").indexOf("favs")
        if (classes > -1) {
            _this.style.display = "flex"
        } else {
            _this.style.display = identifier.value == 2 ? "none" : "flex"
        }
    }
}
