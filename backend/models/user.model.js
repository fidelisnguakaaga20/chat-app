// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     fullName:{
//         type:String,
//         required:true
//     },
//     username:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true,
//         minlength:6
//     },
//     gender:{
//         type:String,
//         required:true,
//         unique:true,
//         enum:["male","female"]
//     },
//     profilePic:{
//         type:String,
//         default:"",
//     },
// });

// const User = mongoose.model("User", userSchema);

// export default User;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName:   { type: String, required: true },
  username:   { type: String, required: true, unique: true }, // // keep unique ONLY on username
  password:   { type: String, required: true, minlength: 6 },
  // // CHANGED: removed unique:true from gender to avoid duplicate-key errors
  gender:     { type: String, required: true, enum: ["male", "female"] },
  profilePic: { type: String, default: "",
},
   //createdAt, updatedAt => member since createdAt
    },
     { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
