var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

/* GET home page. */
router.get('/', function (req, res, next) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: 'imooc首页',
            movies: movies
        });
    });

});

router.get('/movie/:id', function (req, res, next) {
    var id = req.params.id;

    Movie.findById(id, function (err, movie) {
        if (err) {
            console.log(err);
        }
        res.render('detail', {
            title: "imooc 详情页",
            movie: movie
        });
    });
});
module.exports = router;
