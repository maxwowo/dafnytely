const fs = require('fs');
const Blood = require('./Blood');
const l = [
  {
    'id': 12345,
    'type': 'A',
    'arrival_date': '2019_08_12',
    'use_by_date': '2019_09_12',
    'donor_id': 'D_12345',
    'lab_id': 'L_12345',
    'volume_ml': 500
  },
  {
    'id': 12344,
    'type': 'A',
    'arrival_date': '2019_08_12',
    'use_by_date': '2019_09_12',
    'donor_id': 'D_12345',
    'lab_id': 'L_12345',
    'volume_ml': 500
  },
  {
    'id': 12343,
    'type': 'A',
    'arrival_date': '2019_08_12',
    'use_by_date': '2019_09_12',
    'donor_id': 'D_12345',
    'lab_id': 'L_12345',
    'volume_ml': 500
  },
  {
    'id': 12342,
    'type': 'A',
    'arrival_date': '2019_08_12',
    'use_by_date': '2019_09_12',
    'donor_id': 'D_12345',
    'lab_id': 'L_12345',
    'volume_ml': 500
  },
  {
    'id': 12341,
    'type': 'A',
    'arrival_date': '2019_08_12',
    'use_by_date': '2019_09_12',
    'donor_id': 'D_12345',
    'lab_id': 'L_12345',
    'volume_ml': 500
  }
];


class Db {
  constructor() {
    this.bloods = [];
    this.orders = [];
    l.forEach(item => {
      this.bloods.push(new Blood(...item));
    });
  }
  add_order(order){

  }
  delete_order(key){

  }
  add_blood(blood){

  }
  delete_blood(key){
    
  }
}

const database = new Db();
module.exports = {
  db: database
};
