const {Router} = require('express');
const Post = require('../models/post');
const router = Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  }, filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const upload = multer({storage});

router.post('/create', upload.single('image'), async (req, res) => {

  try {
    const {title, description, date, type} = req.body;
    const post = new Post({
      title,
      description,
      date,
      type,
      imageUrl: req.file.path
    });
    await post.save();
    res.status(201).json({message: 'Post created'});
    return
  } catch (e) {
    res.status(500).json({message: 'Internal Server Error'})
  }
  return res.status(200).json({message: 'User not found'})
});

router.get('/list', async (req, res) => {
  try {
    const postList = await Post.find({});
    res.status(200).json({list: postList});
    return
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
