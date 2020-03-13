import React from "react"
import ReactDOM from "react-dom"
import Todoist from './services/todoist'
import LiveComponent from "./components/LiveComponent"

import "./assets/style.scss"

const parseSearch = (search) => {
  return search.slice(1).split('&').reduce((memo, keyPair) => {
    const [key, value] = keyPair.split('=')
    if(memo[key] === undefined) {
      memo[key] = value
    } else {
      if(!Array.isArray(memo[key])) {
        memo[key] = [memo[key]]
      }
      memo[key].push(value)
    }
    return memo
  }, {})
}

const search = parseSearch(document.location.search)
if(search.token && search.type) {
  const todoistToken = {token: search.token, type: search.type}
  window.localStorage.setItem('todoist-token', JSON.stringify(todoistToken))
  document.location.assign(document.location.origin + document.location.pathname)
}

const loadedTokenStr = window.localStorage.getItem('todoist-token')
let todoist
if(loadedTokenStr !== null) {
  todoist = new Todoist(JSON.parse(loadedTokenStr))
}

const wrapper = document.getElementById("base")
wrapper && ReactDOM.render(<LiveComponent todoist={todoist}/>, wrapper)