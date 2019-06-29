import nodeMailer from 'nodemailer';

const orderPost = [
  async (req, res) => {
    // send email here
    console.log('Data: ', req.body);
    res.json({ message: 'Message Received!!' });
  }
];


export default {
  post: orderPost,
};
