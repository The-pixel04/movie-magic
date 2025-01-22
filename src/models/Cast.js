import { Schema, model } from "mongoose";

const castScema = new Schema({
    name: String,
    age: Number,
    born: Number,
    imageUrl: String
});

const Cast = model('Cast', castScema);
export default Cast