const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Blog Routes
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create a new blog'
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then((result) => {
        res.render('details', {
            title: 'Blog Details',
            blog: result
        })
    }).catch((err) => {
        console.log(err);
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id).then((result) => {
        res.json({
            redirect: '/'
        });
    }).catch((err) => {
        console.log(err)
    })
});

module.exports = router;