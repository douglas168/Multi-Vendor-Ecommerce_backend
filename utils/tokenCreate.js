const jwt = require("jsonwebtoken");
module.exports.createToken = {
  createToken: async (payload) => {
    // Specify a secret key from an environmental variable
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET environmental variable is not defined");
    }

    const token = await jwt.sign(payload, secretKey, {
      expiresIn: "7d",
    });
    console.log(token);
    return token;
  },
};
