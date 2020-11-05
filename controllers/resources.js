const Router = require('express').Router
const router = Router()
const store = require('../store')

/*
get /api/resources/res_id -> renvoi la resource store.resources['res_id']
*/
/*
Exercice:

5 Routes
- 1) recuperer un objet avec son ID | GET
- 2) creer une resource  | POST
- 3) replace une resource avec son ID | PUT
- 4) patch une resource avec son ID | PATCH
- 5) delete une resource son ID | DELETE
----------------------------------------

Contraintes:
- Le plus RESTful possible (methodes, json)
- Un fichier de test:
    _> ajoute, get, modifie, get, et supprime la ressource.
*/


/*
console.log(req.params)
const idx = req.params.id
const { params: { id }} = req
*/

// Enregistrer une route, methode GET, url /resources/ID_RESOURCE
// Recuperer une ressource avec son id
router.get('/resources/:id', (req, res) => {
    const id = req.params.id 
    res.json(store.resources.getById(id))
})

// Creer une nouvelle ressource
router.post('/resources', (req, res) => {
    // on genere un id grace a la longueur du tableau des keys se trouvant dans notre objets
    // resource.id = Object.keys(store.resources).length + 1 // ['res_id'] -> 1
    const resource = store.resources.add(req.body)
    res.json(resource)
})

// remplacer une ressource
router.put('/resources/:id', (req, res) => {
    const id = req.params.id
    if (id !== req.body.id)
        return res.status(400).end()
    const tryReplace = store.resources.replace(id, req.body)
    if (!tryReplace)
        res.status(404).end()
    res.json(tryReplace)
})

// patch une ressource
router.patch('/resources/:id', (req, res) => {
    const id = req.params.id
    const resource = store.resources.patch(id, req.body)
    res.json(resource)
})

// supprimer
router.delete('/resources/:id', (req, res) => {
    const { id } = req.params
    const tryDelete = store.resources.delete(id)
    if (!tryDelete)
        return res.status(404).end()
    res.json({ success: tryDelete })
})

module.exports = router
