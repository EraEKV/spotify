import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  name: string;
  artist: string;
  song: string;
  img: string;
  duration: string;
  uploadedBy: string;
}

const SongSchema: Schema = new Schema({
  name: { type: String, required: true },
  artist: { type: String, default: 'Unknown'},
  song: { type: String, required: true },
  img: { type: String, required: true },
  duration: { type: String, required: true },
  uploadedBy: { type: String, required: true },
});

export default mongoose.model<ISong>('song', SongSchema);
