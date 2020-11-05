/*
get /api/resources/res_id -> renvoi la resource store.resources['res_id']
*/
/*
Exercice:
4 Routes
- 1) recuperer un objet avec son ID | GET
- 2) creer un objet | POST
- 3) replace une resource avec son ID | PUT
- 4) patch une resource avec son ID | PATCH
- 5) delete une resource son ID | DEL
----------------------------------------
Contraintes:
- Le plus RESTful possible (methodes, json)
- Un fichier de test:
    _> ajoute, get, modifie, get, et supprime la ressource.
*/

const Router = require('express').Router
const router = Router()
const store = require('./store.js');

// Creer une nouvelle ressource
router.post('/resources', (req, res) => {
    const resource = req.body
    store.resources.add(resource)
    res.json(resource)
})

// remplacer une ressource
router.put('/resources/:id', (req, res) => {
    const id = req.params.id
    if (req.params.id === req.body.id) {
        store.resources.replace(id, req.body)
        res.json(req.body)
    }
    else
        res.status(400).end()
})

// patch une ressource
router.patch('/resources/:id', (req, res) => {
    console.log({...req.body});
    const id = req.params.id
    const resource = store.resources.patch(id, {...req.body})
    res.json(resource)
})

// supprimer
router.delete('/resources/:id', (req, res) => {
    const { id } = req.params
    if (store.resources.getByID(id)) {
        const tryDel = store.resources.remove(id)
        res.json({ success: tryDel })
    }
    else
        res.status(404).end()

})


router.get('/resources/:id', (req, res) => {
    const id = req.params.id
    res.json(store.resources.getByID(id))
    //res.send('bonjour ' + store.resources[id].name)
})

/*
//region my router
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
*/

module.exports = router