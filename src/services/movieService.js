import Movie from "../models/Movie.js";

export default {
    getMovie(movieId) {
        const movie = Movie.findById(movieId);
        return movie
    },
    createMovie(movie, creatorId) {
        const result = Movie.create({
            ...movie,
            rating: Number(movie.rating),
            year: Number(movie.year),
            creator: creatorId
        });
        return result
    },
    getAll(filter = {}) {
        let query = Movie.find({});

        if (filter.search) {
            query = query.where({ title: filter.search })
        }

        if (filter.genre) {
            query = query.where({ genre: filter.genre })
        }

        if (filter.year) {
            query = query.where({ year: Number(filter.year) })
        }

        return query
    },
    async attachCast(movieId, castId, character) {
        return Movie.findByIdAndUpdate(movieId, {
            $push: {
                casts: {
                    cast: castId,
                    character
                }
            }
        })
    }

}