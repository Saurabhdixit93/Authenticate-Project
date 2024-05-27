const jwt = require("jsonwebtoken");
require("dotenv").config();

const ValidateAuthUser = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    // Handle the case where the Authorization header is missing
    return res.status(403).json({
      error: "Authorization header missing",
      status: false,
      code: 403,
    });
  }

  const tokenParts = authHeader.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({
      error: "Invalid token format",
      status: false,
      code: 401,
    });
  }

  const authToken = tokenParts[1]; // Extract the token part

  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        error: "Invalid token",
        status: false,
        code: 401,
      });
    }
    req.UserId = decodedToken.id;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Please authenticate using a valid token",
      status: false,
      code: 401,
    });
  }
};

module.exports = ValidateAuthUser;
