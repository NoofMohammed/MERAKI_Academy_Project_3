const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  suggestion : [{ type: mongoose.Schema.Types.ObjectId, ref: "suggestions" }],

  // "=> from users schema"
});

const commentsSchema = new mongoose.Schema({
  comment: { type:String },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});
const suggestionSchema = new mongoose.Schema({
  suggestion : { type:String },
  proposed: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

// const rolesSchema = new mongoose.Schema({
//   role: "Admin",
//   permissions: ["MANAGE_USERS", "CREATE_COMMENTS"]
// })


usersSchema.pre("save", async function () {
  const salt = 10;

  this.email = this.email.toLowerCase();
  
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password, 9999999999999999999);
});

const users = mongoose.model("users", usersSchema);
const articlesSch = mongoose.model("articles", articlesSchema);
const comments = mongoose.model("comments", commentsSchema);
const suggestions = mongoose.model("suggestions", suggestionSchema);
// const roles = mongoose.model("roles", rolesSchema);

// module.exports = mongoose.model("users", usersSchema);
module.exports.users = users;
module.exports.articlesSch = articlesSch;
module.exports.comments = comments;
module.exports.suggestions = suggestions;
// module.exports.roles = roles;


