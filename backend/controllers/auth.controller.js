import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import genrateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
   try {
    const {fullName, username, password, confirmPassword, gender} = req.body;

    if(password !== confirmPassword) {
        return res.status(400).json({error:"Passwords don't match"})
    }

    const user = await User.findOne({username});
    if(user) {
        return res.status(400).json({error:"Username already exist"})
    }
    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const  hashPassword = await bcrypt.hash(password, salt);
   

    // const boyProfilePic = `https://avatar.iran.run.liara.run/public/boy?username=${username}`
    
    // const girlProfilePic = `https://avatar.iran.run.liara.run/public/girl?username=${username}`

    const avatarBase = "https://avatar.iran.liara.run/public";   // fixed domain
const safeUsername = encodeURIComponent(username);           // encode username
const boyProfilePic  = `${avatarBase}/boy?username=${safeUsername}`;
const girlProfilePic = `${avatarBase}/girl?username=${safeUsername}`;

    const newUser = new User({
        fullName, 
        username, 
        password:hashPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    });

    if(newUser) {
        //generate JWT  token here
        genrateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
    });
    } else {
        res.status(400).json({ error: "Invalid user data"})
    }

   } catch (error) {
    console.log("Error in signUp controller", error.message);
    res.status(400).json({ error: "Internal server Error" });
   }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

            genrateTokenAndSetCookie(user._id, res);
                res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                profilePic: user.profilePic,
            });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server Error" });
   }
    
};

export const logout = (req, res) => {
   try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully"});
   } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server Error" });
   }
   
};