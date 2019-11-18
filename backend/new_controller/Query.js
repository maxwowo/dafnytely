const Bank = require('../new_model/Bank');
const Moment = require('moment');

class Query {
  static async get_units_by_type(body) {

    // Query function verified in DAFNY as Filter function in 
    // Bank class. Guaranteed to return all matching units and 
    // not disturb the Bank state.
    let b_type = body.type;
    let result = Bank.get_units_by_type(b_type)

    return { list: result };
  }

  static async get_units_by_type_date(body) {

    let min_date = new Date(body.date);
    let type = body.type;

    // Query function verified in DAFNY as Filter function in 
    // Bank class. Guaranteed to return all matching units and 
    // not disturb the Bank state.
    let result = Bank.get_units_by_type_date(type, min_date)

    return { list: result };
  }

  static async get_units_by_date(body) {

    let min_date = new Date(body.date);

    // Query function verified in DAFNY as Filter function in 
    // Bank class. Guaranteed to return all matching units and 
    // not disturb the Bank state.
    let result = Bank.get_units_by_date(min_date);

    return { list: result };
  }

  static async get_all_units(body) {
    // Returns all the units in the bank.
    return { list: Bank.units };
  }


}

module.exports = Query;
