const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = async (options) => {
  // 1. create Transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2. Define the Email Options
  const mailOptions = {
    from: "Satish Konduru",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
