const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const router = Router();

router.post(
  '/register',
  [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password length should be more or  equal to 6').isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data for register'
        })
      }
      const {email, password} = req.body;
      const candidate = await User.findOne({email});
      if (candidate) {
        return res.status(400).json({message: 'User already exists'})
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({email, password: hashedPassword});
      await user.save();
      res.status(201).json({message: 'User created'});
    } catch (e) {
      console.log(e.message);
      res.status(500).json({message: 'Internal Server Error'})
    }
  });

router.post(
  '/login',
  [
    check('email', 'Email is not valid').normalizeEmail().isEmail(),
    check('password', 'Password length should be more or  equal to 6').isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data for login'
        })
      }
      const {email, password} = req.body;
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({message: 'User not found'})
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({message: 'Password is incorrect, please try again'})
      }
      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      );
      res.json({token, userId: user.id})
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  });

module.exports = router;
