const bloodDb = require('../model/db');
const Moment = require('moment');
class Query {
    static async get_units_by_type(body) {
      
        let i =0;
        let bloodlist=[];
        while(i<bloodDb.db.bloods.length){
            if(bloodDb.db.bloods[i].type===body.type){
                bloodlist.push(bloodDb.db.bloods[i]);
            }
            i++;
        }
        return {list:bloodlist}
    }

    static async get_units_by_type_date(body) {
        let target_date = new Date(body.date);
        let i =0;
        let bloodlist=[];
        while(i<bloodDb.db.bloods.length){
            let current_date = new Date(bloodDb.db.bloods[i]['use_by_date'])
            if(bloodDb.db.bloods[i].type===body.type && current_date>=target_date){
                bloodlist.push(bloodDb.db.bloods[i]);
            }
            i++;
        }
        return {list:bloodlist}
    }
}

module.exports = Query;
