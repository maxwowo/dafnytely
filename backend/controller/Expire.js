const Bank = require('../model/Bank');

class Expire {

  // Discards a particular blood unit if it is expired
  static async discard_by_id(body) {
    let res = { status: true };
    let id = body.id;
    console.log("asgdgasd")
    // Gets the unit and its index 
    let unit = Bank.get_unit_by_id(id);                     // VERIFIED: GetUnitById
    let index = Bank.get_unit_index(unit);                  // VERIFIED: FindUnitIndex
    console.log(Bank.units)
    // Checks whether the date is expired or not and removes 
    // the unit if it is expired.
    if (!unit.expired()) {
        return { status: 'target blood is not expired' };
    } 
    Bank.remove_unit_by_index(index);                   // VERIFIED: RemoveUnitByIndex

    // Return status object
    return res;
  }

  // Discrads all expired blood units
  static async discard_all(body) {
    // Get the expired units from the blood bank.
    let remove = Bank.get_expired_units();                  // VERIFIED: FilterUnits

    // For each unit in remove, find its index and remove
    // it from the bank
    for (let i = 0; i < remove.length; i++) {
        let index = Bank.get_unit_index(remove[i]);        // VERIFIED: FindUnitByIndex
        Bank.remove_unit_by_index(index);                  // VERIFIED: RemoveUnitByIndex
    }
    
    // Return resultant units
    return { status: Bank.units };
  }

  // Gets all epired blood units
  static async get_all(body) {
    let expired = Bank.get_expired_units();                 // VERIFIED: FilterUnits
    return { list: expired };
  }


}

module.exports = Expire;
