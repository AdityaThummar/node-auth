const jwtToken = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (uid) => new Promise((res, rej) => {
    try {
        const payload = {
            uid
        }
        const options = { issuer: "shadowclone", expiresIn: "2h" }
        const secret = process.env.JWT_ACCESS_SECRET
        jwtToken.sign(payload, secret, options, (error, response) => {
            if (error) {
                rej(error)
            } else {
                res(response)
            }
        })
    } catch (error) {
        console.log("🚀 ~ generateAccessToken ~ error:", error)
        return rej(error)
    }
})

module.exports = {
    generateAccessToken
}