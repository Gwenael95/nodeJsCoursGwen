const path = require('path');
const notifier = require('node-notifier')

function notify(message, sound = false){
    notifier.notify(
        {
            title: "coding chat",
            message: message,
            icon:path.join(__dirname, '..', 'notify_icon.png'),
            sound: sound,
        }
    )
}


window.notifyNow = notify



