const jwt = require('jsonwebtoken');
const User = require('../Models/user')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'bigsecretpassword', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

//check current user

const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
//if token exists, verify token
    if (token) {
      jwt.verify(token, 'bigsecretpassword', async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          //explicitly assign user to null if doesnt exist
          res.locals.user = null;
          next();
        } else {
          console.log(decodedToken);
          //declare a variable called user which is equal to a user which is found by the id
          let user = await User.findById(decodedToken.id)
          //if valid user, pass user into view
          res.locals.user = user
          //move onto next handler if valid
          next();
        }
      });
    } else {
      res.locals.user = null;
      next()

    }
}


module.exports = { requireAuth, checkUser };