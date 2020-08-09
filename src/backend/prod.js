import app from './app'
// finally, let's start our server...
const server = app(require('express')())
const instance = server.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + instance.address().port)
})