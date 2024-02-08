import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import Chats from "../models/Chats.js";
const router = express.Router();

router.post("/sendmessage", fetchuser, async (req, res) => {

    const { message, user } = req.body;

    try {

        if (!message || !user) {
            res.status(400).json({ error: "Message Field can't be empty" });
        }

        const messages = await Chats({
            message, user
        });

        await messages.save();

        res.status(200).json({ success: "Successfully Craeted message", message: [messages] });

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

});

router.get("/getallchat", fetchuser, async (req, res) => {

    try {

        const messages = await Chats.find();

        res.status(200).json({ message: messages });

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

});

router.delete("/deletechat/:id", fetchuser, async (req, res) => {

    try {

        const user = await Chats.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(400).json({ error: "Message Not Found" });
        }

        await user.save();

        res.status(200).json({ success: "Successfully deleted" });

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

});

router.put("/updatemessage/:id", fetchuser, async (req, res) => {

    const { message } = req.body;

    try {

        const user = await Chats.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                message
            }
        });

        if (!user) {
            res.status(400).json({ error: "Message Not Found" });
        }

        res.status(200).json({ success: "Successfully Updated" });

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

});

router.get("/chat/:id", fetchuser, async (req, res) => {

    try {

        const user = await Chats.findById({ _id: req.params.id });

        if (!user) {
            res.status(400).json({ error: "Message Not Found" });
        }

        res.status(200).json({ success: "Successfully Fetched Data" });

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

});

export default router;