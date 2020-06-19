const express = require('express')
const router = express.Router();
const passport = require('passport')//to authenticate the requests
const flash = require('express-flash')//to display the messages
const session = require('express-session')//to store and presist our users across diffrent pages
const methodOverride = require('method-override')
const connection=require('../connection');
const crypto=require('crypto');

const initializePassport = require('../passport-config')
initializePassport(passport)

router.use(express.urlencoded({ extended: true }))


router.use(flash())
router.use(session({
  secret: 'secret',//it is the key to encrypt to our informationand we will get it from .env file
  resave: false,//should we resave our session variable if nothing changed i.e false
  saveUninitialized: false//to save an empty value if there is no value i.e false
}))
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))

// for going to my order
router.get('/welcome/myord/:id', checkAuthenticated, (req, res) => {
  res.render('myorder.ejs',{ name: req.user.name,id:req.user.id})
})

//for rendering to my order
router.get('/welcome/order/:uid',checkAuthenticated, (req, res) => {
  var sql =`SELECT * FROM myorder WHERE uid=${req.params.uid} ORDER BY date DESC`
   connection.query(sql,(err,result) =>{
     if (err) throw err;
     res.send(result);
   })  
})

//for confirming to the order
router.post('/welcome/trans/:id',(req,res)=>{
 var oid=req.body.oid;
  let sql = `UPDATE myorder SET transaction='sucess' WHERE oid='${oid}';DELETE  FROM cart WHERE uid='${req.params.id}'`;
    let query = connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

// for adding into myorder table
router.post('/welcome/order',(req,res)=>{
  
    var d = req.body.strArr;
  
    var sql = "INSERT INTO myorder ( name,mobileno,address,price,pid,oid,date,uid,pname) VALUES ?";
    connection.query(sql, [d], function (err, result) {
      if (err) throw err;
      res.send(result);
    });
})
 
//updating to user
router.post('/welcome/update/:id',(req,res)=>{
  const { name,password,mobileno,address } = req.body;

  let post = {name:`${name}`,password:`${password}`,
  mobileno:`${mobileno}`,address:`${address}`};

  let sql = `UPDATE user SET ? WHERE id=${req.params.id}`;
    let query = connection.query(sql, post, (err, result) => {
        if(err) throw err;
        res.render('myac.ejs',{ name: req.user.name,id:req.user.id});
    });
});

//for going to contact
router.get('/welcome/contact', checkAuthenticated, (req, res) => {
  res.render('contact.ejs',{ name: req.user.name,id:req.user.id})
})

//for rendering data to my contact
router.get('/welcome/cont',checkAuthenticated, (req, res) => {
  var sql =`SELECT * FROM admin`
   connection.query(sql,(err,result) =>{
     if (err) throw err;
     res.send(result);
   })  
})

//for going to all products
router.get('/welcome/product', checkAuthenticated, (req, res) => {
  res.render('allproduct.ejs',{ name: req.user.name,id:req.user.id})
})

//for going to my account
router.get('/welcome/myac/:id',checkAuthenticated,  (req, res) => {
  res.render('myac.ejs',{ name: req.user.name,id:req.user.id})
})

//for rendering data to my account
router.get('/welcome/ac/:id',checkAuthenticated, (req, res) => {
  var sql =`SELECT * FROM user WHERE id=${req.params.id}`
   connection.query(sql,(err,result) =>{
     if (err) throw err;
     res.send(result);
   })  
})

// for going to the single product
router.get('/welcome/singlep/:va', checkAuthenticated, (req, res) => {
  res.render('singlep.ejs',{ name: req.user.name,id:req.user.id})
})
//for rendering the data to single product  page
router.get('/welcome/sp/:v',checkAuthenticated, (req, res) => {
  
  var sql =`SELECT * FROM product WHERE pid=${req.params.v}`
   connection.query(sql,(err,result) =>{
     if (err) throw err;
     res.send(result);
   })  
})

//for going to filtered product page
router.get('/welcome/product/:valu', checkAuthenticated, (req, res) => {
  res.render('filter.ejs',{ name: req.user.name,id:req.user.id,type:req.params.valu})
})

//for rendering the data to filtered product  page
router.get('/welcome/filter/:st',checkAuthenticated, (req, res) => {
  var sql =`SELECT * FROM product WHERE category='${req.params.st}'`
   connection.query(sql,(err,result) =>{
     if (err) throw err;
     res.send(result);
   })  
})

//for deleting from cart after the check out
router.get('/welcome/delc/:id',checkAuthenticated, (req, res) => {
  var sql =`DELETE  FROM cart WHERE uid='${req.params.id}'`
   connection.query(sql,(err,result) =>{
     if (err) throw err;
     res.redirect('/user/welcome');
   })  
});

//for going to cart page
router.get('/welcome/cart/:id', checkAuthenticated, (req, res) => {
  res.render('cart.ejs',{id:req.user.id,name:req.user.name,
    address:req.user.address,mobileno:req.user.mobileno,email:req.user.email})
});

//deleting product from cart
router.delete('/cart/delete',(req,res)=>{
  var pid = req.body.prid;
  var id= req.body.usid;
  var sql =`delete from cart where pid=${pid} AND uid=${id}`;
   connection.query(sql,(err,result) =>{
     if (err) throw err;
     res.send({message: `suffesfully deleted product: ${pid}`});
   })
});

//for rendering the data to cart page
router.get('/welcome/cart/data/:id',checkAuthenticated, (req, res) => {
  var sql =`SELECT product.pname,product.pdetail,product.photo,product.price,product.category, cart.pid FROM product ,cart WHERE cart.uid=${req.params.id} AND product.pid =cart.pid`;
   connection.query(sql,(err,result) =>{
     if (err) throw err;
     res.send(result)
     
   })  
})


//to insert data in cart
router.post('/cart',(req,res)=>{
  var pid = req.body.pid;
  var id= req.body.id;
 
    let post = {pid:`${pid}`,uid:`${id}`};
    let sql = 'INSERT INTO cart SET ?';
    let query = connection.query(sql, post, (err, result) => {
        if(err) throw err;
         res.send(result);
    });
});

//for login page
router.get('/login', (req, res) => {
  res.render('login.ejs')
});

//to check login
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/user/welcome',
  failureRedirect: '/user/login',
  failureFlash: true,
  
}))

