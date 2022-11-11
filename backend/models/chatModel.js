const mongoose = require("mongoose");


// --------------- Schema For Chat Model ---------------------------
const chatModel = mongoose.Schema(
  {
    // --------- trim = NO spaces after or before name -----------------------

    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },

    // --------- users = array because group will have multiple users and single chat will have two ------------

    // mongoose.Schema.Types.ObjectId ---------------> Fetching ID of each users 
    
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
