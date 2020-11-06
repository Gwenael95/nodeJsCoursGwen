const io = require('socket.io-client').io
const readLine = require('readline')
const rl = readLine.createInterface({
    input: process.stdin,
    output:process.stdout
})

const socket = io('http://localhost:5055')
socket.on('new_message', (data)=>{
    process.stdout.write(data.client + " send :" + data.message + '\n');
})
socket.on('new_error', (data)=>{
    return data.error;
})
function loopChat(){
    rl.question('message: ', (message)=>{
        socket.emit('send_message', {message})
        loopChat();
    })
}


loopChat()