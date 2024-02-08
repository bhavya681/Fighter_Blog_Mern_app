import express from "express";
const router = express.Router();
import fetchuser from "../middleware/fetchuser.js";
import Notes from "../models/Notes.js";

//fetchallmynotes - fetchallnotes

router.get("/fetchallnotes", fetchuser, async (req, res) => {

    try {

        const notes = await Notes.find({ user: req.userId });

        res.json(notes);

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

})

//addnote

router.post("/addnote", fetchuser, async (req, res) => {

    const { title, username, gender, country, age, image, bio, skills, division, nickname, profile, champion } = req.body;

    try {

        if (!title || !username || !gender || !country || !age || !image || !bio || !skills || !division || !profile) {

            res.status(400).json({ error: "Fields can't be Empty" })

        }

        const notes = await Notes({
            user: req.userId,
            title,
            username,
            gender,
            country,
            age,
            image,
            profile,
            bio,
            skills,
            nickname,
            champion,
            division
        });

        const savedNote = await notes.save();

        res.json({ savedNote, success: "Successfully Created Note" });

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

})

//updatenote

router.put("/updatenote/:id", fetchuser, async (req, res) => {

    const { title, username, gender, country, age, image, bio, skills, division, nickname, profile, champion } = req.body;

    try {

        if (!title || !username || !gender || !country || !age || !image || !bio || !skills || !division || !profile) {

            res.status(400).json({ error: "Fields Can't be empty" });

        }

        const note = await Notes.findById({ _id: req.params.id });

        if (!note) {

            res.status(400).json({ error: "Notes Not Found" });

        }

        const notes = await Notes.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                title, username, gender, country, age, image, bio, skills, division, champion, nickname, profile
            }
        }, { new: true });

        if (!notes) {

            res.status(400).json({ error: "Notes Not Found" });

        }

        res.status(200).json({ notes, success: "Notes Successfully Updated" });

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

})


//deletenote

router.delete("/deletenote/:id", fetchuser, async (req, res) => {

    try {

        let note = await Notes.findById(req.params.id);

        if (!note) {

            res.status(400).json({ error: "Note Not Found" });

        }

        note = await Notes.findByIdAndDelete(req.params.id);

        if (!note) {

            res.status(400).json({ error: "Note Not Found" });

        }

        res.status(200).json({ success: "Successfully Deleted Note" });

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

})


//getnotebyid

router.get("/note/:id", fetchuser, async (req, res) => {

    try {

        const note = await Notes.findById({ _id: req.params.id });

        if (note) {

            res.status(200).send(note);

        } else {

            res.status(400).json({ error: "Notes Not Found" });

        }

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

})


//fetchallnotes - fetchnotes

router.get("/notes", async (req, res) => {

    try {

        const notes = await Notes.find();

        if (notes) {

            res.send(notes);

        } else {

            res.status(400).json({ error: "Notes Not Found" });

        }

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

});


//Admin Add Note

router.post("/adminaddnote", async (req, res) => {

    const { title, username, gender, country, age, image, bio, skills, division, nickname, profile, champion } = req.body;

    try {

        if (!title || !username || !gender || !country || !age || !image || !bio || !skills || !division || !profile) {

            res.status(400).json({ error: "Fields can't be Empty" })

        }

        const notes = await Notes({
            user: req.userId,
            title,
            username,
            gender,
            country,
            age,
            image,
            profile,
            bio,
            skills,
            nickname,
            champion,
            division
        });

        const savedNote = await notes.save();

        res.json({ savedNote, success: "Successfully Created Note" });

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

})



//Admin Updatenote

router.put("/adminupdatenote/:id", async (req, res) => {

    const { title, username, gender, country, age, image, bio, skills, division, nickname, profile, champion } = req.body;

    try {

        if (!title || !username || !gender || !country || !age || !image || !bio || !skills || !division || !profile) {

            res.status(400).json({ error: "Fields Can't be empty" });

        }

        const note = await Notes.findById({ _id: req.params.id });

        if (!note) {

            res.status(400).json({ error: "Notes Not Found" });

        }

        const notes = await Notes.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                title, username, gender, country, age, image, bio, skills, division, champion, nickname, profile
            }
        }, { new: true });

        if (!notes) {

            res.status(400).json({ error: "Notes Not Found" });

        }

        res.status(200).json({ notes, success: "Notes Successfully Updated" });

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

})


//Admin Deletenote

router.delete("/admindeletenote/:id",async (req, res) => {

    try {

        let note = await Notes.findById(req.params.id);

        if (!note) {

            res.status(400).json({ error: "Note Not Found" });

        }

        note = await Notes.findByIdAndDelete(req.params.id);

        if (!note) {

            res.status(400).json({ error: "Note Not Found" });

        }

        res.status(200).json({ success: "Successfully Deleted Note" });

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

})


//Admin Getnotebyid

router.get("admin/note/:id",async (req, res) => {

    try {

        const note = await Notes.findById({ _id: req.params.id });

        if (note) {

            res.status(200).send(note);

        } else {

            res.status(400).json({ error: "Notes Not Found" });

        }

    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });

    }

})

export default router;