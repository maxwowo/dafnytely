// Lean blood unit class for development of order algorithms
class {:autocontracts} BloodUnit {
    var id: int;
    var blood_type: int;
    var use_by_date: int;

    predicate Valid()
    {
        0 <= id < 1000000   &&
        0 <= blood_type < 8  &&
        0 <= use_by_date < 1000000
    }

    constructor (id_: int, blood_type_: int, use_by_date_: int)
    requires 0 <= id_ < 1000000;
    requires 0 <= blood_type_ < 8;
    requires 0 <= use_by_date_ < 1000000;
    {
        id, blood_type, use_by_date := id_, blood_type_, use_by_date_;
    }
}

// Lean blood order class
class {:autocontracts} BloodOrder {

    // Holds a sequece of blood units for a particular customer
    var customer_id: int;
    var blood_units: seq<BloodUnit>;

    // Determines if a blood order is valid
    predicate Valid()
    {
        |blood_units| > 0 &&
        0 <= customer_id < 1000000
    }

    // Creates a new blood order
    constructor (customer_id_: int, blood_units_: seq<BloodUnit>)
    requires 0 <= customer_id_ < 1000000 && |blood_units_| > 0;
    ensures  customer_id == customer_id_ && blood_units == blood_units_;
    {
        customer_id := customer_id_;
        blood_units := blood_units_;
    }
}

// Lean blood bank class for development of order algortihms
class {:autocontracts} BloodBank {

    // Holds a sequence of blood units making up the blood bank
    var blood_units: set<BloodUnit>;

    // Ensures that the blood bank is in a valid state
    predicate Valid()
    {
        |blood_units| >= 0
    }

    // Creates an empty blood bank
    constructor ()
    ensures |blood_units| == 0;
    {
        blood_units := [];
    }

    // Gets the length of the sequece of blood units
    method Length() returns (length: int)
    ensures  length == |blood_units|
    {
        length := |blood_units|;
    }

    method order_type_units(type: int, units: int, cust_id: int) returns (blood_order: BloodOrder)
    {
        // Create order units sequence
        var o_units: seq<BloodUnit := [];

        // Create
    }
}

//method order_type_units(type: string, units: int) returns (order: seq<bloodUnit>)

//method order_type_date_units(db: array<bloodUnits>, type: string, date: int) returns (order: seq<bloodUnit>)