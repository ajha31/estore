// config/passport.js
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy
const connection=require('./connection');
// expose this function to our app using module.exports
module.exports = function(passport) {
  //to serializeUser
    passport.serializeUser(function(user, done) {
		done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		connection.query("select * from user where id = "+id,function(err,rows){	
			done(err, rows[0]);
		});
    });

   //// users sighnup ////

    passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email and password
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    const { name,password2,mobileno,address } = req.body;
    if (password != password2) {
      return done(null, false,{ message: 'password do not match' });//to check if the passwords are same or not
    }
    if (mobileno.length != 10) {//to check if the mobile no is equal to 10 character
      return done(null, false,{ message: 'mobileno must be of 10 character' });
    }
  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
      connection.query("select * from user where email = '"+email+"'",function(err,rows){
    console.log(rows);
    console.log("above row object");
    if (err)
              return done(err);
     if (rows.length) {
              return done(null, false,{ message: 'email is already taken' });
          } else {

      // if there is no user with that email
              // create the user
              var newUserMysql = new Object();
      
              newUserMysql.email    = email;
              newUserMysql.password = password; // use the generateHash function in our user model
    
              let post = {name:`${name}`,email:`${email}`,password:`${password}`,
              mobileno:`${mobileno}`,address:`${address}`};
              let sql = 'INSERT INTO user SET ?';
              let query = connection.query(sql, post, (err, rows) => {
             newUserMysql.id = rows.insertId;
                
           return done(null, newUserMysql);
      });	
          }	
  });
  }));

    // user login

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

         connection.query("SELECT * FROM `user` WHERE `email` = '" + email + "'",function(err,rows){

			if (err)
                return done(err);
			 if (!rows.length) { 
              
                return done(null, false,{ message: 'No user with that email' } ); // req.flash is the way to set flashdata using connect-flash
            } 
			      // if the user is found but the password is wrong
            if (!( rows[0].password == password))
            
                return done(null, false, { message: 'Password incorrect' }); // create the loginMessage and save it to session as flashdata
            // all is well, return successful user
            return done(null, rows[0]);			
		});

    }));

 // admin login
    
    passport.use('local-alogin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'aemail',
        passwordField : 'apassword',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

         connection.query("SELECT * FROM `admin` WHERE `aemail` = '" + email + "'",function(err,rows){

			if (err)
                return done(err);
			 if (!rows.length) { 
              
                return done(null, false,{ message: 'No user with that email' } ); // req.flash is the way to set flashdata using connect-flash
            } 
			      // if the user is found but the password is wrong
            if (!( rows[0].password == password))
            
                return done(null, false, { message: 'Password incorrect' }); // create the loginMessage and save it to session as flashdata
            // all is well, return successful user
            return done(null, rows[0]);			
		});

    }));
};