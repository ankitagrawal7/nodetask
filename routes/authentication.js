const router = require("express").Router();
const User = require("./../models/users");
const jwt = require('./../utils/jwt');

router.post("/register", (req, res) => {

    User.findOne({
        username: req.body.username
    }).then(docs => {
        if (docs) {
            res.status(406).send({
                "msg": "User already present. Please login."
            });
        } else {
            const newUser = new User(req.body);
            newUser.save().then(doc => res.send(doc)).catch(err => console.log(err));
        }
    }).catch(err => console.log(err));

});

router.post("/login", (req, res) => {

    User.findOne({
        username: req.body.username,
        password: req.body.password
    }).then(docs => {
        if (docs) {
            const token = jwt.sign({
                user_id: docs._id
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