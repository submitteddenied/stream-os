const crypto = require('crypto')
const Todoist = require('../../services/todoist')
const qs = require('../../util').qs

var router = require('express').Router()
const STATE_LENGTH = 26
const TDI_STATE_COOKIE_NAME = 'tdi-state'

const doTodoistRedirect = (res) => {
  const stateString = crypto.randomBytes(STATE_LENGTH).toString('hex')

  res.cookie(TDI_STATE_COOKIE_NAME, stateString)
  res.redirect(Todoist.getAuthUrl(stateString))
}

module.exports = (store) => {
  router.use('/login', (req, res) => {
    let tdi_state_cookie_value
    if(req.cookies) {
      tdi_state_cookie_value = req.cookies[TDI_STATE_COOKIE_NAME]
      res.clearCookie(TDI_STATE_COOKIE_NAME)
    }
    if(req.query.error) {
      //Show an error page
      return res.redirect('/error.html?error=' + req.query.error)
    }
    if(req.query.state && req.query.code) {
      if(req.query.state === tdi_state_cookie_value) {
        return Todoist.getAccessToken(req.query.code)
          .then((data) => {
            res.redirect('/index.html?' + qs({
              token: data.access_token,
              type: data.token_type
            }))
          })
      }
    }
  
    return doTodoistRedirect(res)
  })
  
  let clients = []
  router.ws('/state', (ws, req) => {
    clients.push(ws)
    ws.on('close', () => {
      clients = clients.filter((i) => i !== ws)
    })
    ws.on('error', (err) => {
      console.log(`Socket got error ${err}`)
    })
  
    ws.on('message', (msg) => {
      //TODO: Handle updates from clients
      //on a client, instead of using store.dispatch, you should send the action as a message to the server
      //We take the message (action) here and dispatch it to the store
      //eg: store.dispatch(JSON.parse(msg))
      console.log(`Action: ${msg}`)
      store.dispatch(JSON.parse(msg))
    })

    ws.send(JSON.stringify(store.getState())) //TODO: stringify?
  })

  store.subscribe(() => {
    const newState = JSON.stringify(store.getState()) //TODO stringify?
    //console.log(`New State: ${newState}`)
    clients.forEach((client) => {
      client.send(newState)
    })
  })

  return router
}