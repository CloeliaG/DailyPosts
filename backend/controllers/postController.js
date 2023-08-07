const Post = require('../models/Post');
const sanitize = require('mongo-sanitize');

exports.createPost = async (req, res) => {
  try {
    const { title, content, creator, likes, likedBy } = sanitize(req.body);
    console.log(req.body.likedBy)
    const post = new Post({
      title: title,
      content: content,
      creator: creator,
      likes: likes,
      likedBy: likedBy,
      // commentaire: []
    });
    await post.save();
    res.status(201).json({ message: 'Publication créée avec succès', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de la publication' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des publications' });
  }
}

exports.getOnePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la publication' });
  }
}

exports.updatePost = async (req, res) => {
  try {
    const { title, content, likes, likedBy } = sanitize(req.body);
    const post = await Post.findOne({ _id: req.params.id });
    post.title = title;
    post.content = content;
    post.likes = likes;
    post.likedBy = post.likedBy.concat(likedBy);
    await post.save();
    res.status(200).json({ message: 'Publication modifiée avec succès', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la modification de la publication' });
  }
}


exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Publication supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la publication' });
  }
}