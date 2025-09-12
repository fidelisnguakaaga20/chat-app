// import express from "express";
// import dotenv from "dotenv";

// import authRoutes from "./routes/auth.routes.js";
// import connectToMongoDB from "./db/connectToMongoDB.js";

// const app = express();
// const PORT = process.env.PORT || 5000;


// dotenv.config();

// app.use(express.json()); // to parse the incoming request with JSON payloads (from req.body)

// app.use("/api/auth", authRoutes);

// // app.get("/", (req, res) => {
// //     // root route http://localhost:5000/
// //     res.send("Hello World!");
// // });

// app.listen(PORT, () => {
//     connectToMongoDB();
//     console.log(`Server running on port ${PORT}`);
// });



// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose"; // // needed for one-time index drop

// import authRoutes from "./routes/auth.routes.js";
// import connectToMongoDB from "./db/connectToMongoDB.js";

// // // moved dotenv.config() BEFORE reading process.env
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json()); // // keep JSON parsing for req.body
// app.use("/api/auth", authRoutes);

// app.listen(PORT, () => {
//   connectToMongoDB();
//   console.log(`Server running on port ${PORT}`);
// });

// // // one-time cleanup for mistaken unique index on gender
// // // remove this block AFTER you see "Dropped gender_1" once
// mongoose.connection.once("open", async () => {
//   try {
//     await mongoose.connection.db.collection("users").dropIndex("gender_1");
//     console.log("Dropped gender_1");
//   } catch (e) {
//     if (e.codeName === "IndexNotFound") console.log("gender_1 not found");
//     else console.error("Drop index error:", e);
//   }
// });

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config(); // keep this before reading env

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
