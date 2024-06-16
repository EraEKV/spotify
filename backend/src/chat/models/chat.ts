import mongoose from "mongoose";

export interface IChat {
  participants: mongoose.Types.ObjectId[];
  usernames: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId;
}

export interface ChatModel extends IChat, mongoose.Document {}
const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  usernames: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
});

const chatModel = mongoose.model<ChatModel>("Chat", chatSchema);

export { chatModel };
