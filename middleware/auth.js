const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token." });
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};

const isReceptionist = (req, res, next) => {
  if (req.role !== "receptionist") {
    return res.status(403).send({ message: "Require Receptionist Role!" });
  }
  next();
};

module.exports = {
  verifyToken,
  isReceptionist,
};
