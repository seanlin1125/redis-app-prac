const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const redis = require('redis')

const app = express()
const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(methodOverride('_method'))

app.get('/', (req, res, next) => {
  res.render('searchusers')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
