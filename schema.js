const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
firstName: {type:String},
lastName: {type:String},
age: {type:Number},
country: {type:String},
email: {type:String},
password: {type:String}

})

const articlesSchema = new mongoose.Schema({
    title: {type:String},
description: {type:String},
author: {type:Schema.types.ObjectId, ref:"users"} 
// "=> from users schema"
})
const users = mongoose.model("users", usersSchema)
const articles = mongoose.model("articles", articlesSchema)

// module.exports = mongoose.model("users", usersSchema);
