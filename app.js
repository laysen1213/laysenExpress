let express = require('express')
let path = require('path')
var swig = require('swig');
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
// let session = require('express-session')
// let FileStore = require('session-file-store')(session)
// let history = require('connect-history-api-fallback')
let controller = require('./controller')

let app = express()
swig.setDefaults({
  cache: false
})

app.set('views', path.join(__dirname, 'view'))
app.set('view engine','html');
app.engine('html', swig.renderFile);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
/*app.use(session({
  store: new FileStore(),
  secret: 'hongchh',
  resave: false,
  saveUninitialized: false
}));*/
// app.use(history())
app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/', controller)


let http = require('http')
let port = '3000'
app.set('port', port)
http.createServer(app).listen(port)
console.log(" > server start to listen at localhost:" + port)