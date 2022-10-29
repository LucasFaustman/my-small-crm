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

    if (err.code === 11000) {
        errors.email = 'That email is already registered.'
        return errors;
    }
    
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'bigsecretpassword', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req,res) => {
    res.render('signup', { title: 'Sign Up', layout: "Layout/Layout-withoutNav" });
                                                            
}

module.exports.login_get = (req,res) => {
    res.render('login', { title: 'Sign In', layout: "Layout/Layout-withoutNav" });
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
      const user = await User.login(email, password);

      const token = createToken(user._id); //jwt token created
        res.cookie('jwt', token, { httpOnly: true, maxAge : maxAge * 1000}); 

      res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err)
      res.status(400).json({ errors });
    }
  
  }
  module.exports.logout_get = (req,res) => {
      res.cookie('jwt', '', { maxAge: 1 })
      res.redirect('/')
  }