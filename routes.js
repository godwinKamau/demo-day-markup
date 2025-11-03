const passport = require('passport')
const User = require('./User')
const path = require('path')

module.exports = function(app) {

    app.post('/register', function (req, res) {
    User.register(
        new User({ 
            email: req.body.email, 
            username: req.body.username 
        }), req.body.password, function (err, msg) {
            if (err) {
            res.send(err);
            } else {
            res.redirect('/profile');
            }
        }
        )
    })

    app.post('/login', passport.authenticate('local', { 
        failureRedirect: '/sign-in', 
        successRedirect: '/profile'
    }), (err, req, res, next) => {
        if (err) next(err);
    });

    app.get('/sign-in', (req, res, next) => {
        console.log('not authenticated');
        res.sendFile(path.join(__dirname,'/public/login.html'))
    });

    app.get('/login-success', (req, res, next) => {
        console.log(req.session);
        res.send('Login Attempt was successful.');
    });

    app.get('/profile', function(req, res) {
        console.log(req.session)
        if (req.isAuthenticated()) {
        res.render(('profile'), {user:req.session.passport.user})
        } else {
        res.sendFile(path.join(__dirname,'/public/login.html'))
        }
    })

    app.post('/logout', function(req, res, next){
        req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
        });
    });

    app.get('/chat', function(req,res){
        if (!req.isAuthenticated()) {
            return res.sendFile(path.join(__dirname,'/public/login.html'));
        }
        
        
        res.render(('chat'),{ user: req.session.passport.user })
        
    })

    
};