
//prepare to include the server code into our webserver
const express = require('express')
const http = require('http')
const cors = require("cors")
const app = express()
const server =http.createServer(app)
app.use(cors())
app.use(express.static('html'))
//end setup

const SocketIOServer = require('socket.io').Server
const io = new SocketIOServer(server)


io.on('connection', (socket_client)=>{
    console.log('client connected', socket_client.id)
    socket_client.on('send_message', (data)=>{
        const packet_msg = {
            message : data.message,
            date: +new Date(),
            client: socket_client.id
        }
        io.emit('new_message', packet_msg) // envoie a tout le monde
        //socket_client.broadcast.emit('new_message', packet_msg) //envoi a tout les autres clients
    })
})


server.listen(5055)