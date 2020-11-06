const crypto = require('crypto')
const store = require('../store')
const event_manager = require('../events')

function hashPassword(password) {
    const hash = crypto.createHash('sha256')
    hash.update(password)
    return hash.digest('hex')
}

function postRegister(req, res) {
    const { pseudo, password } = req.body
    const hashedPassword = hashPassword(password)

    const user = store.users.add({
        pseudo,
        password: hashedPassword
    })

    // emit event - new user, user
    event_manager.emit('new_user', user)

    res.json(user)
}

function postLogin(req, res) {
    const { pseudo, password } = req.body
    const hashedPassword = hashPassword(password)

    const user = store.users.getBy('pseudo', pseudo)
    if (user && user.password === hashedPassword) {
        const token = crypto.randomBytes(40).toString('hex')
        store.users.patch(user.id, { token })
        res.json({ success: true, token })
    }
    else {
        res.status(400).json({ error: 'Bad credentials' })
    }
}

function getMe(req, res) {
    res.json(req.user)
}

exports.postLogin = postLogin
exports.postRegister = postRegister
exports.getMe = getMe