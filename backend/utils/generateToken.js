
// import jwt from "jsonwebtoken";

// const genrateTokenAndSetCookie = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
//   res.cookie("jwt", token, {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: false, 
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });
// };

// export default genrateTokenAndSetCookie;

import jwt from "jsonwebtoken";

const genrateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd, // requires HTTPS in prod
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default genrateTokenAndSetCookie;

