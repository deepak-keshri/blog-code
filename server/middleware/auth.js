const jwt = require("jsonwebtoken");
const db = require('../modules/index.js');
const User = db.User;

const auth = async (req, res, next) => {
    try {
        console.log(req.body);
        let token = req.body.Auth;

        const verifyUser = jwt.verify(token, "secret");
        console.log(verifyUser);

        // const user = await User.findOne({ id: verifyUser.id });
        req.userId = verifyUser.id;
        // console.log(user);

        next();
    } catch (err) {
        console.log("Here Error are generating ", err);
    }
}

module.exports = auth;