class OrderItem {
  constructor(type, num_blood_units, min_expiry_date, id) {
    this.blood_type = type;
    this.num_blood_units = num_blood_units;
    this.min_expiry_date = min_expiry_date;
    this.id = id;
  }
}

module.exports = OrderItem;
