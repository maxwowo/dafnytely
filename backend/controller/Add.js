const Bank = require('../model/Bank');

class Add {
  static async add_blood(body) {
    // Get Blood Units from request as list, if unit is expired, do not add it to list
    let new_units = []
    for (let i = 0; i < body.bloods.length; i++) {
      unit = new Unit(Bank.blood_id, element.type, element.arrival_date, element.use_by_date, element.donor_id, element.lab_id);
      if (!unit.expired()) {
        new_units.push(unit);
      }
    }
    
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
