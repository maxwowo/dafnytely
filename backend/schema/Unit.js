// Blood Class. HOlds range of information about each blood unit
class Unit {
  constructor(id, type, arrival_date, use_by_date, donor_id, lab_id) {
    this.id = id;
    this.type = type;
    this.arrival_date = arrival_date;
    this.use_by_date = use_by_date;
    this.donor_id = donor_id;
    this.lab_id = lab_id;
  }

  // Returns True if the blood unit is expired
  expired() {
    return new Date(this.use_by_date) < new Date();
  }

  // True if the blood unit expires after the given date
  before(date) {
    return new Date(this.use_by_date) < new Date(date);
  }
}

module.exports = Unit;
