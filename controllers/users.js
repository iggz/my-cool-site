const bcrypt = require('bcryptjs');

const User = require('../models/users');

exports.index_get = (req, res) => {
    res.render('template', {
        locals: {
            title: 'User page',
            is_logged_in: req.session.is_logged_in
        },
        partials:{
            partial: 'users-partial'
        }
    });
}

exports.signup_get = (req, res) => {
    res.render('template', {
        locals: {
            title: 'Sign Up Page',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'signup-form-partial'
        }
    });
}

exports.login_get = (req, res) => {
    res.render('template', {
        locals: {
            title: 'Login Page',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'login-form-partial'
        }
    });
}

exports.logout_get = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.signup_post = async (req,res) => {
    const { first_name, last_name, email, password } = req.body;
    console.log('req.body is displayed as: ', req.body);
    console.log('email as entered', email);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userInstance = new User (null, first_name, last_name, email, hash);
    let check = await userInstance.CheckIfDuplicate();

    if(typeof check === 'object') {
        console.log('This email is already registered. Please register a new email ya freakin jabronie!!!!');
        res.redirect('/users/login');
    } else {
    await userInstance.save().then(response => {
        console.log("signup response is", response);
        res.redirect('/users/login');
        });
    };
}

exports.login_post = async (req,res) => {
    const {email, password } = req.body;
    console.log("login_post req.body", req.body);

    const userInstance = new User(null, null, null, email, password);
    // userInstance.login().then(response => {
    //     req.session.is_logged_in = response.isValid;
    //     console.log("Post login response is: ", response)
    // })
    const userData = await userInstance.getUserByEmail();
    console.log("userData: ", userData)
    
    const isValid = await bcrypt.compareSync(password, userData.password);

    if(!!isValid) {
        req.session.is_logged_in = true;
        req.session.first_name = userData.first_name;
        req.session.last_name = userData.last_name;
        req.session.user_id = userData.id;  // this used to not work because it called userData.user_id instead of userData.id, which does not exist within the session.
        res.redirect('/');
    } else {
        res.sendStatus(401);
    }
    // bcrypt.compareSync(this.password, hashedPassword);
};