const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;


export interface ISong extends Document {
    name: string;
    user: string;
    desc: string;
    songs: string;
    img: string;
  }

const playListSchema = new mongoose.Schema({
	name: { type: String, required: true },
	user: { type: ObjectId, ref: "user", required: true },
	desc: { type: String },
	songs: { type: Array, default: [] },
	img: { type: String },
});



const PlayList = mongoose.model("playList", playListSchema);

module.exports = { PlayList };