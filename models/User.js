const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  googleId: String,
});

model("users", userSchema);
