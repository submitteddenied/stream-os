import React from "react"
import ReactDOM from "react-dom"

import "./assets/style.scss"
import RotatingCubeComponent from "./components/RotatingCubeComponent"

const wrapper = document.getElementById("base")
wrapper && ReactDOM.render(<RotatingCubeComponent />, wrapper)