

/*


function searchMarvelAPI (searchTerm) {
    const baseURL = "http://gateway.marvel.com/v1/public/characters"
    const privateKey = "745625d65bc4f034190a625b7044b2e769589c9b"
    const publicKey = "6da86aead1950e136ab25a51c339c618"
    const timeStamp = Date.now()
    //const hash = md5(ts + privateKey + publicKey)
    const params = new URLSearchParams({
        ts: timeStamp,
        apikey: publicKey,
        hash: md5(timeStamp + privateKey + publicKey),
        nameStartsWith: searchTerm,
        limit: 50,
    })

    fetch(baseURL + "?" + params)
        .then(response => response.json())
        //.then(data => console.log(data)) to check the data on console
        .then(body => {
            console.log(body.data.results) //to find data for the characters image
            const matchedCharacters = body.data.results

            for (const character of matchedCharacters) {
                const img = document.createElement("img")
                img.src = `${character.thumbnail.path}.${character.thumbnail.extension}`
                gallery.append(img)
            }
        })
    //fetch(`${baseURL}?${params}`)
    //console.log(md5) to check that md5 is working
    //console.log(params.toString()) to check that the hash has been made
}

searchMarvelAPI("spider")

*/


import { galleryElement, renderGalleryView } from "./view.js"

const apiBaseURL = "https://gateway.marvel.com/v1/public"

// NOTE: Example characters with INVALID images: Spider-dok, Blue Marvel, Revanche, Unus
const withValidImages = character => character.thumbnail.path.includes("image_not_available") === false
    && character.thumbnail.path.includes("4c002e0305708") === false  // 4c002e0305708.gif is an "image not found" thumbnail


function searchMarvelCharacters (searchTerm) {
    const url = buildURL(searchTerm)  // A lot of APIs make you build a complicated URL, so it is often nice to have a dedicated function to build it all together.
    fetch(url)  // GET request
        .then(response => response.json())
        .then(body => {
            console.log(body)  // Here is our data!
            const matchedCharacters = body.data.results
            const charactersWithImages = matchedCharacters.filter(withValidImages)

            renderGalleryView(charactersWithImages)
        })
}


function buildURL (searchTerm) {
    const privateKey = "745625d65bc4f034190a625b7044b2e769589c9b" // Don't hardcode a private key unless you're okay with people taking advantage of your API access.
    const publicKey = "6da86aead1950e136ab25a51c339c618"
    const timestamp = Date.now()
    
    const params = new URLSearchParams({
        ts: timestamp,
        apikey: publicKey,
        hash: md5(timestamp + privateKey + publicKey),
        nameStartsWith: searchTerm,
        limit: 100,
    })

    const endpoint = `${apiBaseURL}/characters?`  // Notice the question mark to start the query parameters.
    const url = endpoint + params.toString()

    return url  // Looks like: http://gateway.marvel.com/v1/public/characters?ts=XXXX&apikey=XXXX...
}

export { searchMarvelCharacters }