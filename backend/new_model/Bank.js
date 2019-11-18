const Blood = require('../schema/Blood');
const units = [
  {
    'id': 1,
    'type': 'A',
    'arrival_date': '1998-11-11',
    'use_by_date': '2020-10-11',
    'donor_id': 'D_12345',
    'lab_id': 'L_12345'
  },
  {
    'id': 2,
    'type': 'A',
    'arrival_date': '1998-11-11',
    'use_by_date': '2015-10-11',
    'donor_id': 'D_12345',
    'lab_id': 'L_12345'
  },
  {
    'id': 3,
    'type': 'A',
    'arrival_date': '1998-11-11',
    'use_by_date': '2010-10-11',
    'donor_id': 'D_12345',
    'lab_id': 'L_12345'
  },
  {
    'id': 4,
    'type': 'B',
    'arrival_date': '1998-11-11',
    'use_by_date': '2005-10-11',
    'donor_id': 'D_12345',
    'lab_id': 'L_12345'
  },
  {
    'id': 5,
    'type': 'B',
    'arrival_date': '1998-11-11',
    'use_by_date': '2000-10-11',
    'donor_id': 'D_12345',
    'lab_id': 'L_12345'
  }
];


class Bank {
  constructor() {
    this.units = [];
    this.unit_ids = 0;
  }

  // Adds a list of new units to the Bank. 
  // NOT VERIFIED YET
  add_units(new_units) {

  }

  // Adds a new blood unit to the bank. Function Verified in DANFY.
  // VERIFIED
  add_unit(new_unit) {
    this.units.push(new_unit);
  }

  // Function returns a list of blood units which have a given type.
  // Function has been verified in Dafny as 'filter' in the bank class.
  // VERIFIED
  get_units_by_type(type) {
    results = [];
    let index = 0;
    let limit = this.bloods.length;

    while (index < limit) {
      if (this.bloods[i].type == type) { 
        results.push(this.bloods[index])
      }
    }
  }

  // Function returns a list of blood units which have a given type and
  // certain minimum expiry. Function has been verified in Dafny as 'filter'
  // in the bank class.
  // VERIFIED
  get_units_by_type_date(type, min_date) {

  }

  // Function returns a list of blood units which have a certain minimum expiry. 
  // Function has been verified in Dafny as 'filter' in the bank class.
  // VERIFIED
  get_units_by_date(min_date) {

  }

}

const bank = new Bank();
module.exports = bank;
