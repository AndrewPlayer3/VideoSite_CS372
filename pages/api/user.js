import connectDB from '../../middleware/mongodb';
import bcrypt from 'bcrypt';
import User from '../../models/user';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Check if name, email or password is provided
    const { uname, email, pwd } = req.body;
    if (uname && email && pwd) {
        try {
          // Hash password to store it in DB
          const salt_rounds = 10;
          var passwordhash = await bcrypt.hash(pwd, salt_rounds);
          var user = new User({
            username: uname,
            email: email,
            password: passwordhash,
            role: {
                viewer: true,
                content_editor: false,
                content_manager: false
            }
          });
          // Create new user
          var usercreated = await user.save();
          return res.status(200).send(usercreated);
        } catch (error) {
          return res.status(500).send(error.message);
        }
      } else {
        res.status(422).send('data_incomplete');
      }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
