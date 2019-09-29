const jwt = require("jsonwebtoken");
const secret = "secretToken";

module.exports = {
    sign: (data) => {
        return jwt.sign(data, secret);
    },

    verify: (token) => {
        jwt.verify(token, secret, (err, decoded) => {
            return new Promise((resolve, reject) => {
                if (err) reject(err);

                resolve(decoded);
            })
        })
    }
}