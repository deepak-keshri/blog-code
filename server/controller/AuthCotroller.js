const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./../modules/index");

const User = db.User;

const signin = (req, res) => {
    try {
        let { name, email, phone, password } = req.body;
        const userId = v4();

        User.findOne({ where: { email } }).then((user) => {
            if (user) {
                return res.status(403).json({
                    msg: "You are already register.",
                });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        User.create({
                            name,
                            phone,
                            email,
                            password,
                            id: userId
                        }).then(() => {
                            res.status(200).json({
                                msg: "Registration Successful",
                                success: true,
                                token: jwt
                            });
                        }).catch((err) => {
                            res.status(500).json({ err });
                        });
                    })
                })
            }
        })
    } catch (err) {
        console.log("error in Register ", err);
    }
}
// const login = ab;
const login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ Where: { email }, row: true }).then((user) => {
        if (!user) {
            return res.status(401).json({
                error: "User not found!",
                success: false,
                msg: "Invalid credentials"
            });
        }
        let originalPassword = user.password;
        bcrypt.compare(password, originalPassword).then((isMatch) => {
            if (isMatch) {
                const { id, email } = user;
                const payload = { id, email };
                jwt.sign(
                    payload, "secret",
                    {
                        expiresIn: 3600,
                    },
                    (err, token) => {
                        return res.status(200).json({
                            success: true,
                            token: token,
                            msg: "Logged in succefully",
                            userId: user.id,
                            name: user.name,
                            email

                        });
                    }
                )
            } else {
                return res.status(400).json({
                    error: "Password not match",
                    success: false,
                    msg: "Invalid Password"
                })
            }
        })

    })

}


module.exports = { signin, login };