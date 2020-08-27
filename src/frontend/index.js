import React from "react"
import ReactDOM from "react-dom"
import LiveComponent from "./components/LiveComponent"

import "./assets/style.scss"

import State from './services/state'
const state = new State()
const wrapper = document.getElementById("base")
wrapper && ReactDOM.render(<LiveComponent state={state}/>, wrapper)