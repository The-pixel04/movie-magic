import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    await movieService.createMovie(newMovie);
    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    console.log(req.user)
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId).populate('casts.cast');

    const casts = [];

    res.render('movie/details', { movie, casts });
})

movieController.get('/search', async (req, res) => {
    const filter = req.query
    let movies = await movieService.getAll(filter);
    res.render('search', { movies, filter })
})

movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId);
    const casts = await castService.getAll({ exclude: movie.casts });

    res.render('movie/attach-cast', { movie, casts: casts });
})

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    const character = req.body.character;
    await movieService.attachCast(movieId, castId, character);

    res.redirect(`/movies/${movieId}/details`)
});

export default movieController