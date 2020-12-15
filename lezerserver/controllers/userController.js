const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');

exports.createUser = async (req, res, next) => {
  try {
    await User.findOne({ userName: req.body.userName }).then((exists) => {
      if (exists === null) {
        const user = new User({
          userName: req.body.userName,
        });

        user.save(((err) => {
          if (err) {
            res.status(404).send('User creation failed.');
          } else {
            res.status(200).send(user.userName);
          }
        }));
      } else {
        res.status(401).send('User already exists.');
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    if (user === null) {
      res.status(401).send('User not found');
    } else {
      req.session.username = req.params.userName;
      res.send({
        username: user.userName,
        tags: user.tags,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.OAuthGoogle = async (req, res, next) => {
  try {
    const clientId = '366910807736-j7einmtbo7udt56fvfs9hdmvsc1puv5u.apps.googleusercontent.com';
    const client = new OAuth2Client(clientId);

    const { tokenId } = req.body;

    // Verify token with Google's servers
    client.verifyIdToken({ idToken: tokenId, audience: clientId }).then((response) => {
      // If the users email is verified
      if (response.payload.email_verified) {
        // Find user in our database
        // eslint-disable-next-line consistent-return
        User.findOne({ email: response.payload.email }).exec((err, user) => {
          if (err) {
            // Something went wrong in the database
            return res.status(400).send('error while logging into Google');
          }

          if (user) {
            // if user already exists in our database
            res.json({
              firstName: response.payload.given_name,
              lastName: response.payload.family_name,
              userName: response.payload.name,
              email: response.payload.email,
              profilePicture: response.payload.picture,
            });
          } else {
            // if user does not exist in database create one!
            const newUser = new User({
              firstName: response.payload.given_name,
              lastName: response.payload.family_name,
              userName: response.payload.name,
              email: response.payload.email,
              profilePicture: response.payload.picture,
            });

            newUser.save((error) => {
              if (error) {
                return res.status(400).send('Something went wrong while saving user');
              }

              return res.json({
                firstName: response.payload.given_name,
                lastName: response.payload.family_name,
                userName: response.payload.name,
                email: response.payload.email,
                profilePicture: response.payload.picture,
              });
            });
          }
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
