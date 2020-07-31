
const request = require('request')

const forecast = (longitude, latitude, callback) => {
  
    let url = 'http://api.weatherstack.com/current?access_key=14e4749c4b52724a7910a5e115ece832&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '&units=f'
    request({ url ,json:true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather App')
        }
        else if (body.error) {
            callback('Unable to find location')
        }
        else if (body) {
            callback(null,{
                temperature : body.current.temperature,
                feelslikeTemp : body.current.feelslike,
                desc : body.current.weather_descriptions[0],
                humidity: body.current.humidity,
                icons: body.current.weather_icons

            })
        }
    })
}

module.exports = forecast