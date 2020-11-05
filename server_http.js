const http = require('http')

// const newServer = http.createServer((req, res) => {
//     console.log(req.url)
//     if (req.url === '/nanani') {

//     }
//     res.write(req.url)
//     res.end()
// })

// newServer.listen(4033)



// const app = new Express()
class Express {
    constructor() {
        // routes = [ { url: String, callback: function } ]
        this.routes = []
        this.server = http.createServer(this.requestListener.bind(this))
    }

    // app.get('/hello', (req, res) => ...)
    get(url, callback) {
        this.routes.push({
            url, callback
        })
    }

    requestListener(req, res) {
        console.log(req.url)
        const theGoodRoute = this.findRoute(req.url)
        if (theGoodRoute) {
            return theGoodRoute.callback(req, res)
        }
        else {
            res.end(`Cannot ${req.method.toUpperCase()} ${req.url}`)
        }
    }

    // return { url: String, callback: function }
    findRoute(url) {
        return this.routes.find(route => route.url === url)
    }

    listen(port, callback) {
        this.server.listen(port, callback)
    }
}

const app = new Express()

app.get('/myurl', (req, res) => {
    console.log('Route registered and working !')
    res.end('Bye!')
})

app.listen(4022, () => {
    console.log('Listening on 4022')
})