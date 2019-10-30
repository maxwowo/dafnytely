const schema = require('../model/db');
const bloodDb = schema.db;
const Blood = require('../schema/Blood');

class Add {

    static async add_blood(body){
        let i =0;
        let r={status:true};
        body.bloods.forEach(element => {
            if(schema.blood_expire(new Date(element.use_by_date))){
                r={status:"expire item"};
            }
        });
        if(r.status!= true)return r;
        body.bloods.forEach(element=>bloodDb.add_blood(new Blood(bloodDb.blood_id,body.type,body.arrival_date,body.use_by_date,body.donor_id,body.lab_id)));
        return r;
    }

}

module.exports = Add;
