const express = require('express');
const router  = express.Router();
const passport = require("passport");
const ensureLoggedIn = require('connect-ensure-login');
// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


router.post("/upload", upload.single('image'), (req, res, next) => {
	console.log("hello", 'http://localhost:5000/uploads/'+req.file.filename)
	res.json({image: 'http://localhost:5000/uploads/'+req.file.filename})
})
router.post("/signup", (req, res, next) => {
  let {username, password, campus, course, image} = req.body;

  if (username === "" || password === "") {
    res.status(500).json({ message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
  .then(user => {

    if (user !== null) {
      res.status(500).json({ message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      campus,
      course,
      image,
      password: hashPass
    });

    newUser.save((err) => {

      if (err) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
        res.json({user: newUser});
      }
    });
  })
  .catch(error => {
    next(error)
  })
});

router.post('/login', (req, res, next) => passport.authenticate("local", 
	(err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
    
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
    })(req, res, next)
);

router.post('/upload', (req,res,next)=>{

})
router.post('/edit', (req,res,next)=>{

})
router.get('/logout', (req,res,next)=>{
	req.logout();
    res.status(200).json({ message: 'Log out success!' });
})
router.get('/loggedin', (req,res,next)=>{
	console.log('logged',req.user)
	if (req.isAuthenticated()) {
        res.status(200).json({user: req.user});
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
})

module.exports = router;
