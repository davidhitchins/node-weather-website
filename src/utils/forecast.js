const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/b4d8e6ac04de56f5d1745eec35669944/' + latitude + ',' + longitude + '?units=auto'

    request({url: url, json: true}, (error, {body}) => {       
    if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find weather at that location, try another', undefined )    }
        else {              
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
    }

    })
}





 module.exports = forecast