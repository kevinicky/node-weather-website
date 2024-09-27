const axios = require('axios')

const geocode = async (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2V2aW5uaWNreSIsImEiOiJjazl3bnhrcnAwM2IwM2dsaXdjNHcxeGdoIn0.vqUypMzSSkr_CbvTHiSi0Q&limit=1'

    try {
        const response = await axios.get(url)
        const body = response.data

        if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    } catch (error) {
        callback('Unable to connect to location services!', undefined)
    }
}

module.exports = geocode