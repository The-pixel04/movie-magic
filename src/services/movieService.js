import Movie from "../models/Movie.js";
// import movies from "../movies.js";
import { v4 as uuid } from 'uuid'

export default {
    getMovie(movieId) {
        const movie = Movie.findById(movieId);
        return movie
    },
    createMovie(movie) {
        // let id = uuid();
        // movies.push({
        //     id: id,
        //     ...movie,
        //     rating: Number(movie.rating)
        // });
    },
    getAll(filter = {}) {
        let result = Movie.find({});
        console.log(result)

        return result
    }
}