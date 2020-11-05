const Router = require('express').Router
const router = Router()

var store = {
    resources: {
        0: { name: 'xx' },
        1: { name: 'yy' },
        2: { name: 'test' },
        3: { name: 'newtest' },
    }
}

/*
get /api/resources/res_id -> renvoi la resource store.resources['res_id']
*/
/*
Exercice:
4 Routes
- 1) recuperer un objet avec son ID
- 2) creer un objet
- 3) replace une resource avec son ID
- 4) patch une resource avec son ID
- 5) delete une resource son ID
----------------------------------------
Contraintes:
- Le plus RESTful possible (methodes, json)
- Un fichier de test:
    _> ajoute, get, modifie, get, et supprime la ressource.
*/

router.get('/resources/get/:id', (req, res) => {
    console.log(req.params)
    console.log("store=")
    console.log(store)
    const id = req.params.id
    //const { params: { id }} = req
    res.send('bonjour ' + store.resources[id].name)
})


router.get('/resources/add', (req, res) => {
    if (Object.keys(req.query).length) {
        store.resources[Object.keys(store.resources).length] = {name: req.query.addName};
    }
    res.send('bonjour ' +
    "<form method='get' action='#' id='formAdd'>" +
        "<input id='addName' name='addName'>" +
        "<label for='addName'>Nom</label>"+
        "<input type='submit'>"+
        "</form>")
})

router.get('/resources/patch/:id', (req, res) => {
    if (Object.keys(req.query).length) {
        store.resources[req.params.id].name = req.query.patchName;
    }
    res.send('patch name at id: ' + req.params.id +
        "<form method='get' action='#' id='formAdd'>" +
        "<input id='patchName' name='patchName'>" +
        "<label for='patchName'>Nom</label>"+
        "<input type='submit'>"+
        "</form>")
})
router.get('/resources/replace/:id', (req, res) => {
    console.log(req.query)
    if (Object.keys(req.query).length) {
        store.resources[req.params.id] = req.query;
    }
    res.send('replace name at id: ' + req.params.id +
        "<form method='get' action='#' id='formAdd'>" +
        "<input id='name' name='name'>" +
        "<label for='name'>Nom</label>"+
        "<input id='lastName' name='lastName'>" +
        "<label for='lastName'>Nom</label>"+
        "<input type='submit'>"+
        "</form>")
})
router.get('/resources/del/:id', (req, res) => {
    delete store.resources[req.params.id];

    res.send('supppresion du store a l\'id ' + req.params.id)
})


module.exports = router