const adminModel = require("../models/adminModel");
const bcrpty = require("bcrypt");
const responseReturn = require("../utils/response");
const { createToken } = require("../utils/tokenCreate");

class authControllers {
  admin_login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      // console.log(admin);
      if (!admin) {
        return res.status(404).json({ message: "Email not found" });
      }

      const match = await bcrpty.compare(password, admin.password);
      console.log(match);
      if (!match) {
        return res.status(401).json({ message: "Password incorrect" });
      } else {
        const token = await createToken.createToken({
          id: admin.id,
          role: admin.role,
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return res.status(200).json({ token, message: "Login Successful" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // get user
  getUser = async (req, res) => {
    const { id, role } = req;

    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        return res.status(200).json({ userInfo: user });
      } else {
        console.log("seller");
        // const seller = await sellerModel.findById(id);
        // responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }; // End getUser Method
}

module.exports = new authControllers();
