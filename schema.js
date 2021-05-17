const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  email: { type: String },
  password: { type: String },
  // author: {type: String}
});

const articlesSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  // author:{type: String}
  author: { type: mongoose.Schema.ObjectId, ref: "users" },
  // "=> from users schema"
});
const users = mongoose.model("users", usersSchema);
const articlesSch = mongoose.model("articles", articlesSchema);

// module.exports = mongoose.model("users", usersSchema);
module.exports.users = users;
module.exports.articlesSch = articlesSch;
