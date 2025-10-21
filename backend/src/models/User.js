import mongoose from "mongoose";

/**
 * Schema de Usuário
 * Campos básicos para CRUD didático.
 */
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, enum: ["admin", "user"], default: "user" }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
