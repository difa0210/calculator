const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.header("Authorizatiom");
  const token = authHeader && authHeader.split("")(1);

  if (!token) {
    return res.status(401).send({
      message: "Access denied",
    });
  }
  try {
    const SECRET_KEY = "Difa Tampan";
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({
      message: "Invalid Token",
    });
  }
};
