// import jwt from 'jsonwebtoken'

// const genrateTokenAndSetCookie = (userId, res) => {
//     const token = jwt.sign({userId}, process.env.JWT_SECRET,{
//         expiresIn: '25'
//     })
//     res.cookie("jwt", token, {
//         maxAge: 15 * 24 * 60 * 1000, // MS
//         httpOpenly: true, // prevent XSS attacks cross-site scripting attacks
//         sameSight: "strick", // SCRF attacks across-site request forgery attacks 
//         secure: process.env.NODE_ENV !== "development"
//     });
// };

// export default genrateTokenAndSetCookie;


// backend/utils/generateToken.js
import jwt from "jsonwebtoken";

const genrateTokenAndSetCookie = (userId, res) => {
  // BEFORE: expiresIn: '25'  // expires almost instantly
  // AFTER: 7 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  // BEFORE: httpOpenly / sameSight / "strick" + wrong maxAge math
  // AFTER: correct cookie options (7 days, dev-safe)
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // set true in production (HTTPS)
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default genrateTokenAndSetCookie;
