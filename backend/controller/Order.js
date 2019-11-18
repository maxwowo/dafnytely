
const Bank = require('../model/Bank');
const OrderItem = require('../schema/Order');

const sort=(a,b)=>{
    let adate = new Date(a.use_by_date);
    let bdate = new Date (b.use_by_date);
    if (adate > bdate) { return 1; } else { return -1; };
}

class Order {

    static async order_type_units(body){
        // Get the expired units from the blood bank and 
        // remove them
        let remove = Bank.get_expired_units();                  // VERIFIED: FilterUnits
        for (let i = 0; i < remove.length; i++) {
            let index = Bank.get_unit_index(remove[i]);         // VERIFIED: FindUnitByIndex
            Bank.remove_unit_by_index(index);                   // VERIFIED: RemoveUnitByIndex
        }

        // Get all the fresh units matching the given type 
        let units = Bank.get_units_by_type(body.type).sort();   // VERIFIED: FilterUnits // NOT VERIFIED: sort

        // Check that there is enough blood 
        if (units.length < body.units) {
            return {status:"not enought blood"};
        }

        // Remove the number of ordered blood units from bank
        Bank.remove_ordered_units(units.slice(0, body.units));  // NOT VERIFIED: RemoveOrderedUnits

        // Add order to list of orders
        schema.db.add_order(new OrderItem(body.type,body.units,null,schema.db.order_id));

        // Return Result
        return {list:r};
    }

    static async order_type_date_units(body){
        // Get the expired units from the blood bank and 
        // remove them
        let remove = Bank.get_expired_units();                  // VERIFIED: FilterUnits
        for (let i = 0; i < remove.length; i++) {
            let index = Bank.get_unit_index(remove[i]);         // VERIFIED: FindUnitByIndex
            Bank.remove_unit_by_index(index);                   // VERIFIED: RemoveUnitByIndex
        }

        // Get all the fresh units matching the given type with
        // the specified minimum expiry
        let units = Bank.get_units_by_type_date(body.type).sort();   // VERIFIED: FilterUnits // NOT VERIFIED: sort

        // Check that there is enough blood 
        if (units.length < body.units) {
            return {status:"not enought blood"};
        }

        // Remove ordered blood units from bank
        Bank.remove_ordered_units(units.slice(0, body.units));  // NOT VERIFIED: RemoveOrderedUnits

        // Add order to list of orders
        schema.db.add_order(new OrderItem(body.type,body.units,null,schema.db.order_id));

        // Return Result
        return {list:r};
    }

}

module.exports = Order;
