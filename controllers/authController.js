const User = require('../Models/user')
const jwt = require('jsonwebtoken')

//handle errors

const handleErrors  = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: ''};

// handle errors for the login
if (err.message === 'Incorrect email and/or password.') {
    errors.email = err.message;
    errors.password = err.message;
  };


    //duplicate errors

    if (err.code === 11000) {
        errors.email = 'That email is already registered.'
        return errors;
    }

    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors
}

//create a max amount of time that token will be valid for
const maxAge = 3 * 24 * 60 * 60
//create token
const createToken = (id) => {
    return jwt.sign({ id }, 'bigsecretpassword', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req,res) => {
    res.render('signup', { title: 'Sign Up', layout: layout/layout-withoutNav });
                                                            
}

module.exports.login_get = (req,res) => {
    res.render('login', { title: 'Sign In', layout: layout/layout-withoutNav });
}

module.exports.signup_post = async (req,res) => {
    const { email,password, firstName, lastName } = req.body 
    
    try {
        const user = await User.create( {email,password, firstName, lastName} );
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge : maxAge * 1000})
        res.status(201).json({ user: user._id })
    }
    catch(err) {
       const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // declare user variable to async function, get User.login from the login function declared in user. pass in email and pw
      const user = await User.login(email, password);

      const token = createToken(user._id); //jwt token created
        res.cookie('jwt', token, { httpOnly: true, maxAge : maxAge * 1000}); //cookie will last for 3 days


      //if successful, respond back with user._id with cookie attached
      res.status(200).json({ user: user._id });
      //if any errors, send back a response
    } catch (err) {
        //grab whatever is returned
        const errors = handleErrors(err)
        //then send errors
      res.status(400).json({ errors });
    }
  
  }

  module.exports.logout_get = (req,res) => {
      res.cookie('jwt', '', { maxAge: 1 })
      res.redirect('/')
  }