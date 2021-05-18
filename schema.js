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
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  // "=> from users schema"
});

const commentsSchema = new mongoose.Schema({
  comment: { type:String },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});
const users = mongoose.model("users", usersSchema);
const articlesSch = mongoose.model("articles", articlesSchema);
const comments = mongoose.model("comments", commentsSchema);
// module.exports = mongoose.model("users", usersSchema);
module.exports.users = users;
module.exports.articlesSch = articlesSch;
module.exports.comments = comments;
