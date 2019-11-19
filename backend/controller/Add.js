const Bank = require('../model/Bank');
const Unit = require('../schema/Unit');

class Add {
  static async add_blood(body) {
    // Get Blood Units from request as list, if unit is expired, do not add it to list
    let new_units = []
    for (let i = 0; i < body.bloods.length; i++) {
      let unit = new Unit(Bank.blood_id, body.bloods[i].type, body.bloods[i].arrival_date, body.bloods[i].use_by_date, body.bloods[i].donor_id, body.bloods[i].lab_id);
      if (!unit.expired()) {
        new_units.push(unit);
      } else {
        return { status: 'expire item' };
      }
    }
    console.log(new_units);
    // For each new unit add it to the blood bank
    for (let i = 0; i < new_units.length; i++) {
      // DAFNY verified add_unit function
      Bank.add_unit(new_units[i]);
    }

    // Returns status
    return { status: true };
  }
}

module.exports = Add;
