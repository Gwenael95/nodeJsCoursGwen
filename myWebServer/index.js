
const express = require('express')
const middlewares = require('./middleware')
const defaultRouter = require('./route')
const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middlewares.printReq)
app.use('/api', defaultRouter)



app.listen(4021, () => {
    console.log('Listening on http://localhost:4021')
})