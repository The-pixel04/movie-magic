import { Schema, model } from "mongoose";

const castScema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLenght: [5, 'Name must be at least 5 characters long'],
        match: [/^[A-Za-z 0-9]+$/, 'Name must contain only letters and numbers']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age must be at least 0'],
        max: [120, 'Age must be at most 120']
    },
    born: {
        type: String,
        required: [true, 'Born is required'],
        minLenght: [10, 'Born must be at least 10 characters long'],
        match: [/^[A-Za-z 0-9]+$/, 'Born must contain only letters and numbers']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        match: [/^https?:\/\//, 'Image URL must start with http:// or https://']
    }
});

const Cast = model('Cast', castScema);
export default Cast