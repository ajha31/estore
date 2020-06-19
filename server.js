const express = require('express')
const app = express();
const expressLayouts=require('express-ejs-layouts');
const path=require('path');

app.use(express.static(path.join(__dirname, './public')));
// EJS

app.set('view engine', 'ejs');

app.use('/user',require('./routes/user'));
app.use('/register',require('./routes/register'))
app.use('/admin',require('./routes/admin'))

app.get('/', (req, res) => {
  res.render('index.ejs');
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log('App listening on port ' + port));
