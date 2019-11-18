const database = require("../model/db");

class Expire {
  static async discard_by_id(body) {
    let t = { status: true };
    let i = 0;
    while (i < database.db.bloods.length) {
      if (database.db.bloods[i].id == body.id) {
        database.db.delete_blood(i);
        return t;
      } else {
        t = { status: "target blood is not expired" };
      }
      i++;
    }
    return t;
  }

  static async discard_all(body) {
    let i = database.db.bloods.length;
    while (0 < i) {
      database.db.delete_blood(i);
      i--;
    }
    console.log(database.db.bloods.length);
    console.log(database.db.bloods);
    console.log(i);
    return { status: database.db.bloods };
  }

  static async get_all(body) {
    let r = [];
    let i = 0;
    while (i < database.db.bloods.length) {
      if (database.blood_expire(new Date(database.db.bloods[i].use_by_date))) {
        r.push(database.db.bloods[i]);
      }
      i++;
    }
    return { list: r };
  }
}

module.exports = Expire;
