// import jwt
const jwt = require("jsonwebtoken");

// Auth middleware
exports.auth = async (req, res, next) => {
  try {
    if ( req.path == '/' || req.path == '/login' || req.path == '/register') return next();
    console.log(req.header("Authorization"))
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Please authenticate",
    });
  }
};
