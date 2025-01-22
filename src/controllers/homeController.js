import express from 'express';
import movieService from '../services/movieService.js';
const router = express.Router();

router.get('/', async (req, res) => {
    let movies = await movieService.getAll();

    res.render('home', { movies });

});

router.get('/about', (req, res) => {
    res.render('about')
});

export default router