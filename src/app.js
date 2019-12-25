const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast.js')
const geocode=require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000

const publicDir=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Saif Haque'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        name: 'Saif Haque',
        title: 'About Me'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'We are here to help!',
        title: 'Help',
        name: 'Saif Haque'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {lat, long, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(lat, long, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            
            res.send({
                location,
                forecastData
            })
    
        })
    })
})

app.get('/products', (req, res)=>{
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Saif Haque',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        name: 'Saif Haque',
        title: '404 Page',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})