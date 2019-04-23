const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Routes
app.get('', (req,res) => {
    res.render('index', {
            title: "Weather app",
            name: "David Hitchins"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
            title: "About the author",
            name: "David Hitchins"
            
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
            title: "Index of help topics",            
            name: "David Hitchins",
            helpText: "You can read here what to do in case you're confused!"
    })
})


app.get('/weather', (req, res)=> {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error){
                        return res.send({error})
                    }
                    return res.send({
                        forecast: forecastData,
                        location: location,
                        address:  req.query.address
                    })
                }
                      )
              
})

})

app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        }

        )
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })

})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: "Help article not found",            
        name: "David Hitchins",
        errorMessage: "There is no help article on that topic"
    })

})

app.get('*', (req, res)=> {
    res.render('404', {
        title: "Page not found (404)",            
        name: "David Hitchins",
        errorMessage: "Click one of the links above to return to another page"
    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})