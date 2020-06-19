const express = require('express')
const router = express.Router();
const passport = require('passport')//to authenticate the requests
const flash = require('express-flash')//to display the messages
const session = require('express-session')//to store and presist our users across diffrent pages
const methodOverride = require('method-override')
var path = require('path');
var multer=require('multer')
const initializePassport = require('../passport-config')
const $=require('jquery');
const connection=require('../connection');

initializePassport(passport)
router.use(express.urlencoded({ extended: false }))


//file upload
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    }
});

const upload = multer({
  storage: storage,// 
  limits:{fileSize: '5mb'},// setting the limit for the photo
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);//it check that it is only image
  }
}).single('file');//it is the name of the input box

// Check File Type
function checkFileType(file, cb){
  const filetypes = /jpeg|jpg|png|gif/;// Allowed ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());// Check ext
  if(extname){
    return cb(null,true);
  } else {
    return cb('Error: Images Only!');
  }
}
router.post('/photo',function(req,res){
   
    upload(req,res,function(err) {
        if(err) {
            return res.end("wrong format.");
        }
        res.end("File is uploaded");
    });
})

//rendering the update page
router.get('/update/:id',(req,res)=>{
  var sql =`select * from product where pid=${req.params.id}`;
   connection.query(sql,(err,result) =>{
     if (err) throw err;
     res.send(result);
   })
});

//inserting update in the database
router.post('/update/:id',(req,res)=>{
  var pname = req.body.pname;
  var pdetail= req.body.pdetail;
  var photo=req.body.photo;
  var price=req.body.price;
  var cat=req.body.cat;
    let post = {pname:`${pname}`,pdetail:`${pdetail}`,photo:`${photo}`,price:`${price}`,category:`${cat}`};
    let sql = `UPDATE product SET ? WHERE pid=${req.params.id}`;
    
    let query = connection.query(sql, post, (err, result) => {
        if(err) throw err;
         res.send(result);
    });
});

//deleting from database
router.delete('/delete/:id',(req,res)=>{
  var sql =`delete from product where pid=${req.params.id}`;
   connection.query(sql,(err,result) =>{
     if (err) throw err;
     res.send({message: `suffesfully deleted product: ${req.params.id}`});
   })
});
//inserting in the database
router.post('/dtusers',(req,res)=>{
  var pname = req.body.pname;
  var pdetail= req.body.pdetail;
  var photo=req.body.photo;
  var price=req.body.price;
  var cat=req.body.cat;
    let post = {pname:`${pname}`,pdetail:`${pdetail}`,photo:`${photo}`,price:`${price}`,category:`${cat}`};
    let sql = 'INSERT INTO product SET ?';
    let query = connection.query(sql, post, (err, result) => {
        if(err) throw err;
         res.send({message: `suffesfully registered product: ${pname}`});
    });
});

//going to sales
router.get('/sales', (req, res) => {
  res.render('sales.ejs' )
})
// sending salesdata from datbase
router.get('/salesd',(req,res)=>{
  var sql =`SELECT * FROM myorder  where transaction='sucess' ORDER BY date DESC`;
   connection.query(sql,(err,result) =>{
     if (err) throw err;
    res.send(result);
   })
});

// sending product data from datbase
router.get('/dtusers',(req,res)=>{
  var sql ='SELECT * FROM product';
   connection.query(sql,(err,result) =>{
     if (err) throw err;
    res.send(result);
   })
});

//pasport authentication
router.use(flash())
router.use(session({
  secret: 'secret',//it is the key to encrypt to our informationand we will get it from .env file
  resave:false,//should we resave our session variable if nothing changed i.e false
  saveUninitialized: false//to save an empty value if there is no value i.e false
}))
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))
//for loding the acontrol
router.get('/login', (req, res) => {
  res.render('alogin.ejs')
})

router.post('/login', passport.authenticate('local-alogin', {
  successRedirect: '/admin/acontrol',
  failureRedirect: '/admin/login',
  failureFlash: true,
}))
router.get('/acontrol', checkAuthenticated, (req, res) => {
  res.render('acontrol.ejs' )
})
router.get('/acontrol/pedit/:id', checkAuthenticated, (req, res) => {
  res.render('pedit.ejs')
})
router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/admin/login')
  })
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/admin/login')
}

  module.exports=router;