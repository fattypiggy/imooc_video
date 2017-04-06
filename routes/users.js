var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var _ = require('underscore');

/* POST new movie. */
router.post('/movie/new', function (req, res, next) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if (id !== "undefined") {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {
        _movie = new Movie({
            director: movieObj.director,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            flash: movieObj.flash,
            summary: movieObj.summary,
        });
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        });
    }
});

router.get('/movie', function (req, res, next) {
    res.render('admin', {
        title: "imooc 后台录入页",
        movie: {
            title: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            director: '',
            summary: '',
            language: ''
        }
    });
});

router.get('/list', function (req, res, next) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'imooc管理员列表',
            movies: movies
        });
    });
});

router.get('/movie/update/:id', function (req, res, next) {
    var id = req.params.id;

    Movie.findById(id, function (err, movie) {
        if (err) {
            console.log(err);
        }
        res.render('admin', {
            title: "imooc 后台更新页",
            movie: movie
        });
    });
});
module.exports = router;
