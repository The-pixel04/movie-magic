import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLenght: [5, 'Title must be at least 5 characters long'],
        match: [/^[A-Za-z 0-9]+$/, 'Title must contain only letters and numbers']
    },
    category: String,
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        minLenght: [5, 'Genre must be at least 5 characters long'],
        match: [/^[A-Za-z 0-9]+$/, 'Genre must contain only letters and numbers']
    },
    director: {
        type: String,
        required: [true, 'Director is required'],
        minLenght: [5, 'Director must be at least 5 characters long'],
        match: [/^[A-Za-z 0-9]+$/, 'Director must contain only letters and numbers']
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1900, 'Year must be at least 1900'],
        max: [2025, 'Year must be at most 2025']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        match: [/^https?:\/\//, 'Image URL must start with http:// or https://']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must be at most 10']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLenght: [20, 'Description must be at least 20 characters long'],
        match: [/^[A-Za-z 0-9]+$/, 'Description must contain only letters and numbers']
    },
    casts: [{
        character: String,
        cast: {
            type: Types.ObjectId,
            _id: false,
            ref: 'Cast',
        }
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }

});

const Movie = model('Movie', movieSchema);

export default Movie;