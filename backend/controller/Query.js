const bloodDb = require('../schema/db');

class Query {

    static async get_volume_by_type(body) {

        return { yes:"yes"}
    }

    static async get_volume_by_type_date(body) {

        return { yes:"yes"}
    }
 
    static async get_all(body) {
    }

    static async get_all_by_date(body) {
        return { yes: 'yes' };
    }
}

const result = Query.get_by_type('A', false);
console.log(result);
module.exports = Query;
