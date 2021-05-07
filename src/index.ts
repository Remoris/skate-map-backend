import express from "express"
import cookieParser from "cookie-parser"
import path from "path"
import logger from "morgan"

import "reflect-metadata"
import { createConnection } from "typeorm"

import { indexRouter } from "./routes"

const app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(indexRouter)
createConnection().then(connection => {
    
})

module.exports = app