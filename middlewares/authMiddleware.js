const jwt = require("jsonwebtoken");

module.exports.authMiddleware = {
  authMiddleware: async (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(409).json({ message: "Please Login First" });
    } else {
      try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
          throw new Error("JWT_SECRET environmental variable is not defined");
        }

        const deCodeToken = await jwt.verify(accessToken, secretKey);
        req.role = deCodeToken.role;
        req.id = deCodeToken.id;
        next();
      } catch (error) {
        return res.status(409).json({ message: "Please Login" });
      }
    }
  },
};
