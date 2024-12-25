import mongoose from "mongoose";

// Define the category schema structure
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,     // Name field must be provided
    maxLength: 32,
    unique: true,       // Name must be unique  in DB
  },
});

export default mongoose.model("Category", categorySchema)