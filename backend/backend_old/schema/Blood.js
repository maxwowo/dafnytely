class Blood {
  constructor(id, type, arrival_date, use_by_date, donor_id, lab_id) {
    this.id = id;
    this.type = type;
    this.arrival_date = arrival_date;
    this.use_by_date = use_by_date;
    this.donor_id = donor_id;
    this.lab_id = lab_id;
  }
}

module.exports = Blood;
