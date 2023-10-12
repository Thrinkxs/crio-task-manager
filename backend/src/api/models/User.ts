import mongoose, { InferSchemaType } from "mongoose";
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
});

type User = InferSchemaType<typeof UserSchema>;
const User = mongoose.model("User", UserSchema);

export default User;
