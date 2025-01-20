import movies from "../movies.js";
import { v4 as uuid } from 'uuid'

export default {
    findMovie(movieId) {
        const movie = movies.find(movie => movie.id == movieId);
        return movie
    },
    createMovie(movie) {
        let id = uuid();
        movies.push({
            id: id,
            ...movie,
            rating: Number(movie.rating)
        });
    },
    getAll() {
        return movies
    }
}