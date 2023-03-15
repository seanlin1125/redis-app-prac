const path = require('path')
const express = require('express')
const engine = require('express-handlebars')
const methodOverride = require('method-override')
const { createClient } = require('redis')
const client = createClient({ host: '127.0.0.1', port: 6379 }) // default host and port

;(async () => {
  client.on('connect', () => console.log('Redis connected!'))

  client.on('error', (err) => console.error(err))
  await client.connect()
})()

const app = express()
const port = 3000

app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(methodOverride('_method'))

app.get('/', (req, res, next) => {
  res.render('searchusers')
})

// Search processing
app.post('/user/search', function (req, res, next) {
  let id = req.body.id

  client.hGetAll(id, function (err, obj) {
    if (err) {
      return next(err) // 錯誤處理
    }
    if (!obj) {
      res.render('searchusers', {
        error: 'User does not exist',
      })
    } else {
      obj.id = id
      res.render('details', {
        user: obj,
      })
    }
  })
})

// Add User Page
app.get('/user/add', function (req, res, next) {
  res.render('adduser')
})
// Process Add User Page
app.post('/user/add', function (req, res, next) {
  const { id, first_name, last_name, email, phone } = req.body

  client.hSet(
    id,
    [
      'first_name',
      first_name,
      'last_name',
      last_name,
      'email',
      email,
      'phone',
      phone,
    ],
    function (err, reply) {
      if (err) {
        console.error(err)
      }
      console.log(reply)
      res.redirect('/')
    }
  )
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
