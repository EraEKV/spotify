// Import necessary modules and services
import Song from "./models/song";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import CloudStorageService from "../services/cloud-storage-service";
import User from "../auth/models/User"; 

const songRouter = Router();
const upload = new CloudStorageService();

// Create song
songRouter.post("/", authMiddleware, async (req, res) => {
    const user = (req as any).user;
    console.log(user);
    const song = await new Song({ ...req.body, uploadedBy: user.id }).save();
    res.status(201).send({ data: song, message: "Song created successfully" });
});

// Get all songs
songRouter.get("/", async (req, res) => {
    const songs = await Song.find();
    res.status(200).send({ data: songs });

    // const href = upload.uploadFile();
    // res.status(200).send({ data: href });
});

// Get song by ID
songRouter.get("/:id", async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(400).send({ message: "Song does not exist" });
        }
        res.status(200).send({ data: song });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});


// Update song
songRouter.put("/:id", authMiddleware, async (req, res) => {
    const user = (req as any).user;
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(400).send({ message: "Song does not exist" });

    // Check if the user who created the song is making the request
    if (song.uploadedBy.toString() !== user.id.toString()) {
        return res.status(403).send({ message: "Unauthorized" });
    }

    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.send({ data: updatedSong, message: "Updated song successfully" });
});


// Delete song by ID
songRouter.delete("/:id", authMiddleware, async (req, res) => {
    const user = (req as any).user;
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(400).send({ message: "Song does not exist" });

    // Check if the user who created the song is making the request
    if (song.uploadedBy.toString() !== user.id.toString()) {
        return res.status(403).send({ message: "Unauthorized" });
    }

    await Song.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Song deleted successfully" });
});

// Like song
songRouter.put("/like/:id", authMiddleware, async (req, res) => {
    const user = (req as any).user;
    const songId: string = req.params.id;
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(400).send({ message: "Song does not exist" });

    let resMessage = "";
    const userInfo = await User.findById(user.id);
    if (!userInfo) {
        return res.status(400).send({ message: "User does not exist" });
    }
    const index = userInfo.likedSongs.indexOf(songId.toString());
    if (index === -1) {
        userInfo.likedSongs.push(songId.toString());
        resMessage = "Added to your liked songs";
    } else {
        userInfo.likedSongs.splice(index, 1);
        resMessage = "Removed from your liked songs";
    }

    await userInfo.save();
    res.status(200).send({ message: resMessage });
});

// Get liked songs
songRouter.get("/like", authMiddleware, async (req, res) => {
    const user = (req as any).user;
    const userInfo = await User.findById(user.id) || { likedSongs: [] };
    const songs = await Song.find({ _id: userInfo.likedSongs });
    res.status(200).send({ data: songs });
});

   

export default songRouter;
