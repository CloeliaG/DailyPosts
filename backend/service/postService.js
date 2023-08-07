const Post = require('../models/Post');

exports.createPost = async (title, content, creator) => {
  const post = new Post({
    title,
    content,
    creator
  });
  await post.save();
  return post;
};

// Autres méthodes du service pour la mise à jour, la suppression, la récupération des publications, etc.
