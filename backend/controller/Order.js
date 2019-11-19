
const Bank = require('../model/Bank');
const Orders = require('../model/Orders');
const OrderItem = require('../schema/Order');
const selectionSort = require('../logic/SelectionSort');

const compare=(a,b)=>{
    let adate = new Date(a.use_by_date);
    let bdate = new Date (b.use_by_date);
    if (adate > bdate) { return 1; } else { return -1; };
}

class Order {

    static async order_type_units(body){
        // Get all the fresh units matching the given type 
        let units = Bank.get_units_by_type(body.type);   // VERIFIED: FilterUnits 
        selectionSort(units,compare);
        // Check that there is enough blood 
        if (units.length < body.units) {
            return {status:"not enought blood"};
        }

        // Remove the number of ordered blood units from bank
        Bank.remove_ordered_units(units.slice(0, body.units));  // NOT VERIFIED: RemoveOrderedUnits

        // Add order to list of orders
        Orders.add_order(new OrderItem(body.type,body.units,null,Orders.order_ids));

        // Return Result
        return {list:[]};
    }

    static async order_type_date_units(body){
        // Get all the fresh units matching the given type with
        // the specified minimum expiry
        let units = Bank.get_units_by_type_date(body.type, body.date);   // VERIFIED: FilterUnits // NOT VERIFIED: sort
        selectionSort(units,compare);
        console.log(units);
        // Check that there is enough blood 
        if (units.length < body.units) {
            return {status:"not enought blood"};
        }

        // Remove ordered blood units from bank
        Bank.remove_ordered_units(units.slice(0, body.units));  // NOT VERIFIED: RemoveOrderedUnits

        // Add order to list of orders
        
        Orders.add_order(new OrderItem(body.type,body.units,body.date,Orders.order_ids));

        // Return Result
        return {list: []};
    }
}

module.exports = Order;
