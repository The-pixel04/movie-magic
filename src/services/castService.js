import Cast from "../models/Cast.js"

export default {
    create(castdata) {

        return Cast.create(castdata);
    },
    getAll(filter = {}) {
        let query = Cast.find();

        if (filter.exclude) {
            query = query.find({ _id: { $nin: filter.exclude } })
        }

        return query
    }
}