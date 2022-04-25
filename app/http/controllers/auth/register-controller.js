const User = require('../../../models/User')
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')

const registerController = {
    async register(req, res) {
        try {

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        })
        
            const savedUser = await newUser.save()
            res.status(201).json(savedUser)
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = registerController