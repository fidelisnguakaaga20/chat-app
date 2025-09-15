
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


// backend/utils/generateToken.js
import jwt from "jsonwebtoken";

const genrateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    // CHANGE: 'none' in production so cookies can be sent cross-site (Vercel <-> Render)
    sameSite: isProd ? "none" : "lax",
    // CHANGE: secure cookies only on HTTPS (Render/Vercel)
    secure: isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default genrateTokenAndSetCookie;
