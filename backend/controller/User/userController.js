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
        const session = req.session;
        session.cookie.push(req.session.passport);
        res.send(user);
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
    console.log(newUser);
    res.send("User Created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const authUser = async (req, res) => {
  try {
    const id = req.session.passport.user;
    const authUser = await User.findOne({ _id: id });
    res.send(authUser);
  } catch (error) {
    res.send(req.session);
  }
};

const allUsers = async (req, res) => {
  try {
    const Users = await User.find({});
    res.json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.body
  try {
    const user = await User.findOne({ _id: id });
    if (user.role === "Admin") {
      await User.updateOne(user, { role: 'User' });
      res.send(user)
    } else {
      await User.updateOne(user, { role: 'Admin' });
      res.send(user)
    }

  } catch (error) {
    console.log(error);
  }

}

const logout = async (req, res) => {
  console.log(req.session)
  req.session.passport.pop()
  console.log(req.session)
}

module.exports = {
  login,
  register,
  authUser,
  allUsers,
  updateRole,
};
