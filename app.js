const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const path = require('path');

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/form', require('./routes/mailer.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


const MONGO_URI = config.get('mongoUri');
const PORT = config.get('port') || 5000;

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1)
  }
};

start();
