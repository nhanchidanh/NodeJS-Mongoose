const path = require('path')
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const handlebars = require('express-handlebars')

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const app = express()
const port = 3000

const route = require('./routes')
const db = require('./config/db')

// Connect to DB
db.connect()

// static file
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded())
app.use(express.json({
  extended: true
}))

app.use(methodOverride('_method'))

//Custom middleware
app.use(SortMiddleware);

// http logger
app.use(morgan('combined'))

// template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
  }
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

// route init: khoi tao tuyen duong
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})