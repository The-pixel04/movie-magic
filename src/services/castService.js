import Cast from "../models/Cast.js"

export default {
    create(castdata) {

        return Cast.create(castdata);
    },
    getAll(){
        return Cast.find({})
    }
}