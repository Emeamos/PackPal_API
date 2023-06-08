import mongoose from "mongoose";

const essentialsSchema = new mongoose.Schema({
  essentials: {
    type: String,
    required: [true, "essential is needed"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

const essential = mongoose.model('essentials', essentialsSchema);

export default essential;
