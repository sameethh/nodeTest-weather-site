const express = require('express')
const path = require('path')
const app = express()
const hbs =  require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)

// console.log(path.join(__dirname, '../public'))

//Define pats fro express configs
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
//console.log('viewsPath')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



//Setup static directory  to serve
app.use(express.static(publicDirectoryPath)) //customize your server

//index router
app.get('', (req,res) => {
res.render('index', {
    title:'Weather',
    name:'Samith Gadila'
})
})


//About router
app.get('/about', (req,res) => {
res.render('about',{
    title:'About Us',
    name:'Samith Gadila'
})

})

//help router

app.get('/help' , (req,res) => {
    res.render('help',{
        name:'Samith Gadila',
        title:'Help',
        type : 'Critical !!!!',
        Message : ' This is some helpful text!!'


    })

})


//router Weather
app.get('/weather', (req,res) => {
    console.log(req.query.address)
    if(!req.query.address) {
          return res.send({
              error: 'Address is required field'
          })
    }

 geocode(req.query.address, (error,  {latitude,longitude,place_name} = {}) => {
            console.log(latitude,longitude,place_name)
            if (error){
                res.send({
                    error: 'unable to get the location'
                })
            }else if (latitude,longitude,place_name){
                forecast(longitude,latitude,(error,{temperature,feelslikeTemp,desc} ={}) => {
                      if(error){
                        res.send({
                            error: 'unable to get the forecast'
                        })
                      }else if(temperature,feelslikeTemp,desc) {
                        res.send({
                            address: req.query.address,
                            Temperature : `Todays temperature is `+temperature+`. feels like `+ feelslikeTemp,
                            forecast : `forecast looks like `+desc,
                            loaction : place_name
                        })
                      
                      }

                })
            }

 })
    
    
})


app.get('/products',(req,res) => {
    if(!req.query.search){
     return  res.send({
          error : ' must provide search term'
      })
    }
    res.send({
    products: []
})

})


app.get('/help/*', (req,res) => {
    //res.send('Help Article not found....')
    res.render('404',{
        title:'404',
        errorMessage : 'Help Article not found',
        name :'SG'
    })

})

app.get('*',(req,res) => {
    // res.send('My 404 page')
    res.render('404',{
        title:'404',
        errorMessage:'Page not found',
        name :'SG'
    })

})



app.listen(3000 , () => {
    console.log('servers is started at 3000...')
})
