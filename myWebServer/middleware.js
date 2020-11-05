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

exports.printReq = printReq