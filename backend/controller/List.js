const Orders = require('../model/Orders');

// Provides functions on the set of Vampire Orders
class List {

  // Return list of all current orders
  static async get_current(body) {
    return { list: Orders.orders };
  }

  // Remove given order from the system
  static async finish_order(body) {
    // Get index of order
    let index = Orders.get_order_index_by_id(body.order_id);

    // If the index was not found, return error
    if (index == -1) {
      return { status: 'invalid index' };
    }

    // Remove the order from the list of orders
    Orders.remove_order_by_index(index);

    return { status: true };
  }

  // Remove all orders from the system
  static async finish_order_all(body) {
    Orders.remove_all();
    return { status: true };
  }
}

module.exports = List;
