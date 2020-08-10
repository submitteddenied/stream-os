const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const Redux = require('redux')
const EliteDangerous = require('./services/elite_dangerous')
const store = require('../shared/redux')

var isProduction = process.env.NODE_ENV === 'production'

// Create global app object
module.exports = (app) => {
  require('express-ws')(app)

  app.use(require('morgan')('dev'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  // Create a Redux store holding the state of your app.
  // Its API is { subscribe, dispatch, getState }.
  

  const edService = new EliteDangerous(store)

  app.use(require('./routes')(store))

  /// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  /// error handlers

  // development error handler
  // will print stacktrace
  if (!isProduction) {
    app.use(function(err, req, res, next) {
      console.log(err.stack)

      res.status(err.status || 500)

      res.json({'errors': {
        message: err.message,
        error: err
      }})
    })
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.json({'errors': {
      message: err.message,
      error: {}
    }})
  })

  return app
}