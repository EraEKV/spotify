import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username?: string;
  password: string;
  likedSongs: string[];
  playlists: string[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, default: 'User' },
  password: { type: String, required: true },
  likedSongs: { type: [String], default: [] },
  playlists: { type: [String], default: [] },
});

export default mongoose.model<IUser>('User', UserSchema);
