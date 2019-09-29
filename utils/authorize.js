const jwt = require("./jwt");
const User = require("./../models/users");

module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        res.send({
            "msg": "No token provided"
        });
    }

    jwt.verify(req.headers.authorization).then(decoded => {
        User.findById(decoded.user_id).then(docs => {
            if (docs) next();
            else res.send({
                "msg": "Unauthorized"
            });;
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));

}