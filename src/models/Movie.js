import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imageUrl: String,
    rating: Number,
    description: String,
    casts: [{
        character: String,
        cast: {
            type: Types.ObjectId,
            _id: false,
            ref: 'Cast',
        }
    }]
});

const Movie = model('Movie', movieSchema);

export default Movie;