const axios = require('axios')
const util = require('../util')
const config = require('../config')

const TOKEN_URL = 'https://todoist.com/oauth/access_token'
const AUTH_URL = 'https://todoist.com/oauth/authorize'
class Todoist {
  static getAccessToken(code) {
    return axios.post(TOKEN_URL, {
      client_id: config.todoist.client_id,
      client_secret: config.todoist.client_secret,
      code
    })
    .then((response) => response.data)
  }

  static getAuthUrl(state, scope) {
    if(scope === undefined) {
      scope = 'data:read'
    }
    const queryData = {
      client_id: config.todoist.client_id,
      scope,
      state
    }
    const queryString = util.qs(queryData)
    return `${AUTH_URL}?${queryString}`
  }

  constructor(store, options) {
    this.store = store
    this.intervalMs = options.intervalMs || 1500
  }

  startUpdates() {
    this.intervalId = setInterval(() => {
      this.update()
    }, this.intervalMs)
  }

  stopUpdates() {
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  update() {
    //TODO - fetch todos and put the in the store
  }
}

module.exports = Todoist