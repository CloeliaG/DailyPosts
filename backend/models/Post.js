const mongoose = require ("mongoose");

const postSchema = mongoose.Schema({
    title : {type: String, required : true},
    content : {type: String, required : true},
    creator : {type: String, required: false},
    likes : {type: Number, required : false},
    likedBy : [{ type: Object, ref: "User", required : false}],
    commentaire : {type: mongoose.Schema.Types.ObjectId, ref: "Commentaire", required : false}
});

module.exports = mongoose.model("Post", postSchema);