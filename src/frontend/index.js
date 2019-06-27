import React from "react"
import ReactDOM from "react-dom"
import HelloComponent from "./components/HelloComponent"

const wrapper = document.getElementById('base')
wrapper && ReactDOM.render(<HelloComponent />, wrapper)