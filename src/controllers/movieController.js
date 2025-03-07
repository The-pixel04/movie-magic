import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?._id;
    await movieService.createMovie(newMovie, userId);
    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId).populate('casts.cast');

    let isCreator = movie.creator && movie.creator.equals(req.user?._id);

    res.render('movie/details', { movie, isCreator });
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

    res.render('movie/attach-cast', { movie, casts });
})

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    const character = req.body.character;
    await movieService.attachCast(movieId, castId, character);

    res.redirect(`/movies/${movieId}/details`)
});

movieController.get('/:movieId/delete', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId);

    if (!movie.creator?.equals(req.user?._id)) {
        return res.redirect('/404');
    }

    await movieService.deleteMovie(movieId);

    res.redirect('/');
});

movieController.get('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovie(movieId);

    if (!movie.creator?.equals(req.user?._id)) {
        return res.redirect('/404');
    }

    res.render('movie/edit', { movie });
});

movieController.post('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const newInformation = req.body;

    try {
        await movieService.editMovie(movieId, newInformation);
    } catch (error) {
        return res.render(`movie/edit`, { movie: newInformation, error: getErrorMessage(error) });
    }

    res.redirect(`/movie/${movieId}/details`);
});

export default movieController