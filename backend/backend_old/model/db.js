const Blood = require('../schema/Blood');
const l = [
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


class Db {
  constructor() {
    this.bloods = [];
    this.orders = [];
    this.order_id = 0;
    this.blood_id = 0;

    l.forEach(item => {
      this.blood_id++;
      this.bloods.push(new Blood(item.id, item.type, item.arrival_date, item.use_by_date, item.donor_id, item.lab_id));
    });
  }

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

  add_order(order) {
    this.order_id++;
    this.orders.push(order);
  }

  delete_order(key) {
    this.orders.splice(key, 1);
  }

  // add_blood(blood) {
  //   this.blood_id++;
  //   this.bloods.push(blood);
  // }

  add_bloods(added_bloods) {
    this.blood_id += added_bloods.length;
    this.bloods.push(...added_bloods);
  }

  delete_blood(key) {
    this.bloods.splice(key, 1);
  }
}

const blood_expire = (date1, date2 = new Date()) => {
  return date1 < date2;
};

const database = new Db();
module.exports = {
  db: database,
  blood_expire: blood_expire
};
