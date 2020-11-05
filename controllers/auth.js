const crypto = require('crypto')
const Router = require('express').Router
const router = Router()
const store = require('../store')
const { checkAuth, reqAuth } = require('../middlewares')

function hashPassword(password) {
    const hash = crypto.createHash('sha256')
    hash.update(password)
    return hash.digest('hex')
}

router.post('/register', (req, res) => {
    const { pseudo, password } = req.body
    const hashedPassword = hashPassword(password)

    const user = store.users.add({
        pseudo,
        password: hashedPassword
    })
    res.json(user)
})

router.post('/login', (req, res) => {
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
})

router.get('/me', checkAuth, reqAuth, (req, res) => {
    res.json(req.user)
})

module.exports = router