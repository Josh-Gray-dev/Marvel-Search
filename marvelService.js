import { galleryElement, renderGalleryView } from "./view.js"

const apiBaseURL = "https://gateway.marvel.com/v1/public"

// NOTE: Example characters with INVALID images: Spider-dok, Blue Marvel, Revanche, Unus
const withValidImages = character => character.thumbnail.path.includes("image_not_available") === false
    && character.thumbnail.path.includes("4c002e0305708") === false  // 4c002e0305708.gif is an "image not found" thumbnail


function searchMarvelCharacters (searchTerm) {
    const url = buildURL(searchTerm)
    fetch(url)
        .then(response => response.json())
        .then(body => {
            console.log(body)  // Here is the data
            const matchedCharacters = body.data.results
            const charactersWithImages = matchedCharacters.filter(withValidImages)

            renderGalleryView(charactersWithImages)
        })
}


function buildURL (searchTerm) {
    const privateKey = "745625d65bc4f034190a625b7044b2e769589c9b"
    const publicKey = "6da86aead1950e136ab25a51c339c618"
    const timestamp = Date.now()
    
    const params = new URLSearchParams({
        ts: timestamp,
        apikey: publicKey,
        hash: md5(timestamp + privateKey + publicKey),
        nameStartsWith: searchTerm,
        limit: 100,
    })

    const endpoint = `${apiBaseURL}/characters?`
    const url = endpoint + params.toString()

    return url  // Looks like: http://gateway.marvel.com/v1/public/characters?ts=XXXX&apikey=XXXX...
}

export { searchMarvelCharacters }