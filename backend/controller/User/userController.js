const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const salt = bcrypt.genSaltSync(10);
require("./passportConfig")(passport);

const login = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                // res.send("Successfully Authenticated");
                res.send(user)

            });
        }
    })(req, res, next);

};

const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    const role = "User";

    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            role: role,
        });
        await newUser.save();
        res.send("User Created");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const authUser = (req, res, next) => {
    res.send( req.session)
};

module.exports = {
    login,
    register,
    authUser,
};
