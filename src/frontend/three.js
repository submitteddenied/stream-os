import React from "react"
import ReactDOM from "react-dom"

import "./assets/style.scss"
import ThreeDeeCanvas from "./components/ThreeDeeCanvas"

const wrapper = document.getElementById("base")
wrapper && ReactDOM.render(<ThreeDeeCanvas characters={[]} />, wrapper)