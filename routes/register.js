const express = require('express')
const router = express.Router();
const passport = require('passport')//to authenticate the requests
const flash = require('express-flash')//to display the messages
const session = require('express-session')//to store and presist our users across diffrent pages



const initializePassport = require('../passport-config')
initializePassport(passport)

router.use(express.urlencoded({ extended: false }))
router.use(flash())
router.use(session({
  secret: 'secret',//it is the key to encrypt to our informationand we will get it from .env file
  resave: false,//should we resave our session variable if nothing changed i.e false
  saveUninitialized: false//to save an empty value if there is no value i.e false
}))
router.use(passport.initialize())
router.use(passport.session())


router.get('/', (req, res) => {
  res.render('register.ejs')
})
router.get('/rlogin', (req, res) => {
  res.render('rlogin.ejs')
})
router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/register/rlogin',
  failureRedirect: '/register',
  failureFlash: true
}))

  module.exports=router;