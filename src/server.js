import express from "express"
import configViewEngine from "./configs/viewEngine"
import initWebRoute from './route/web'
import initAPIRoute from './route/api'
// import connection from './configs/connectDB'

require('dotenv').config()
var morgan = require('morgan')


const app = express()
const port = process.env.PORT || 3000

// Gửi data từ phía client lên phía server
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use((req, res, next) =>{
//     next()
// })

app.use(morgan('combined'))

//setup view engine
configViewEngine(app)
// init web route
initWebRoute(app)

//init api route
initAPIRoute(app)

//handle 404 not found
app.use((req, res) =>{
    return res.render('404.ejs')
})


app.listen(port, () =>{
    console.log(`exam app at http://localhost:${port}`)
})
