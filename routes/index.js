const router = require('express').Router();
const passport = require('passport');
const Task = require('../models/task');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/products',
  failureRedirect: '/signup',
  failureFlash: true
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/products',
  failureRedirect: '/signin',
  failureFlash: true
}));


router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});



//Edit route
router.get('/edit/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task)
  res.render('edit', { task });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.update({_id: id}, req.body);
  res.redirect('/profile');
});

//PRODUCT ROUTES
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.render('products', {
    products
  });
});

router.get('/newproduct', (req, res, next) => {
  res.render('newProduct');
});

router.post('/addproduct', async (req, res, next) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect('/products');
});

router.get('/editproduct/:id', async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.render('editproduct', { product });
});

router.post('/editproduct/:id', async (req, res, next) => {
  const { id } = req.params;
  await Product.update({_id: id}, req.body);
  res.redirect('/products');
});

router.get('/deleteproduct/:id', async (req, res, next) => {
  let { id } = req.params;
  await Product.remove({_id: id});
  res.redirect('/products');
});

module.exports = router;
