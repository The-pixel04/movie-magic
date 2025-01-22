import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const newMovie = req.body;

    movieService.createMovie(newMovie);
    res.redirect('/');
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.findMovie(movieId);

    res.render('details', { movie });
})

movieController.get('/search', (req, res) => {
    let movies = movieService.getAll();
    res.render('search', { movies })
})

export default movieController