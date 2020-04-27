const {Router} = require('express');
const router = Router();
const nodemailer = require('nodemailer');

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'baktygul.baitikova@iaau.edu.kg',
    pass: 'qwerty2020'
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

router.post('/application-form', async (req, res) => {
  const {subject, fullName, description, email} = req.body;
  const mailOptions = {
    from: 'baktygul.baitikova@iaau.edu.kg',
    to: 'baktygul.baitikova@iaau.edu.kg',
    subject: subject,
    text: `From ${fullName}, email: ${email}, description: ${description}`
  };
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Email send')
    }
  });
  res.status(200).json({message: 'OK'})
});

module.exports = router;
