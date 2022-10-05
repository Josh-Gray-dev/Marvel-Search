
//****************NEW SECTION BELOW******************************
import { searchMarvelCharacters } from "./marvelService.js"

const DEFAULT_SEARCH_TERM = "spider"

//Run search once on page load (before user enters new search)
//This is so the page starts with characters already displayed

searchMarvelCharacters(DEFAULT_SEARCH_TERM)

//Handle search form submissions
document
    .querySelector("#search-form")
    .addEventListener("submit", event => {
        event.preventDefault()  //prevent the form from default behavior

        const searchInputElement = event.target.elements.search
        searchMarvelCharacters(searchInputElement.value || DEFAULT_SEARCH_TERM)
    })