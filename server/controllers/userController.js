const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendMail } = require('./methodController')

class UserController {
    async signUP(req, res) {
        const { name, email, password,address,phone } = req.body
        try {
            const findEmail = await User.findOne({ email })
            if (findEmail) {
                res.status(401).json({ message: 'this email already signUp' })
            } else {

                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const user = new User({ name, email, password: hash,phone,address })
                        const token = jwt.sign({ email: user.email, password: hash }, process.env.JWT_KEY, { expiresIn: '10m' })
                        sendMail(token)
                        user.save()
                            .then(doc => res.status(200).json({ doc, token }))
                            .catch(err => console.log(err))

                    }
                })
            }

        } catch (error) {
            console.log(error);
        }

    }

    async accountVerify(req, res) {
        const token = req.params.token
        const decodeToken = jwt.verify(token, process.env.JWT_KEY)
        if (decodeToken) {
            const { email, password } = decodeToken
            try {
                const findUser = await User.findOne({ email })
                if (findUser) {
                    bcrypt.compare(password, findUser.password, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            findUser.updateOne({ valid: true }, { new: true })
                                .then(doc => res.status(202).json({ doc }))
                                .catch(err => { console.log(err) })
                        }
                    })
                }
            } catch (error) {
                console.log(error);
            }

        } else {
            res.status(401).send('this link is expire')
        }
    }

    async signIn(req,res){
        const { email, password } = req.body
            try {
                const findUser = await User.findOne({ email })
                if (findUser) {
                    bcrypt.compare(password, findUser.password, (err, result) => {
                        if (result)  {
                            const token = jwt.sign({_id:findUser._id,address:findUser.address},process.env.JWT_KEY)
                            res.status(200).json({token})
                        }else{
                            res.status(401).json({message : 'email or password incorect'})
                        }
                    })
                }else{
                    res.status(401).json({message:'we don\'t find any email like that'})
                }
            } catch (error) {
                console.log(error);
            }
    }
}
module.exports = new UserController()