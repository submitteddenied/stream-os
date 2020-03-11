import React from "react"
import ReactDOM from "react-dom"
import BootingComponent from "./components/BootingComponent"

import "./assets/boot.scss"

const wrapper = document.getElementById("base")
wrapper && ReactDOM.render(<BootingComponent />, wrapper)