var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
app.use(session({
    secret: 'your-secret-key',  // Secret key for signing the session ID cookie
    resave: false,              // Don't save session if it wasn't modified
    saveUninitialized: true,    // Save a session that is uninitialized
    cookie: { secure: false }   // Set 'secure: true' if using HTTPS
}));

app.get('/', function(req, res){
    res.cookie('name', 'express' , {expire: 360000 + Date.now()}).send('cookie set'); //Sets name = express
});

app.get('/clear_cookie', function(req, res){
    res.clearCookie('name');
    res.send('cookie foo cleared');
});

app.get('/session', function(req, res){
    req.session.user = {
        username: 'jane_doe',
        email: 'jane@example.com'
    };
    res.send('session set');
});
app.get('/get-user-data', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user); // { username: 'jane_doe', email: 'jane@example.com' }
    } else {
        res.send('No user data in session.');
    }
});
app.get('/clear_session', function(req, res){
    req.session.destroy();
    res.send('session cleared');
});
 
app.listen(3000);