const router = require("express").Router();
const User = require("./../models/users");
const jwt = require('./../utils/jwt');
const bcrypt = require('bcrypt');
const salt = 10;

router.post("/register", (req, res) => {

    User.findOne({
        username: req.body.username
    }).then(docs => {
        if (docs) {
            res.status(406).send({
                "msg": "User already present. Please login."
            });
        } else {
            let hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                password: hash
            });
            newUser.save().then(doc => res.send(doc)).catch(err => console.log(err));
        }
    }).catch(err => console.log(err));

});

router.post("/login", (req, res) => {

    User.findOne({
        username: req.body.username
    }).then(docs => {
        if (docs && bcrypt.compareSync(req.body.password, docs.password)) {
            const token = jwt.sign({
                user_id: docs._id,
                username: docs.username
            });

            res.send({
                username: docs.username,
                token
            })
        } else {
            res.status(406).send({
                "msg": "Invalid credentials."
            });
        }
    }).catch(err => console.log(err));
});

module.exports = router;