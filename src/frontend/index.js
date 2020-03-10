import React from "react"
import ReactDOM from "react-dom"
import HelloComponent from "./components/HelloComponent"

import "./style.css"

const wrapper = document.getElementById("base")
wrapper && ReactDOM.render(<HelloComponent />, wrapper)