//to render if login is successful
router.get('/welcome', checkAuthenticated, (req, res) => {
  
  res.render('welcome.ejs',{ name: req.user.name,id:req.user.id})
});

//to log out and clear session
router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/user/login')
  })

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/user/login')
}

// for  goging to check out
router.get('/welcome/checkout',checkAuthenticated, function(req,res) {	
	
	res.render('checkout.ejs', {id:req.user.id,name:req.user.name,
    address:req.user.address,mobile:req.user.mobileno,email:req.user.email});
	
});
	

router.post('/welcome/checkout', function(req, res){
	var strdat = '';
	
	req.on('data', function (chunk) {
        strdat += chunk;
    });
	
	req.on('end', function()
	{
		var data = JSON.parse(strdat);
		var cryp = crypto.createHash('sha512');
		var text = data.key+'|'+data.txnid+'|'+data.amount+'|'+data.pinfo+'|'+data.fname+'|'+data.email+'|||||'+data.udf5+'||||||'+data.salt;
		cryp.update(text);
		var hash = cryp.digest('hex');		
		res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(hash));		
	});
});

router.post('/welcome/response', function(req, res){
	var key = req.body.key;
	var salt = req.body.salt;
	var txnid = req.body.txnid;
	var amount = req.body.amount;
	var productinfo = req.body.productinfo;
	var firstname = req.body.firstname;
	var email = req.body.email;
	var udf5 = req.body.udf5;
	var mihpayid = req.body.mihpayid;
	var status = req.body.status;
	var resphash = req.body.hash;
	
	var keyString 		=  	key+'|'+txnid+'|'+amount+'|'+productinfo+'|'+firstname+'|'+email+'|||||'+udf5+'|||||';
	var keyArray 		= 	keyString.split('|');
	var reverseKeyArray	= 	keyArray.reverse();
	var reverseKeyString=	salt+'|'+status+'|'+reverseKeyArray.join('|');
	
	var cryp = crypto.createHash('sha512');	
	cryp.update(reverseKeyString);
	var calchash = cryp.digest('hex');
	
	var msg = 'Payment failed for Hash not verified...';
	if(calchash == resphash)
		msg = 'Transaction Successful and Hash Verified...';
	
	res.render( 'response.ejs', {key: key,salt: salt,txnid: txnid,amount: amount, productinfo: productinfo, 
	firstname: firstname, email: email, mihpayid : mihpayid, status: status,resphash: resphash,msg:msg ,id:req.user.id,address:udf5});
});

  module.exports=router;