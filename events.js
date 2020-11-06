const EventEmitter = require('events').EventEmitter

class AppEmitter extends EventEmitter{

}

const event_manager= new AppEmitter();

//region ecouter l'event new_user
//nb param dans le callback a definir dans la doc, car
//on peut en avoir beaucoup selon le besoin
event_manager.on('new_user', (data, t)=>{
    console.log('event receveid: new_user', {user:data})
    console.log('2em arg test: new_user', t)

})
//endregion

//test d'emission d'event
//event_manager.emit('new_user', {pseudo:test}, 'second test')


module.exports.event_manager = event_manager




