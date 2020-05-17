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

router.put('/edit', upload.single('image'), async (req, res) => {
  try {
    const {title, description, date, type, id} = req.body;
    console.log(req.file, 'req.file');
    const params = req.file ? {title, description, date, type, imageUrl: req.file.path} : {
      title,
      description,
      date,
      type
    };
    const post = await Post.findOneAndUpdate({_id: id}, params);
    res.status(200).json({post});
  } catch (e) {
    console.log(e.message);
    res.status(500).json({message: 'Internal Server Error'})
  }
});

router.get('/list', async (req, res) => {
  try {
    const postList = await Post.find({});
    res.status(200).json({list: postList});
  } catch (e) {
    console.log(e.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({_id: id});
    res.status(200).json({post});
  } catch (e) {
    console.log(e.message);
  }
});

router.get('/by-type/:type', async (req, res) => {
  try {
    const type = req.params.type;
    const postList = await Post.find({type});
    res.status(200).json({list: postList});
  } catch (e) {
    console.log(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Post.deleteOne({_id: id});
    res.status(200).json({message: 'Deleted'});
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
