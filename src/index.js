import React, { Suspense } from "react"
import ReactDOM from "react-dom"

import App from "./App.js"

import "@/assets/css/base.css"

ReactDOM.render(<Suspense fallback={''}><App></App></Suspense>, document.getElementById("root"))
