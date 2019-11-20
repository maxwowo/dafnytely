// Class for list of orders
class Orders {
    constructor() {
        this.orders = [];
        this.order_ids = 0;
    }

    get_new_id() {
        let id = this.order_ids;
        this.order_ids++;
        return id;
    }

    // VERFIIED: AddUnit
    add_order(order) {
        this.order_id++;
        this.orders.push(order);
    }

    // VERIFIED: GetUnitIndex
    get_order_index_by_id(id) {
        let key = -1; 
        let index = 0; 
        let limit = this.orders.length;

        while (index < limit) {
            if (id == this.orders[index].id) { key = index; }
            index = index + 1;
        }

        return key;
    }

    // VERIFIED: RemoveByIndex
    remove_order_by_index(index) {
        this.orders.splice(index, 1);
    }

    remove_all() {
        this.orders = [];
    }
 
}

// Exprt Orders object
const orders = new Orders();
module.exports = orders;