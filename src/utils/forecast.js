const axios = require('axios')

const forecast = async (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=bc9428fddb73c834e2c86c73955cefbb&query=' + latitude + ',' + longitude

    try {
        const response = await axios.get(url)
        const body = response.data

        if (body.error) {
            callback('Unable to find location!', undefined)
        }

        const temperature = body.current.temperature
        const feelslike = body.current.feelslike
        const forecast = body.current.weather_descriptions[0]
        const humidity = body.current.humidity

        callback(undefined, forecast + '. It is currently ' + temperature + ' degress out. It feels like ' + feelslike + ' degrees out. The humidity is ' + humidity + '%')
    } catch (error) {
        callback('Unable to connect to weather service!', undefined)
    }
}

module.exports = forecast