require('./db/mongoose')
const path = require('path')
const express = require('express')

const userRouter = require('./routers/UserRouter')
const taskRouter = require('./routers/TaskRouter')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

module.exports = app
