const schema = require('../model/db');
const bloodDb = schema.db;
const Blood = require('../schema/Blood');

class Add {
  static async add_blood(body) {

    // Processes request
    let i = 0;
    let r = { status: true };
    body.bloods.forEach(element => {
      if (schema.blood_expire(new Date(element.use_by_date))) {
        r = { status: 'expire item' };
      }
    });
    if (r.status != true) return r;
    const added_bloods = body.bloods.map(element => new Blood(bloodDb.blood_id, element.type, element.arrival_date, element.use_by_date, element.donor_id, element.lab_id))
    
    // Makes call to add blood units to bank: Dafny Verified
    bloodDb.add_bloods(added_bloods);

    // Returns status
    return r;
  }

}

module.exports = Add;
