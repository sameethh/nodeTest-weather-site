const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FtaXRoMzIiLCJhIjoiY2tieTFmNDN3MHZiMTJ4cGNhY3ozdWE5ZyJ9.8KgJlbKVZSFCyaJnoS7usQ&limit=1'
    
    request({ url, json: true }, (error, {body}) => {
     //   console.log('Samith body',body)
        if (error) {
           callback('Unable to connect to geo App')
        }
        else if (body && body.features && body.features.length === 0) {
            callback('Unable to match location')
        }
        else if (body) {
            callback(null,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                place_name:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
