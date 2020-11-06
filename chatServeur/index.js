
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
    var date = new Date(timeStamp );
    var year = date.getFullYear();
    var month = (date.getMonth()+1);
    var day = date.getDate();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var formattedTime = day + '/' + month + '/' + year + " - " + hours + ':' + minutes + ':' + seconds;

    return formattedTime;
}
function displayAllClients(){
    console.log(io.sockets.in("http://localhost:5055/").sockets.keys());
}

const pseudos = []
let clients = {
    'client.id' : ""
}
let connected =0;

function addPseudo(pseudo){
    pseudos.push(pseudo)
}

io.on('connection', (socket_client)=>{
    let pseudo
    console.log('client connected', socket_client.id)
    //displayAllClients();

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

    socket_client.on('set_pseudo', (data)=>{
        console.log(pseudos)
        if (pseudos.includes(data.pseudo)){
            socket_client.emit('new_error', {error : false}) // envoie a un seul
        }
        else
        {
            addPseudo(data.pseudo)
            io.emit('new_message', {message:"new pseudo added", pseudo:data.pseudo}) // envoie a tout le monde
            socket_client.emit('new_pseudo', {pseudo : data.pseudo})
        }
    })

    //not ended
    socket_client.on('disconnect', ()=>{
        console.log("disconnection")
        /*const index = pseudos.indexOf(pseudo);
        console.log(index);
        pseudos.splice(index, 1);
        delete clients[socket_client.id]*/
        connected--
    })
})


server.listen(5055)
