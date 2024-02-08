import express from "express";
import User from "../models/User.js";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";

router.post("/signup", async (req, res) => {
  const { name, img, email, password, role, secret } = req.body;

  try {
    if (!name || !img || !email || !password || !secret) {
      res.status(400).json({ error: "Fields can't be empty" });
    }

    if (!email.includes("@")) {
      res.status(400).json({ error: "Enter Valid Email" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: "User Already Exists,Please Login" });
    } else {
      const hashword = await bcrypt.hash(password, 11);

      const newUser = await User({
        name,
        img,
        email,
        role,
        secret,
        password: hashword,
      });

      await newUser.save();

      const token = jwt.sign(
        { userId: newUser.id },
        "" + process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({ token, success: "User Successfully Created" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/forgotpassword", async (req, res) => {

  const { email, secret, newpassword } = req.body;

  try {
    if (!email || !secret || !newpassword) {
     return res.status(400).json({ error: "Fields can't be empty" });
    }

    const user = await User.findOne({ email, secret });

    if (!user) {
    return  res.status(400).json({ error: "Email and Secret Not Found" });
    }

    const hashword = await bcrypt.hash(newpassword, 11);

 await User.findByIdAndUpdate(user._id,{
      password: hashword,
    });

    res.status(200).json({success:true,message:"Password Successfully Changed"});

  } catch (error) {
   return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ error: "Fields can't be empty" });
    }

    if (!email.includes("@")) {
      res.status(400).json({ error: "Enter valid email address" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      return res.status(400).json({ error: "Password Not Found" });
    } else {
      const token = jwt.sign({ userId: user.id }, "" + process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).json({ success: "Login Successfully", token });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    // Wrap the user object in an array
    const userArray = [user];

    res.send(userArray);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getalluser", async (req, res) => {
  try {
    const user = await User.find();

    // Wrap the user object in an array
    const userArray = user;

    res.send(userArray);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
