const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./../modules/index");

const User = db.User;
const saltRounds = 10;

const signin = async (req, res) => {
    try {
        let { name, email, phone, password } = req.body;
        const userId = v4();

        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(403).json({
                msg: "You are already registered"
            })
        } else {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;

                    password = hash;
                    User.create({ name, email, phone, password, id: userId })
                    res.status(200).json({
                        msg: "Account Created",
                        success: true,
                        token: jwt
                    })
                })
            })
        }
    } catch (err) {
        console.log("error in Register ", err);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(403).json({
                msg: "Please Create a account",
                success: false
            })
        } else {
            const originalPass = user.password;
            const ismatch = await bcrypt.compare(password, originalPass);
            if (ismatch) {
                const { email, id } = user;
                console.log(email, id);
                const payload = { email, id }
                jwt.sign(payload, "secret", {expiresIn: 36000}, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        msg: "Loginin Successfully",
                        success: true,
                        userId: id,
                        token: token
                    })
                })

            } else {
                console.log("not login");
                return res.status(403).json({
                    msg: "Please enter correct Password",
                    success: false
                })
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { signin, login };