const store = require('./store')

function printReq(req, res, next) {
    const { url, query, params, body, headers } = req
    console.log({
        url,
        query,
        params,
        body
    })
    next()
}

function checkAuth(req, res, next) {
    const token = req.headers['authorization']
    const user = store.users.getBy('token', token)
    if (user) {
        req.user = user
    }
    next()
}

function reqAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).end()
    }
    next()
}

exports.reqAuth = reqAuth
exports.printReq = printReq
exports.checkAuth = checkAuth