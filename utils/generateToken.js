const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
  // Generate the JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // // Set the cookie
  // res.cookie("token", token, {
  //   httpOnly: true, // Prevents JavaScript access to the cookie
  //   secure: process.env.NODE_ENV === "production", // HTTPS only in production
  //   sameSite: "None", // Protection against CSRF
  //   maxAge: 3600000, // 1 hour in milliseconds
  //   path: "/", // Cookie is available for all paths
  // });

  // Set the cookie
  res.cookie("token", token, {
    httpOnly: true, // Prevents JavaScript access to the cookie
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    // sameSite: "Strict", // Protection against CSRF
    sameSite: "None",
    maxAge: 3600000, // 1 hour in milliseconds
    path: "/", // Cookie is available for all paths
  });

  return token;
};

module.exports = generateTokenAndSetCookie;
