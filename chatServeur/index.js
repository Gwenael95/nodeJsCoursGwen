
//region prepare to include the server code into our webserver
const express = require('express')
const http = require('http')
const cors = require("cors")
const app = express()
const server =http.createServer(app)
app.use(cors())
app.use(express.static('html'))
//endregion setup

const SocketIOServer = require('socket.io').Server
const io = new SocketIOServer(server)

function filterDate(timeStamp){
    let date = new Date(timeStamp );
    let year = date.getFullYear();
    let month = (date.getMonth()+1);
    let day = date.getDate();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return day + '/' + month + '/' + year + " - " + hours + ':' + minutes + ':' + seconds;
}
function displayAllClients(){
    console.log(io.sockets.in("http://localhost:5055/").sockets.keys());
}

let connected =0;

const pseudos = []
let clients = {
    'client.id' : ""
}
function addPseudo(pseudo){
    pseudos.push(pseudo)
}

io.on('connection', (socket_client)=>{
    let pseudo
    console.log('client connected', socket_client.id)
    socket_client.on('send_message', (data)=>{
        const packet_msg = {
            message : data.message,
            date: filterDate(new Date()),
            client: socket_client.id,
            pseudo:data.pseudo,
        }

        io.emit('new_message', packet_msg) // envoie a tout le monde
        //socket_client.broadcast.emit('new_message', packet_msg) //envoi a tout les autres clients
    })

    socket_client.on('check_set_pseudo', (data)=>{
        if (pseudos.includes(data.pseudo)){
            console.log("pseudo already exist")
            io.emit('new_error_pseudo', {error : true}) // envoie a tout le monde
        }
        else
        {
            addPseudo(data.pseudo)
            console.log(pseudos)
            io.emit('new_message', {message:"new pseudo added", pseudo:data.pseudo}) // envoie a tout le monde
            io.emit('set_pseudo', { pseudo:data.pseudo}) // envoie a tout le monde
        }
    })

    socket_client.on('disconnect', ()=>{ //pb avec le disconnect, c'est lui qui vide le tableau pseudos
        const index = pseudos.indexOf(pseudo);
        pseudos.splice(index, 1);
        console.log(pseudo + " is not connected anymore")

        delete clients[socket_client.id]
        connected--
    })
})


server.listen(5055)