const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.sendStatus(403);
  }
  
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = { authorization };
