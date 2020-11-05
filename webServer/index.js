//gitignore
//node_modules/
/*
const express = require("express")
const app = express();
const middlewares = require("./middleware.js");
const defaultRoutes = require("./routes");
app.disable("x-powered-by");

//middleware :les requetes passeront ici pour etre formater
//sera appelé avant les app.get et app.post entre autre
app.use(express.json())
app.use(express.urlencoded({extended:true})); //si on a un form utilisé
app.use(middlewares.printReq)
app.use('/api', defaultRoutes)

// '/' est la route racine
app.get('/', (req, res) =>{
    //printReq(req);
    res.send('<h1>Bonjour !</h1>');
});

app.post('/', (req, res)=>{
    //printReq(req);
    res.json({success:true})
})



app.get('/ressources/:id', (req, res) =>{
    console.log(req.params.id)
    //const id = req.params.id //marche
    const {params: {id}} = req
    res.send('<h1>Bonjour !' + req.params.id + '</h1>');
});

app.listen(4000, function () {
    console.log("Application d'exemple écoutant sur le port 4000 lancé !\n go to -> http://localhost:4000");
});
*/

const express = require('express')
const middlewares = require('./middleware')
const defaultRouter = require('./route')
const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(middlewares.printReq)
/*
app.get('/', middlewares.printReq, (request, response) => {
    response.json({ success: true })
})

app.post('/', (req, res) => {
    res.json({ success: true })
})
*/

app.use('/api', defaultRouter)



app.listen(4021, () => {
    console.log('Listening on http://localhost:4021')
})