const store = require('../store')

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
function createHandlers(io, socket_client) {

    const ChangePseudo = (data) => {
        if (Object.keys(store.clientsByPseudo).includes(data.pseudo)){
            console.log("already exist")
            socket_client.emit('pseudo_error', {error:true})
        }
        else {
            store.clients[socket_client.id] = data.pseudo
            store.clientsByPseudo[data.pseudo] = socket_client.id
            socket_client.emit('change_pseudo', {pseudo:data.pseudo})

        }
    }

    const SendMessage = (data) => {
        const packet_msg = {
            message: data.message,
            date: filterDate(new Date()),
            client: socket_client.id,
            pseudo: store.clients[socket_client.id] // get pseudo from global store
        }
        io.emit('new_message', packet_msg)
        // socket_client.broadcast.emit('new_message', packet_msg)
    }

    const Disconnect = () => {
        const pseudo = store.clients[socket_client.id]
        delete store.clients[socket_client.id]
        delete store.clientsByPseudo[pseudo]
    }

    return {
        SendMessage,
        ChangePseudo,
        Disconnect,
    }
}

module.exports = createHandlers