
class Query {

    static async get_by_type(body) {
        return { yes:"yes"}
    }

    static async get_by_type_date(body) {
        return { yes:"yes"}
    }

    static async get_all(body) {

    }
    static async get_all_by_date(body) {

        return { yes:"yes"}
    }
}

module.exports = Query;