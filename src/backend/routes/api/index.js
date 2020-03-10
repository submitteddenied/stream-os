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

module.exports = router