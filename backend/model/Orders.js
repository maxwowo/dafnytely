// Class for list of orders
class Orders {
    constructor() {
        this.orders = [];
        this.order_ids = 0;
    }

    add_order(order) {
        this.order_id++;
        this.orders.push(order);
    }

    // NOT VERIFIED
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

    // NOT VERIFIED
    remove_order_by_index(index) {
        this.orders = this.orders.slice(0, index) + this.orders.slice(index+1, this.orders.length);
    }

    // NOT VERIFIED
    remove_all() {
        this.orders = [];
    }
 
}

// Exprt Orders object
const orders = new Orders();
module.exports = orders;