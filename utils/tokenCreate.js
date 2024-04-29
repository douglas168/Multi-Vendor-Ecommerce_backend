const jwt = require("jsonwebtoken");
module.exports.createToken = {
  createToken: async (data) => {
    // Specify a secret key from an environmental variable
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET environmental variable is not defined");
    }

    const token = await jwt.sign(data, secretKey, {
      expiresIn: "7d",
    });
    return token;
  },
};
