const bloodDb = require('../model/db');
const Moment = require('moment');

class Query {
  static async get_units_by_type(body) {

    let i = 0;
    let results = new Array(bloodDb.db.bloods.length).fill(false);
    while (i < bloodDb.db.bloods.length) {
      if (bloodDb.db.bloods[i].type == body.type) {
        results[i] = true;
      }
      i++;
    }

    let bloodlist = [];
    results.forEach((item, i) => {
      if (item == true) {
        bloodlist.push(bloodDb.db.bloods[i]);
      }
    });

    return { list: bloodlist };
}

  static async get_units_by_type_date(body) {
    let target_date = new Date(body.date);
    let i = 0;
    let bloodlist = [];
    while (i < bloodDb.db.bloods.length) {
      let current_date = new Date(bloodDb.db.bloods[i]['use_by_date']);
      if (bloodDb.db.bloods[i].type == body.type && current_date >= target_date) {
        bloodlist.push(bloodDb.db.bloods[i]);
      }
      i++;
    }
    return { list: bloodlist };
  }

  static async get_units_by_date(body) {

    let target_date = new Date(body.date);
    let i = 0;
    let bloodlist = [];
    while (i < bloodDb.db.bloods.length) {
      let current_date = new Date(bloodDb.db.bloods[i]['use_by_date']);
      if (current_date >= target_date) {
        bloodlist.push(bloodDb.db.bloods[i]);
      }
      i++;
    }
    return { list: bloodlist };
  }

  static async get_all_units(body) {

    return { list: bloodDb.db.bloods };
  }


}

module.exports = Query;
