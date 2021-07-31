const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {
  render
} = require('ejs');
const Blog = require('./models/blog');
const blogrouter = require('./routes/blogRoutes');

// express app
const app = express();

const dbURI = 'Secret :)';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((result) => {
  console.log('Connected to DB');
  // listen for requests
  app.listen(3000);
}).catch((err) => {
  console.log(err);
});


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}))

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  Blog.find().sort({
      createdAt: -1
    })
    .then((result) => {
      const blogs = result;
      res.render('index', {
        title: 'All Blogs',
        blogs
      });
    }).catch((err) => {
      console.log(err);
    })
});

app.use('/blogs', blogrouter);

app.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then((result) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err);
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About'
  });
});



// 404 page
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404'
  });
});
