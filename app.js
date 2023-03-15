const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const redis = require('redis')

app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(methodOverride('_method'))

app.get('/', (req, res, next) => {
  res.render('searchusers')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
