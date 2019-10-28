const bloodDb = require("../schema/db");
// console.log(bloodDb.bloods);

class Query {
  static async get_by_type(type, sort) {
    var bloodList = bloodDb.bloods;
    // console.log(bloodList);
    var i = 0;
    var bloods = [];
    while (i < bloodList.length) {
      if (bloodList[i].type === type) {
        var newSlimObj = {};
        newSlimObj.type = bloodList[i].type;
        newSlimObj.volume_ml = bloodList[i].volume_ml;
        newSlimObj.use_by_date = bloodList[i].use_by_date;
        bloods.push(newSlimObj);
      }
      i++;
    }
    return { bloods: bloods };
  }

  static async get_by_type_date(body) {
    return { yes: "yes" };
  }

  static async get_all(body) {}
  static async get_all_by_date(body) {
    return { yes: "yes" };
  }
}
const result = Query.get_by_type("A", false);
console.log(result);
module.exports = Query;
